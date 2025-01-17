-- Создание таблицы для стран выращивания
CREATE TABLE country (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

-- Создание таблицы для типов цветов
CREATE TABLE type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

-- Создание таблицы для мест выращивания
CREATE TABLE room_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

-- Создание таблицы для цветов с внешними ключами
CREATE TABLE flower (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    characteristics VARCHAR(255),
    season VARCHAR(255),
    sort_provider VARCHAR(255),
    img VARCHAR(255),
    country_id INT,
    type_id INT,
    room_type_id INT,
    FOREIGN KEY (country_id) REFERENCES country(id),
    FOREIGN KEY (type_id) REFERENCES type(id),
    FOREIGN KEY (room_type_id) REFERENCES room_type(id)
);

-- Создание таблицы для пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для избранных цветов пользователей
CREATE TABLE user_favorite_flowers (
    user_id INT,
    flower_id INT,
    PRIMARY KEY (user_id, flower_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (flower_id) REFERENCES flower(id)
);

-- Вставка данных в таблицу country
INSERT INTO country (name) VALUES ('Россия'), ('Нидерланды'), ('Колумбия'), ('Индия'), ('Африка'), ('Китай'), ('Мексика');

-- Вставка данных в таблицу type
INSERT INTO type (name) VALUES ('Садовый'), ('Комнатный');

-- Вставка данных в таблицу room_type
INSERT INTO room_type (name) VALUES ('Теплица'), ('Открытый грунт'), ('Оранжерея');

-- Вставка данных в таблицу flower
INSERT INTO flower (name, characteristics, season, sort_provider, img, country_id, type_id, room_type_id)
VALUES
('Агератум', 'Красивый агератум', 'Лето', 'Агератум Провайдер', 'ageratum.png', 1, 1, 1),
('Астра', 'Красивая астра', 'Осень', 'Астра Провайдер', 'astra.png', 2, 1, 2),
('Фикус', 'Красивый фикус', 'Круглый год', 'Фикус Провайдер', 'ficus.png', 3, 2, 3),
('Георгины', 'Красивые георгины', 'Лето', 'Георгины Провайдер', 'georgins.png', 4, 1, 1),
('Хамедория', 'Красивая хамедория', 'Круглый год', 'Хамедория Провайдер', 'khamedoria.png', 5, 2, 2),
('Лобеллия', 'Красивая лобеллия', 'Лето', 'Лобеллия Провайдер', 'lobelia.png', 6, 1, 3),
('Мирт', 'Красивый мирт', 'Круглый год', 'Мирт Провайдер', 'mirt.png', 7, 2, 1),
('Петунья', 'Красивая петунья', 'Лето', 'Петунья Провайдер', 'petunya.png', 1, 1, 2),
('Рипсалис', 'Красивый рипсалис', 'Круглый год', 'Рипсалис Провайдер', 'ripsalis.png', 2, 2, 3),
('Сальвия', 'Красивая сальвия', 'Лето', 'Сальвия Провайдер', 'salvia.png', 3, 1, 1),
('Замиокулькас', 'Красивый замиокулькас', 'Круглый год', 'Замиокулькас Провайдер', 'zamiokulkas.png', 4, 2, 2);
