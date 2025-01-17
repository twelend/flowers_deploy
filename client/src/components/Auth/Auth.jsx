import React, { useEffect, useState } from "react";
import LoginForm from "./AuthForm";
import RegisterForm from "./RegisterForm";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

const AuthPage = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  useEffect(() => {
    localStorage.getItem("token")
      ? navigate("/profile")
      : setIsLoginActive(true);
  }, [navigate]);

  return (
    <div className="auth">
      <div className="header_auth">
        <Link to="/">
          <h1>Flowers</h1>
        </Link>
      </div>
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-box">
            <div
              className={`slider ${isLoginActive ? "" : "slide-right"}`}
            ></div>
            <div className="form-container">
              <LoginForm isActive={isLoginActive} />
              <RegisterForm isActive={!isLoginActive} toggleForm={toggleForm} />
            </div>
            <div className="toggle-container">
              <button
                className={`toggle-button ${isLoginActive ? "active" : ""}`}
                onClick={() => setIsLoginActive(true)}
              >
                Вход
              </button>
              <button
                className={`toggle-button ${!isLoginActive ? "active" : ""}`}
                onClick={() => setIsLoginActive(false)}
              >
                Регистрация
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
