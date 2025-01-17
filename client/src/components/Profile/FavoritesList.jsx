import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const FavoritesList = ({ favorites, onFavoritesChange }) => {

  const [favoritesList, setFavoritesList] = useState(favorites);

  useEffect(() => {
    setFavoritesList(favorites);
  }, [favorites]);

  const URL = process.env.REACT_APP_URL;

  const deleteFavorite = async (flowerId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${URL}/api/users/removeFavorite/${flowerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const updatedFavorites = favoritesList.filter(item => item.id !== flowerId);
      setFavoritesList(updatedFavorites);
      if (onFavoritesChange) {
        onFavoritesChange(updatedFavorites);
      }
      toast.success("Цветок удален из избранного");
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error("Ошибка при удалении из избранного");
    }
  };

  return (
    <div className="favorites-list">
      {favoritesList.map((item) => (
        <div key={item.id} className="favorite-item">
          <img
            src={require(`../../assets/${item.img}`)}
            alt={item.name}
          />
          <p>{item.name}</p>
          <button 
            type="button" 
            className="remove_favorite" 
            onClick={() => deleteFavorite(item.id)}
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;