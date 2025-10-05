import { Login, Signup } from "@/API/Auth";
import { LoginData, SignupData } from "@/DataTypes/Auth";
import { toastError, toastSuccess } from "@/utlity/AlertSystem";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
type props = {
  state: string;
};


const Auth: React.FC<props>= ({state}) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const Navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const phone = (document.getElementById("auth-loginPhone") as HTMLInputElement)?.value?.trim() || "";
    const password = (document.getElementById("auth-loginPassword") as HTMLInputElement)?.value || "";
  
    // basic validation
    if (!/^\d{10}$/.test(phone)) {
       toastError("Enter a valid 10-digit phone.");
      return;
    }
    if (!password) {
      toastError("Password is required.");
      return;
    }
  
    const payload: LoginData = {
      phonenumber: `+91${phone}`,
      password,
      // email is optional; include it if you have an email field
    };
  
    try {
      const res = await Login(payload);
  
      // success path
      if (res?.success) {
        // Persist session (localStorage as requested)
        if (res.token) localStorage.setItem("tg_token", res.token);
        if (res.user) localStorage.setItem("tg_user", JSON.stringify(res.user));
        
  
         toastSuccess(res.message || "Logged in successfully!");
  
        // Navigate to home (prefer useNavigate from react-router)
        
        Navigate("/home");
        return;
      }
  
      // backend returned success=false
    toastError(res?.message || "Login failed.");
    } catch (err: any) {
      const msg = err?.message || "Login failed.";
      toastError(msg);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const name = (document.getElementById("auth-signupName") as HTMLInputElement)?.value?.trim() || "";
    const phone = (document.getElementById("auth-signupPhone") as HTMLInputElement)?.value?.trim() || "";
    const email = (document.getElementById("auth-signupEmail") as HTMLInputElement)?.value?.trim() || "";
    const password = (document.getElementById("auth-signupPassword") as HTMLInputElement)?.value || "";
    const confirmPassword = (document.getElementById("auth-confirmPassword") as HTMLInputElement)?.value || "";
  
    if (!name) return toastError?.("Name is required.") ?? alert("Name is required.");
    if (!/^\d{10}$/.test(phone)) return toastError?.("Enter a valid 10-digit phone.") ?? alert("Enter a valid 10-digit phone.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toastError?.("Enter a valid email.") ?? alert("Enter a valid email.");
    if (password.length < 6) return toastError?.("Password must be at least 6 characters.") ?? alert("Password must be at least 6 characters.");
    if (password !== confirmPassword) return toastError?.("Passwords do not match!") ?? alert("Passwords do not match!");
  
    const payload: SignupData = {
      username: name,
      phonenumber: `+91${phone}`,
      email,
      password,
    };
  
    try {
      const res = await Signup(payload);
  
      if (res?.success) {
        // Store token and user in localStorage
        localStorage.setItem("tg_token", res.token);
        localStorage.setItem("tg_user", JSON.stringify(res.user));
      
        if (toastSuccess) {
          toastSuccess(res.message || "Account created successfully!");
        } else {
          alert("Signup successful!");
        }
      
        Navigate("/home");
      } 
      else {
        toastError(res?.message || "Signup failed.");
      }
    } catch (err: any) {
      const msg = err?.message || "Signup failed.";
      toastError(msg) 
    }
  };
  
  useEffect(() => {
    if (state === "login" || state === "signup") {
      setActiveTab(state);
    }
  }
  , [state]);

  return (
    <div className="auth_body" >
      <div className="auth-container" id="auth-container">
        <div className="auth-logo" id="auth-logo">
          <h1>✦ TRIAKSHI GEMS ✦</h1>
          <p>
            ✨ Jai Maa Pitambara ✨
            <br />
            Welcome to <strong>Triakshi Gems</strong> – trusted for pure and authentic gemstones.
          </p>
        </div>

        <div className="auth-tabs" id="auth-tabs">
          <button
            className={`auth-tab ${activeTab === "login" ? "auth-active" : ""}`}
            onClick={() => setActiveTab("login")}
            id="auth-tab-login"
            type="button"
          >
            Login
          </button>
          <button
            className={`auth-tab ${activeTab === "signup" ? "auth-active" : ""}`}
            onClick={() => setActiveTab("signup")}
            id="auth-tab-signup"
            type="button"
          >
            Sign Up
          </button>
        </div>

        {/* Login */}
        <div
          id="auth-loginForm"
          className={`auth-form-content ${activeTab === "login" ? "auth-active" : ""}`}
        >
          <form onSubmit={handleLogin} id="auth-loginForm-el">
            <div className="auth-form-group">
              <label htmlFor="auth-loginPhone" className="auth-label">
                Phone Number
              </label>
              <div className="auth-phone-input">
                <input
                  type="text"
                  className="auth-input auth-country-code"
                  value="+91"
                  readOnly
                  id="auth-loginCountryCode"
                />
                <input
                  type="tel"
                  id="auth-loginPhone"
                  className="auth-input"
                  placeholder="Enter your phone number"
                  required
                  pattern="[0-9]{10}"
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="auth-loginPassword" className="auth-label">
                Password
              </label>
              <input
                type="password"
                id="auth-loginPassword"
                className="auth-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn" id="auth-loginSubmit">
              Login
            </button>

            <div className="auth-forgot-link" id="auth-forgot">
              <a href="#auth-reset">Forgot Password?</a>
            </div>
          </form>
        </div>

        {/* Sign Up */}
        <div
          id="auth-signupForm"
          className={`auth-form-content ${activeTab === "signup" ? "auth-active" : ""}`}
        >
          <form onSubmit={handleSignup} id="auth-signupForm-el">
            <div className="auth-form-group">
              <label htmlFor="auth-signupName" className="auth-label">
                Full Name
              </label>
              <input
                type="text"
                id="auth-signupName"
                className="auth-input"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="auth-signupEmail" className="auth-label">
                Email
              </label>
              <input
                type="text"
                id="auth-signupEmail"
                className="auth-input"
                placeholder="ravi32@gmail.com"
                required
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="auth-signupPhone" className="auth-label">
                Phone Number
              </label>
              <div className="auth-phone-input">
                <input
                  type="text"
                  className="auth-input auth-country-code"
                  value="+91"
                  readOnly
                  id="auth-signupCountryCode"
                />
                <input
                  type="tel"
                  id="auth-signupPhone"
                  className="auth-input"
                  placeholder="Enter your phone number"
                  required
                  pattern="[0-9]{10}"
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="auth-signupPassword" className="auth-label">
                Password
              </label>
              <input
                type="password"
                id="auth-signupPassword"
                className="auth-input"
                placeholder="Create a password"
                required
                minLength={6}
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="auth-confirmPassword" className="auth-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="auth-confirmPassword"
                className="auth-input"
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="auth-submit-btn" id="auth-signupSubmit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
