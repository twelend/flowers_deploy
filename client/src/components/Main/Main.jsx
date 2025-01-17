import React, { useCallback, useEffect, useState } from "react";
import s from "./main.module.css";
import axios from "axios";
import Card from "../Cards/Card";
import Modal from "../Modal/Modal";
import { toast } from "sonner";

const Main = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [getMoreItems, setGetMoreItems] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [id, setId] = useState(null);

  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [room, setRoom] = useState("");

  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.season.toLowerCase().includes(search.toLowerCase()) ||
        item.sort_provider.toLowerCase().includes(search.toLowerCase())
    );
    setShowButton(filteredData.length > 4);
  }, [data, getMoreItems, search]);

  const fetchFlowers = useCallback(async () => {
    try {
      let response;
      if (country) {
        response = await axios.get(
          `${URL}/api/flowers/getByCountry?countryId=${country}`
        );
      } else if (type) {
        response = await axios.get(`${URL}/api/flowers/getByType?typeId=${type}`);
      } else if (room) {
        response = await axios.get(
          `${URL}/api/flowers/getByRoomType?roomTypeId=${room}`
        );
      } else {
        response = await axios.get(`${URL}/api/flowers/get`);
      }
      setData(response.data);
    } catch (error) {
      console.error("Error fetching flowers:", error);
      toast.error("Error fetching flowers");
    }
  }, [country, type, room, URL]);

  useEffect(() => {
    fetchFlowers();
  }, [fetchFlowers]);

  return (
    <>
      <main id="search" className={s.main}>
        <div className={s.main_container}>
          <div className={s.main_title_mobile}>
            <h3>Популярные запросы</h3>
          </div>
          <div className={s.main_title_desktop}>
            <h3>Найти цветы</h3>
          </div>

          <div className={s.main_requests}>
            <div className={s.request_item}>
              <button
                title="Садовые"
                value={"Садовые"}
                onClick={(e) => setType(1)}
              >
                Садовые
              </button>
            </div>
            <div className={s.request_item}>
              <button
                title="Открытый грунт"
                value={"Открытый грунт"}
                onClick={() => setRoom(2)}
              >
                Открытый грунт
              </button>
            </div>
            <div className={s.request_item}>
              <button
                title="Комнатные"
                value={"Комнатные"}
                onClick={() => setType(2)}
              >
                Комнатные
              </button>
            </div>
            <div className={s.request_item}>
              <button
                title="Колумбия"
                value={"Колумбия"}
                onClick={() => setCountry(3)}
              >
                Колумбия
              </button>
            </div>
          </div>
          <button className={s.clear_filters} style={{ margin: "0 auto", marginTop: ".5em", padding: ".5em", borderRadius: "5px", width: "50%", backgroundColor: "var(--light-color)", border: "1px solid var(--light-color)" }} onClick={() => { window.location.reload()}}>Отчистить фильтры</button>

          <div className={s.main_filter}>
            <div className={s.filter_item}>
              <h3>Страна выращивания</h3>
              <select
                onChange={(e) => setCountry(e.target.value)}
                name="country"
                id="country"
                className={s.filter}
              >
                <option value="#" selected disabled>
                  Выберите Страну
                </option>
                <option value="1">Россия</option>
                <option value="3">Колумбия</option>
                <option value="2">Нидерланды</option>
                <option value="4">Индия</option>
                <option value="5">Африка</option>
                <option value="6">Китай</option>
                <option value="7">Мексика</option>
              </select>
            </div>

            <div className={s.filter_item}>
              <h3>Тип Цветка</h3>
              <select
                onClick={(e) => setType(e.target.value)}
                name="type"
                id="type"
                className={s.filter}
              >
                <option value="#" selected disabled>
                  Выберите тип
                </option>
                <option value="1">Садовые</option>
                <option value="2">Комнатный</option>
              </select>
            </div>

            <div className={s.filter_item}>
              <h3>Место выращивания</h3>
              <select
                onChange={(e) => setRoom(e.target.value)}
                name="type"
                id="type"
                className={s.filter}
              >
                <option value="#" selected disabled>
                  Выберите место
                </option>
                <option value="3">Оранжерея</option>
                <option value="1">Теплица</option>
                <option value="2">Открытый Грунт</option>
              </select>
            </div>
            {room || type || country ? (
              <div
                onClick={() => {
                  setCountry("");
                  setType("");
                  setRoom("");
                  window.location.reload();
                }}
                className={s.filter_item}
              >
                Отчистить
              </div>
            ) : null}
          </div>

          {/* <div className={s.main_search}>
            <input
              type="text"
              placeholder="Поиск"
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div> */}
          <div className={s.main__card_container}>
            <div className={s.main__card_list}>
              {!getMoreItems
                ? data
                    .filter(
                      (item) =>
                        item.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.type
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.room_type
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.country
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.season
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.sort_provider
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .slice(0, 4)
                    .map((item, key) => (
                      <Card
                        setId={setId}
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                        {...item}
                        key={key}
                      />
                    ))
                : data
                    .filter(
                      (item) =>
                        item.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.type
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.room_type
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.country
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.season
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.sort_provider
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .map((item, key) => (
                      <Card
                        setId={setId}
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                        {...item}
                        key={key}
                      />
                    ))}
            </div>
          </div>

          {showButton && (
            <div className={getMoreItems ? s.hidden : s.main__more_btn}>
              <button onClick={() => setGetMoreItems(!getMoreItems)}>
                Показать еще
              </button>
            </div>
          )}
        </div>
        {openModal && (
          <Modal
            id={id}
            data={data}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        )}
      </main>
    </>
  );
};

export default Main;
