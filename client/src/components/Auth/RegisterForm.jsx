import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterForm = ({ isActive, toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_URL;

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/api/users/register`, { 
        name, 
        email, 
        password 
      });
      toast.success("Регистрация успешна!");
      toggleForm();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.error || "Ошибка при регистрации");
    }
  };

  return (
    <form
      onSubmit={e => handleRegister(e)}
      className={`auth-form ${isActive ? "active" : ""}`}
    >
      <h2>Регистрация</h2>
      <div className="form-group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Имя"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Пароль"
        />
      </div>
      <button type="submit" className="submit-button">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
