import { getProductById } from '@/API/Product';
import { Product } from '@/DataTypes/product';
import { ArrowLeft, Minus, Plus, ShoppingCart, Sparkles, Star } from 'lucide-react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const productsData = {
  precious: {
    moonga: [
      { id: 'MNG001', name: 'Premium Red Coral', quantity: '5.25 Ratti', description: 'Natural Italian Red Coral with excellent clarity', price: 12500, originalPrice: 15000 },
      { id: 'MNG002', name: 'Italian Moonga Stone', quantity: '7.5 Ratti', description: 'Deep red coral from Mediterranean sea', price: 18750, originalPrice: 22000 }
    ],
    heera: [
      { id: 'HRA001', name: 'Brilliant Cut Diamond', quantity: '0.50 Carat', description: 'VS1 clarity, F color certified diamond', price: 85000, originalPrice: 95000 },
      { id: 'HRA002', name: 'Round Diamond', quantity: '0.75 Carat', description: 'VVS2 clarity, excellent cut and polish', price: 125000, originalPrice: 140000 }
    ],
    panna: [
      { id: 'PNA001', name: 'Colombian Emerald', quantity: '4.25 Ratti', description: 'Natural emerald with vivid green color', price: 32000, originalPrice: 38000 },
      { id: 'PNA002', name: 'Zambian Panna', quantity: '6.0 Ratti', description: 'Premium quality with minor inclusions', price: 45000, originalPrice: 52000 }
    ],
    moti: [
      { id: 'MTI001', name: 'South Sea Pearl', quantity: '8-9mm', description: 'Natural pearl with excellent luster', price: 8500, originalPrice: 10000 },
      { id: 'MTI002', name: 'Basra Moti', quantity: '10-11mm', description: 'Rare natural pearl, certified authentic', price: 25000, originalPrice: 30000 }
    ],
    manik: [
      { id: 'MNK001', name: 'Burmese Ruby', quantity: '5.5 Ratti', description: 'Pigeon blood red ruby with certification', price: 75000, originalPrice: 85000 },
      { id: 'MNK002', name: 'Madagascar Manik', quantity: '4.0 Ratti', description: 'Natural ruby with excellent color', price: 48000, originalPrice: 55000 }
    ],
    pukhraj: [
      { id: 'PKJ001', name: 'Ceylon Yellow Sapphire', quantity: '6.25 Ratti', description: 'Natural unheated yellow sapphire', price: 42000, originalPrice: 48000 },
      { id: 'PKJ002', name: 'Thai Pukhraj', quantity: '7.5 Ratti', description: 'Premium quality with excellent clarity', price: 52500, originalPrice: 60000 }
    ],
    neelam: [
      { id: 'NLM001', name: 'Kashmir Blue Sapphire', quantity: '5.0 Ratti', description: 'Rare cornflower blue sapphire', price: 95000, originalPrice: 110000 },
      { id: 'NLM002', name: 'Ceylon Neelam', quantity: '6.5 Ratti', description: 'Natural blue sapphire, certified', price: 68000, originalPrice: 78000 }
    ],
    gomed: [
      { id: 'GMD001', name: 'Hessonite Garnet', quantity: '7.25 Ratti', description: 'Natural Ceylon Gomed with honey color', price: 5500, originalPrice: 7000 },
      { id: 'GMD002', name: 'African Gomed', quantity: '9.0 Ratti', description: 'Deep orange-red hessonite', price: 7200, originalPrice: 9000 }
    ],
    vaidurya: [
      { id: 'VDR001', name: "Cat's Eye Chrysoberyl", quantity: '5.5 Ratti', description: 'Sharp chatoyancy effect, honey color', price: 35000, originalPrice: 42000 },
      { id: 'VDR002', name: 'Lahsuniya Stone', quantity: '6.75 Ratti', description: 'Premium quality with excellent eye', price: 45000, originalPrice: 52000 }
    ]
  },
  semiPrecious: {
    sulemani: [
      { id: 'SLM001', name: 'Sulemani Hakik', quantity: '8.0 Ratti', description: 'Natural banded agate with unique patterns', price: 2500, originalPrice: 3200 },
      { id: 'SLM002', name: 'Black Agate Stone', quantity: '10.0 Ratti', description: 'Premium quality Sulemani stone', price: 3200, originalPrice: 4000 }
    ],
    safedPukhraj: [
      { id: 'SPK001', name: 'White Sapphire', quantity: '5.25 Ratti', description: 'Natural colorless sapphire', price: 8500, originalPrice: 10500 },
      { id: 'SPK002', name: 'Ceylon White Pukhraj', quantity: '6.5 Ratti', description: 'Excellent clarity and brilliance', price: 11000, originalPrice: 13500 }
    ],
    haritTurmali: [
      { id: 'HTR001', name: 'Green Tourmaline', quantity: '4.5 Ratti', description: 'Natural green tourmaline with vibrancy', price: 15000, originalPrice: 18000 },
      { id: 'HTR002', name: 'Afghan Harit Turmali', quantity: '5.75 Ratti', description: 'Premium chrome tourmaline', price: 22000, originalPrice: 26000 }
    ],
    chandrakant: [
      { id: 'CHK001', name: 'Moonstone', quantity: '7.0 Ratti', description: 'Natural moonstone with blue sheen', price: 4500, originalPrice: 6000 },
      { id: 'CHK002', name: 'Rainbow Chandrakant', quantity: '8.5 Ratti', description: 'Multi-color adularescence effect', price: 6500, originalPrice: 8000 }
    ],
    gomedak: [
      { id: 'GMK001', name: 'Hessonite Upratna', quantity: '8.0 Ratti', description: 'Natural garnet with warm tones', price: 3500, originalPrice: 4500 },
      { id: 'GMK002', name: 'Orange Gomedak', quantity: '10.0 Ratti', description: 'Bright orange hessonite garnet', price: 4800, originalPrice: 6000 }
    ],
    sunehla: [
      { id: 'SNH001', name: 'Golden Topaz', quantity: '6.25 Ratti', description: 'Natural yellow topaz with brilliance', price: 5500, originalPrice: 7000 },
      { id: 'SNH002', name: 'Imperial Sunehla', quantity: '7.5 Ratti', description: 'Premium golden-orange topaz', price: 8500, originalPrice: 10500 }
    ],
    jamuniya: [
      { id: 'JMN001', name: 'Amethyst', quantity: '9.0 Ratti', description: 'Deep purple amethyst from Brazil', price: 3200, originalPrice: 4200 },
      { id: 'JMN002', name: 'Zambian Jamuniya', quantity: '11.0 Ratti', description: 'Rich violet amethyst stone', price: 4500, originalPrice: 5800 }
    ],
    santreeGomed: [
      { id: 'STG001', name: 'Spessartite Garnet', quantity: '5.5 Ratti', description: 'Orange-red garnet with fire', price: 12000, originalPrice: 15000 },
      { id: 'STG002', name: 'Mandarin Santree', quantity: '6.0 Ratti', description: 'Vibrant orange spessartite', price: 16000, originalPrice: 19500 }
    ],
    vaiduryaUpratna: [
      { id: 'VDU001', name: "Cat's Eye Quartz", quantity: '7.5 Ratti', description: 'Natural chatoyant quartz', price: 5500, originalPrice: 7200 },
      { id: 'VDU002', name: 'Fiber Optic Stone', quantity: '9.0 Ratti', description: 'Strong cat eye effect', price: 7500, originalPrice: 9500 }
    ]
  }
};

