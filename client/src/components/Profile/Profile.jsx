import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import FavoritesList from "./FavoritesList";
import "./UserProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Перенаправление на страницу входа, если токен отсутствует
        return;
      }
      try {
        const response = await axios.get(`${URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFavorites(response.data.favoriteFlowers);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdateProfile = async (updatedUser) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${URL}/api/users/update`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      toast.success("Профиль успешно обновлен");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Ошибка обновления профиля");
    }
  };

  const handleFavoritesChange = (updatedFavorites) => {
    setFavorites(updatedFavorites);
  };

  return (
    <div className="profile-container">
      <ProfileHeader user={user} />
      <div className="exit">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Выйти
        </button>
      </div>
      <div className="profile-content">
        <div className="profile-section">
          <h2>Личная информация</h2>
          <ProfileForm user={user} onUpdate={handleUpdateProfile} />
        </div>
        <div className="profile-section">
          <h2>Избранное</h2>
          <FavoritesList favorites={favorites} onFavoritesChange={handleFavoritesChange} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
