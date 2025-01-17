import React, { useState } from "react";
import s from "./helper.module.css";
import operatorImg from "../../assets/operator.png";
import axios from "axios";

const Helper = ({ setShowHelper }) => {
  const token = process.env.REACT_APP_TG_TOKEN,
    API = `https://api.telegram.org/bot${token}/sendMessage`;

  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(
    "Заявка отправленна успешно.\nОжидайте, скоро с вами свяжутся."
  );
  const text = `‼️ Новая заявка! ‼️\nСвязаться - ${contact}\n\nПожелания: ${message}`;

  const handleClick = () => {
    setContact("");
    setMessage("");
    sendMessage();

    let timeoutId;
    timeoutId = setTimeout(() => {
      setShowHelper(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  };

  const sendMessage = async () => {
    const requestNum = Math.floor(Math.random() * 1000);
    try {
      const inlineKeyboard = {
        inline_keyboard: [
          [
            {
              text: "⏰ Взять в работу ⏰",
              callback_data: `/inprocess_${requestNum}`,
            },
          ],
        ],
      };

      if (!contact && !message) {
        return setError("‼️Пожалуйста, заполните все поля.‼️");
      } else {
        const response = await axios.post(API, {
          chat_id: -1002283845135,
          text,
          reply_markup: JSON.stringify(inlineKeyboard),
        });

        console.log(response);
        setIsSent(true);
      }
    } catch (error) {
      console.warn(error);
      setIsSent(true);
      setError("‼️Что-то пошло не так. Попробуйте позже.‼️");
    }
  };

  const operator = {
    name: "Алина",
    img: operatorImg,
  };

  return (
    <div className={s.helper}>
      <div className={s.helper_header}>
        <div className={s.operator_container}>
          <img className={s.operator_img} src={operator.img} alt="operator" />
          <div className={s.operator}>
            <p>{operator.name}</p>
          </div>
        </div>

        <div className={s.close} onClick={() => setShowHelper(false)}>
          <span className="material-symbols-outlined">close</span>
        </div>
      </div>

      <div className={s.helper_body}>
        <div className={s.message_container}>
          <img className={s.operator_img} src={operator.img} alt="operator" />
          <div className={s.helper_message}>
            {isSent ? (
              <p>{error}</p>
            ) : (
              <p>
                Здравствуйте.
                <br />
                Опишите подробно ваши пожелания.
                <br />
                Наш специалист свяжется с вами в ближайшее время
              </p>
            )}
          </div>
        </div>

        <div className={s.send_message_container}>
          <div className={s.input_container}>
            <label htmlFor="contact">Ваши контакты:</label>
            <input 
              style={{ backgroundColor: "white" }}
              onChange={(e) => setContact(e.target.value)}
              type="text"
              name="contact"
              placeholder="Telegram, email, WhatsApp"
              value={contact}
            />
            <label htmlFor="wishes">Опишите пожелания:</label>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              name="wishes"
              id="wishes"
              placeholder="Ваши пожелания"
              value={message}
            />
          </div>
          <button onClick={() => handleClick()} className={s.send_message_btn}>
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Helper;