const categories = {
  precious: {
    label: 'Precious (Ratna)',
    subcategories: {
      moonga: 'Moonga',
      heera: 'Heera',
      panna: 'Panna',
      moti: 'Moti',
      manik: 'Manik',
      pukhraj: 'Pukhraj',
      neelam: 'Neelam',
      gomed: 'Gomed',
      vaidurya: 'Vaidurya/Lahsuniya'
    }
  },
  semiPrecious: {
    label: 'Semi-Precious (Upratna)',
    subcategories: {
      sulemani: 'Sulemani',
      safedPukhraj: 'Safed Pukhraj',
      haritTurmali: 'Harit Turmali',
      chandrakant: 'Chandrakant Mani',
      gomedak: 'Gomedak',
      sunehla: 'Sunehla',
      jamuniya: 'Jamuniya',
      santreeGomed: 'Santree Gomed',
      vaiduryaUpratna: 'Vaidurya Uparatna'
    }
  }
};

const ProductDetailView = () => {
  const params = useParams();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [discount, setDiscount] = React.useState(0);
  const [discountedPrice, setDiscountedPrice] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(params.id || 'MTI001');
      console.log('Fetched product:', fetchedProduct);

      setProduct(fetchedProduct);
      setQuantity(Number(fetchedProduct.quantity) || 1);
      setDiscount(fetchedProduct.discount ?? 0);

      const discPrice =
        fetchedProduct.price -
        (fetchedProduct.price * (fetchedProduct.discount ?? 0)) / 100;

      setDiscountedPrice(discPrice);
      setTotalPrice(discPrice * (Number(fetchedProduct.quantity) || 1));
    };
    fetchProduct();
  }, [params.id]);

  // Recalculate total price when quantity changes
  useEffect(() => {
    if (discountedPrice > 0) {
      setTotalPrice(discountedPrice * quantity);
    }
  }, [quantity, discountedPrice]);

  const onBack = () => {
    window.history.back();
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading product details...
      </div>
    );
  }

  const categoryLabel = Object.keys(productsData.precious).some((key) =>
    productsData.precious[key].some((p) => p.id === product.id)
  )
    ? 'Ratna (Precious Gemstones)'
    : 'Upratna (Semi-Precious)';

  const subcategoryName = 'Moti'; // You can improve this lookup later

  const benefits = [
    'Enhances courage and confidence',
    'Boosts physical energy',
    'Protects from enemies',
    'Brings success in competitive fields',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Product Details</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and 360 View */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="relative h-96 bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-base font-bold shadow-lg z-10">
                    {discount}% OFF
                  </div>
                )}
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400/30 blur-3xl rounded-full"></div>
                  <Star className="w-64 h-64 text-yellow-400 relative z-10" />
                </div>
              </div>
            </div>

            {/* 360 Stone View */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-card p-8">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-purple-100 p-6 rounded-full">
                  <Sparkles className="w-16 h-16 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">360° Stone View</h3>
                <p className="text-gray-600">
                  Video placeholder - Add your 360° rotation video here
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Product Info Card */}
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-purple-600 font-semibold mb-4">
                Product ID: {product.id}
              </p>

              <div className="flex gap-3 mb-6">
                <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium border border-gray-200">
                  {categoryLabel}
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium border border-gray-200">
                  {subcategoryName}
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-purple-600">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.price > discountedPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ₹{product.price.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-2 font-medium">
                {product.quantity} available
              </p>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector Card */}
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Quantity</h3>
              <div className="flex items-center justify-center gap-6 mb-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </button>
                <span className="text-3xl font-bold text-gray-900 w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              <p className="text-xl font-semibold text-purple-600 text-center">
                Total: ₹{totalPrice.toLocaleString()}
              </p>
            </div>

            {/* Buy Now Button */}
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg">
              <ShoppingCart className="w-6 h-6" />
              Buy Now
            </button>

            {/* Benefits Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-card p-8 border border-yellow-100">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-7 h-7 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Benefits</h3>
              </div>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
