import { CheckoutDraft } from "@/DataTypes/Checkout";
import { getWithExpiry } from "@/utlity/Storage";
import { ChevronRight, CreditCard, MapPin, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const currency = (v: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(v);

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const BDK = import.meta.env.VITE_BUY_DRAFT_KEY;
  const baseUrl = import.meta.env.VITE_api_url || "http://localhost:5000";

  const [currentStep, setCurrentStep] = useState<"contact" | "address" | "payment">("contact");

  // Contact
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(true);
  const [mobileError, setMobileError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Address
  const [fullName, setFullName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressErrors, setAddressErrors] = useState<Record<string, boolean>>({});

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "wallet" | "">("");

  // Draft
  const [draft, setDraft] = useState<CheckoutDraft | null>(null);
  const [source, setSource] = useState<"buy-now" | "cart">("buy-now");

  // ====== Load items from either Buy-Now Draft OR Cart State ======
  useEffect(() => {
    const locationState = location.state as any;
    
    // Check if coming from cart
    if (locationState?.from === "cart" && locationState?.items) {
      console.log("[CHECKOUT] Loading from Cart:", locationState.items);
      setDraft({ items: locationState.items });
      setSource("cart");
    } 
    // Otherwise check for buy-now draft
    else {
      console.log("[CHECKOUT] Loading from Buy-Now draft");
      const d = getWithExpiry<CheckoutDraft>(BDK);
      console.log("[CHECKOUT] Buy-now draft:", d);
      setDraft(d);
      setSource("buy-now");
    }
  }, [BDK, location.state]);

  // Derived pricing
  const { subTotal, discountTotal, shipping, tax, grandTotal } = useMemo(() => {
    const items = draft?.items || [];
    let sub = 0;
    let disc = 0;

    for (const it of items) {
      const qty = Math.max(1, Number(it.qty) || 1);
      const unit = Math.max(0, Number(it.unitPrice) || 0);
      const d = Math.min(100, Math.max(0, Number(it.discount) || 0));
      const discountedUnit = Math.round(unit * (1 - d / 100));

      sub += discountedUnit * qty;
      disc += Math.round(unit * qty - discountedUnit * qty);
    }

    // Free shipping for both buy-now and cart
    const shipping = items.length > 0 ? 0 : 0;
    const tax = Math.round(sub * 0.03); // 3% GST
    const grand = sub + shipping + tax;

    return { subTotal: sub, discountTotal: disc, shipping, tax, grandTotal: grand };
  }, [draft]);

  // ====== Step handlers ======
  const handleContactContinue = () => {
    let hasError = false;

    if (!/^\d{10}$/.test(mobileNumber)) {
      setMobileError(true);
      hasError = true;
    } else setMobileError(false);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError(true);
      hasError = true;
    } else setEmailError(false);

    if (!hasError) setCurrentStep("address");
  };

  const handleAddressContinue = () => {
    const errors: Record<string, boolean> = {};
    if (!fullName.trim()) errors.fullName = true;
    if (!addressLine1.trim()) errors.addressLine1 = true;
    if (!city.trim()) errors.city = true;
    if (!state.trim()) errors.state = true;
    if (!/^\d{6}$/.test(pincode)) errors.pincode = true;

    setAddressErrors(errors);
    if (Object.keys(errors).length === 0) setCurrentStep("payment");
  };

  const handlePaymentComplete = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    if (!draft?.items?.length) {
      alert("Your order is empty.");
      return;
    }

    // Payload for backend
    const payload = {
      contact: { mobileNumber: `+91${mobileNumber}`, email, receiveUpdates },
      address: { fullName, addressLine1, addressLine2, city, state, pincode },
      payment: { method: paymentMethod },
      order: {
        items: draft.items,
        subTotal,
        discountTotal,
        shipping,
        tax,
        grandTotal,
      },
      meta: { source }, // "buy-now" or "cart"
    };

    console.log("PLACE ORDER payload ->", payload);

    // TODO: Send to backend API
    // const response = await placeOrder(payload);

    // On success:
    if (source === "buy-now") {
      sessionStorage.removeItem(BDK); // Clear buy-now draft
    }
    // If from cart, you might want to call a clear cart API

    alert("Order placed successfully!");
    navigate("/home");
  };

  // ====== UI sections (same as before) ======
  const renderContactForm = () => (
    <div className="max-w-xl">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Contact details</h2>
      <p className="text-gray-600 text-center mb-8">Enter mobile & email to continue</p>

      <div className="space-y-4">
        <div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-lg bg-gray-50">
              <span className="text-xl">🇮🇳</span>
              <span className="text-sm font-medium text-gray-700">+91</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <input
              type="tel"
              placeholder="Mobile number"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                setMobileError(false);
              }}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          {mobileError && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Please enter a valid 10-digit mobile number
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Please enter a valid email
            </p>
          )}
        </div>

        <div className="flex items-start gap-3 py-2">
          <input
            type="checkbox"
            id="updates"
            checked={receiveUpdates}
            onChange={(e) => setReceiveUpdates(e.target.checked)}
            className="w-5 h-5 mt-0.5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 cursor-pointer"
          />
          <label htmlFor="updates" className="text-sm text-gray-700 cursor-pointer">
            Send me offers and order updates
          </label>
        </div>

        <button
          onClick={handleContactContinue}
          className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 transition-colors mt-6"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderAddressForm = () => (
    <div className="max-w-xl">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <MapPin className="w-8 h-8 text-gray-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Delivery address</h2>
      <p className="text-gray-600 text-center mb-8">Enter your delivery address</p>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setAddressErrors((s) => ({ ...s, fullName: false }));
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              addressErrors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {addressErrors.fullName && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Please enter your full name
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Address line 1"
            value={addressLine1}
            onChange={(e) => {
              setAddressLine1(e.target.value);
              setAddressErrors((s) => ({ ...s, addressLine1: false }));
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              addressErrors.addressLine1 ? "border-red-500" : "border-gray-300"
            }`}
          />
          {addressErrors.addressLine1 && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Please enter your address
            </p>
          )}
        </div>

        <input
          type="text"
          placeholder="Address line 2 (Optional)"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setAddressErrors((s) => ({ ...s, city: false }));
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                addressErrors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {addressErrors.city && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Required
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setAddressErrors((s) => ({ ...s, state: false }));
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                addressErrors.state ? "border-red-500" : "border-gray-300"
              }`}
            />
            {addressErrors.state && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Required
              </p>
            )}
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              setAddressErrors((s) => ({ ...s, pincode: false }));
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              addressErrors.pincode ? "border-red-500" : "border-gray-300"
            }`}
          />
          {addressErrors.pincode && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Please enter a valid 6-digit pincode
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setCurrentStep("contact")}
            className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-colors mt-6"
          >
            Back
          </button>
          <button
            onClick={handleAddressContinue}
            className="flex-1 bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 transition-colors mt-6"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="max-w-xl">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CreditCard className="w-8 h-8 text-gray-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Payment method</h2>
      <p className="text-gray-600 text-center mb-8">Choose your preferred payment method</p>

      <div className="space-y-3">
        {[
          { key: "upi", title: "UPI", subtitle: "Pay using UPI apps", emoji: "📱" },
          { key: "card", title: "Credit / Debit Card", subtitle: "Visa, Mastercard, Amex, Rupay", emoji: "💳" },
          { key: "netbanking", title: "Net Banking", subtitle: "All major banks supported", emoji: "🏦" },
          { key: "wallet", title: "Wallets", subtitle: "Paytm, PhonePe, Amazon Pay", emoji: "👛" },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setPaymentMethod(m.key as any)}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
              paymentMethod === m.key ? "border-yellow-600 bg-yellow-50" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === m.key ? "border-yellow-600" : "border-gray-300"
                  }`}
                >
                  {paymentMethod === m.key && <div className="w-3 h-3 rounded-full bg-yellow-600"></div>}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{m.title}</p>
                  <p className="text-sm text-gray-600">{m.subtitle}</p>
                </div>
              </div>
              <div className="text-2xl">{m.emoji}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep("address")}
          className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-colors mt-6"
        >
          Back
        </button>
        <button
          onClick={handlePaymentComplete}
          className="flex-1 bg-yellow-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-yellow-700 transition-colors mt-6"
        >
          Place Order
        </button>
      </div>
    </div>
  );

  // ====== Empty/Invalid draft UI ======
  if (!draft || !draft.items || draft.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-8 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your bag is empty</h2>
          <p className="text-gray-600 mb-6">
            {source === "cart" 
              ? "Your cart is empty. Add some items to checkout!" 
              : "Looks like you didn't add an item via Buy Now. Grab something shiny!"}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/gemstones")}
              className="px-5 py-3 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors"
            >
              Browse Gemstones
            </button>
            <button
              onClick={() => navigate("/rudraksha")}
              className="px-5 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
            >
              Browse Rudraksha
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ====== Main Layout ======
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 to-yellow-700 p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl flex gap-6">
        {/* Left Sidebar */}
        <div className="w-96 flex flex-col gap-4">
          {/* Brand */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">TG</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Triakshi Gems</h1>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">PayU Trusted Business</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Order summary
                {source === "cart" && (
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    ({draft.items.length} {draft.items.length === 1 ? "item" : "items"})
                  </span>
                )}
              </h2>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* Items */}
            <div className="space-y-4">
              {draft.items.map((it, idx) => {
                const d = Math.min(100, Math.max(0, Number(it.discount) || 0));
                const unit = Math.max(0, Number(it.unitPrice) || 0);
                const discountedUnit = Math.round(unit * (1 - d / 100));
                return (
                  <div key={idx} className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      {it.image ? (
                        <img
                          src={`${baseUrl}${it.image}`}
                          alt={it.name}
                          className="w-12 h-12 object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{it.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Qty. {it.qty}</p>
                      {d > 0 && (
                        <p className="text-xs text-green-600 mt-0.5">{d}% off</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₹{currency(discountedUnit * it.qty)}</p>
                      {d > 0 && (
                        <p className="text-xs text-gray-400 line-through">₹{currency(unit * it.qty)}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Extras */}
            {/* <div className="space-y-3 mt-6">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm text-gray-700">GST Number</span>
                <span className="text-sm text-yellow-600 font-medium flex items-center gap-1">
                  Add <Plus className="w-4 h-4" />
                </span>
              </button>

              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm text-gray-700">Order instructions</span>
                <span className="text-sm text-yellow-600 font-medium flex items-center gap-1">
                  Add <Plus className="w-4 h-4" />
                </span>
              </button>
            </div> */}

            {/* Totals */}
            <div className="mt-6 border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₹{currency(subTotal)}</span>
              </div>
              {discountTotal > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">- ₹{currency(discountTotal)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">{shipping === 0 ? "Free" : `₹${currency(shipping)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (est.)</span>
                <span className="text-gray-900">₹{currency(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">₹{currency(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white text-sm px-2">
            <span>Secured by</span>
            <span className="font-bold">PayU</span>
          </div>
        </div>

        {/* Right: Steps */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8">
          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentStep === "contact" ? "bg-pink-50 text-pink-600" : "bg-green-50 text-green-600"
                }`}
              >
                {currentStep === "contact" ? "Contact" : "✓ Contact"}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentStep === "address"
                    ? "bg-pink-50 text-pink-600"
                    : currentStep === "payment"
                    ? "bg-green-50 text-green-600"
                    : "text-gray-400"
                }`}
              >
                {currentStep === "payment" ? "✓ Address" : "Address"}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentStep === "payment" ? "bg-pink-50 text-pink-600" : "text-gray-400"
                }`}
              >
                Payment
              </span>
            </div>
          </div>

          {currentStep === "contact" && renderContactForm()}
          {currentStep === "address" && renderAddressForm()}
          {currentStep === "payment" && renderPaymentForm()}

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Money Back Promise by
              </span>{" "}
              <span className="font-bold">PayU</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              By proceeding, I agree to PayU's{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Notice
              </a>{" "}
              •{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Edit Preferences
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}