import React from "react";
import s from "./card.module.css";
import { toast } from "sonner";

const Card = ({ setId, setOpenModal, openModal, ...item }) => {
  const handleOpenModal = () => {
    setOpenModal(true);
    setId(item.id - 1);
  };

  const URL = process.env.REACT_APP_URL;
  
  return (
    <>
      <div className={s.card}>
        {localStorage.getItem("token") && (
          <div className={s.add_favorites}>
            <button
              onClick={async () => {
                try {
                  const response = await fetch(`${URL}/api/users/addFavorite`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ flowerId: item.id }),
                  });
                  if (response.ok) {
                    toast.success("Цветок добавлен в избранное");
                  } else {
                    toast.error("Ошибка при добавлении цветка в избранное");
                  }
                } catch (error) {
                  console.error("Error adding to favorites:", error);
                  toast.error("Ошибка при добавлении цветка в избранное");
                }
              }}
            >
              🖤
            </button>
          </div>
        )}
        <div className={s.card_img}>
          <img src={require("../../assets/" + item.img)} alt={item.name} />
        </div>
        <div className={s.card_info}>
          <h3>{item.name}</h3>
          <div className={s.card__more_info}>
            <div className={s.card__short_info}>
              <p>
                Тип: <span>{item.type_name}</span>
              </p>
              <p>
                Место выращивания: <span>{item.room_type_name}</span>
              </p>
              <p>
                Страна: <span>{item.country_name}</span>
              </p>
            </div>
            <div className={s.card__info_btn}>
              <button onClick={handleOpenModal}>Подробнее</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
