CREATE TYPE order_status AS ENUM ('pre-order', 'confirmed', 'done');

CREATE TYPE user_role AS ENUM ('customer', 'regular customer', 'operator', 'admin');

CREATE TABLE "products" (
  "id" serial PRIMARY KEY,
  "name" text,
  "base_price" numeric,
  "unit" text,
  "weight" numeric,
  "is_perishable" boolean,
  "category" bigint,
  "supplier" bigint
);

CREATE TABLE "remnants" (
  "id" serial PRIMARY KEY,
  "count" bigint,
  "actual_price" numeric,
  "delivery_date" timestamp,
  "expire_date" timestamp,
  "product" bigint
);

CREATE TABLE "categories" (
  "id" serial PRIMARY KEY,
  "name" text
);

CREATE TABLE "suppliers" (
  "id" serial PRIMARY KEY,
  "name" text,
  "address" text,
  "telephone" text
);

CREATE TABLE "order_details" (
  "id" serial PRIMARY KEY,
  "count" bigint,
  "good" bigint,
  "order" bigint,
  "remnant" bigint
);

CREATE TABLE "orders" (
  "id" serial PRIMARY KEY,
  "sum" numeric,
  "status" order_status,
  "customer" bigint
);

CREATE TABLE "customers" (
  "id" serial PRIMARY KEY,
  "surname" text,
  "name" text,
  "patronym" text,
  "telephone" text,
  "user" bigint
);

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" text,
  "password" text,
  "role" user_role
);

ALTER TABLE "products" ADD FOREIGN KEY ("category") REFERENCES "categories" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("supplier") REFERENCES "suppliers" ("id");

ALTER TABLE "remnants" ADD FOREIGN KEY ("product") REFERENCES "products" ("id");

ALTER TABLE "order_details" ADD FOREIGN KEY ("good") REFERENCES "products" ("id");

ALTER TABLE "order_details" ADD FOREIGN KEY ("order") REFERENCES "orders" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customer") REFERENCES "customers" ("id");

ALTER TABLE "customers" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");

INSERT INTO "suppliers" ("name", "address", "telephone") VALUES
  ('Хлебный дом', 'город Покров, Владимирская область, проезд Великий, дом 5, строение 21', '+7 (800) 499-99-99'),
  ('Булкин и компания', 'город Саранск, республика Мордовия, улица 60-летия Октября, дом 1, строение 5', '+7 (842) 111-22-33'),
  ('Макаронный монстр', 'город Москва, шоссе Энтузиастов, дом 99', '+7 (499) 123-45-67'),
  ('Крупа дома', 'город Москва, шоссе Энтузиастов, дом 100', '+7 (499) 890-12-34'),
  ('Ступинский молококомбинат', 'город Ступино, Ступинский район, улица Грустная, дом 8', '+7 (903) 999-88-77'),
  ('Овощ-фрукт.рф', 'город Ступино, Ступинский район, улица Грустная, дом 10', '+7 (903) 666-55-44'),
  ('Овощи и фрукты от дяди Вани', 'город Ступино, Ступинский район, улица Грустная, дом 11', '+7 (903) 333-22-11'),
  ('Сладко.рф', 'рабочий посёлок Михнево, Ступинский район, улица Рабочая, дом 32', '+7 (912) 167-92-43'),
  ('Пират-мармелад', 'город Москва, улица Пушкина, дом 3, корпус 2, строение 5а', '+7 (495) 100-20-30'),
  ('Сладость-нерадость', 'город Москва, улица Пушкина, дом 7, корпус 8, строение 5', '+7 (495) 712-84-95'),
  ('Чай-таун', 'город Москва, улица Пушкина, дом 5, корпус 2, строение 1', '+7 (495) 400-50-60'),
  ('НеЧай-таун', 'город Москва, улица Пушкина, дом 6, корпус 3, строение 4', '+7 (495) 700-80-90'),
  ('Мясокомбинат московский', 'город Москва, улица Булатниковская, дом 21, корпус 6', '+7 (495) 987-65-43'),
  ('Рыбхоз Бисерово', 'Богородский городской округ, Ногинский район, село Бисерово, дом 9, строение 2', '+7 (900) 123-12-23');