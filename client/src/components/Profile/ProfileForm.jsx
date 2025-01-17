import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ProfileForm = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name || "");
  const [surname, setSurname] = useState(user.surname || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    const updatedFields = {};
    
    // Добавляем только измененные поля
    if (name !== user.name) updatedFields.name = name;
    if (surname !== user.surname) updatedFields.surname = surname;
    if (password) updatedFields.password = password;

    if (Object.keys(updatedFields).length === 0) {
      toast.error("Нет изменений для сохранения");
      return;
    }

    onUpdate(updatedFields);
  };

  useEffect(() => {
    setName(user.name || "");
    setSurname(user.surname || "");
  }, [user]);

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={user.email} readOnly disabled />
      </div>
      <div className="form-group">
        <label htmlFor="name">Имя</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="surname">Фамилия</label>
        <input
          id="surname"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Новый пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Оставьте пустым, если не хотите менять"
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Подтвердите пароль</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Подтвердите новый пароль"
        />
      </div>
      <button type="submit" className="submit-button">Сохранить изменения</button>
    </form>
  );
};

export default ProfileForm;
