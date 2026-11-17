import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "./AdminLogin.css";

const API_BASE_URL = "http://localhost:5000/api";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to login."
        );
      }

      const storage = rememberMe
        ? localStorage
        : sessionStorage;

      storage.setItem(
        "adminToken",
        data.token
      );

      storage.setItem(
        "adminUser",
        JSON.stringify(data.admin)
      );

      window.location.href = "/admin";
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-grid" />

      <div className="admin-login-glow admin-login-glow-one" />
      <div className="admin-login-glow admin-login-glow-two" />

      <motion.div
        className="admin-login-orbit admin-login-orbit-one"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="admin-login-orbit admin-login-orbit-two"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="admin-login-container">
        <motion.div
          className="admin-login-card"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="admin-login-card-top">
            <div className="admin-login-brand">
              <div className="admin-login-brand-mark">
                <span />
                <span />
                <span />
              </div>

              <div>
                <div className="admin-login-brand-name">
                  SUFIYAN
                </div>

                <div className="admin-login-brand-sub">
                  ADMIN SYSTEM
                </div>
              </div>
            </div>

            <div className="admin-login-status">
              <span className="admin-login-status-dot" />
              SECURE
            </div>
          </div>

          <div className="admin-login-heading">
            <div className="admin-login-eyebrow">
              <Sparkles size={14} />
              PRIVATE ACCESS
            </div>

            <h1>
              Welcome
              <br />
              <span>back.</span>
            </h1>

            <p>
              Sign in to access your portfolio
              control center.
            </p>
          </div>

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >
            <div className="admin-login-field">
              <label htmlFor="admin-email">
                EMAIL ADDRESS
              </label>

              <div className="admin-login-input-wrap">
                <Mail
                  size={18}
                  className="admin-login-input-icon"
                />

                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="admin-login-field">
              <label htmlFor="admin-password">
                PASSWORD
              </label>

              <div className="admin-login-input-wrap">
                <LockKeyhole
                  size={18}
                  className="admin-login-input-icon"
                />

                <input
                  id="admin-password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="admin-login-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            <div className="admin-login-options">
              <label className="admin-login-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(
                      event.target.checked
                    )
                  }
                  disabled={loading}
                />

                <span className="admin-login-checkmark">
                  <span />
                </span>

                <span>Remember me</span>
              </label>

              <div className="admin-login-protected">
                <ShieldCheck size={14} />
                Protected access
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  className="admin-login-error"
                  initial={{
                    opacity: 0,
                    y: -8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                >
                  <span>!</span>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              className="admin-login-submit"
              disabled={loading}
              whileHover={
                !loading
                  ? {
                      y: -2,
                    }
                  : {}
              }
              whileTap={
                !loading
                  ? {
                      scale: 0.99,
                    }
                  : {}
              }
            >
              <span>
                {loading
                  ? "AUTHENTICATING..."
                  : "SIGN IN"}
              </span>

              {!loading && (
                <span className="admin-login-submit-icon">
                  <ArrowRight size={18} />
                </span>
              )}

              {loading && (
                <span className="admin-login-spinner" />
              )}
            </motion.button>
          </form>

          <div className="admin-login-footer">
            <div className="admin-login-footer-line" />

            <div className="admin-login-footer-content">
              <span>
                SUFIYAN PORTFOLIO
              </span>

              <span>
                ADMIN • SECURE • PRIVATE
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="admin-login-bottom"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
            duration: 0.5,
          }}
        >
          <span className="admin-login-bottom-dot" />
          AUTHORIZED PERSONNEL ONLY
        </motion.div>
      </div>
    </main>
  );
};

export default AdminLogin;