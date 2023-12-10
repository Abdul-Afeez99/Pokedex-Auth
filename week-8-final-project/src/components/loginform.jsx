import React, { useState } from "react";
import { useAuth } from "../context/authprovider";
import { useNavigate } from "react-router-dom";
import "./loginform.css"; // Import the CSS file for styling

function ArrowRight({ className, size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      width={size}
      height={size}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
    });
    signIn(email, password).then((data) => navigate("/"));
  };

  return (
    <section className="custom-login-section">
      <div className="custom-login-container">
        <h2 className="custom-heading">
          Sign in to your account
        </h2>
        <p className="custom-paragraph">
          Don't have an account?{" "}
          <a
            href="#"
            title=""
            className="custom-link"
          >
            Create a free account
          </a>
        </p>
        <form className="custom-form" onSubmit={handleSubmit}>
          <div className="custom-form-elements">
            <div>
              <label className="custom-label">
                Email address
              </label>
              <div className="custom-input-container">
                <input
                  className="custom-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                ></input>
              </div>
            </div>
            <div>
              <div className="custom-input-container">
                <label className="custom-label">
                  Password
                </label>
                <input
                  className="custom-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                ></input>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="custom-button"
              >
                Get started <ArrowRight className="custom-arrow" size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
