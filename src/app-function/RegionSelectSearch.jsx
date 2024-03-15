import React, { useState } from "react";
import Select from "react-select";
import s from "./Function.module.css";

const options = [
  { value: 20, label: "Архангельск" },
  { value: 37, label: "Астрахань" },
  { value: 197, label: "Барнаул" },
  { value: 4, label: "Белгород" },
  { value: 77, label: "Благовещенск" },
  { value: 191, label: "Брянск" },
  { value: 24, label: "Великий Новгород" },
  { value: 75, label: "Владивосток" },
  { value: 33, label: "Владикавказ" },
  { value: 192, label: "Владимир" },
  { value: 38, label: "Волгоград" },
  { value: 21, label: "Вологда" },
  { value: 193, label: "Воронеж" },
  { value: 1106, label: "Грозный" },
  { value: 54, label: "Екатеринбург" },
  { value: 5, label: "Иваново" },
  { value: 63, label: "Иркутск" },
  { value: 41, label: "Йошкар-Ола" },
  { value: 43, label: "Казань" },
  { value: 22, label: "Калининград" },
  { value: 64, label: "Кемерово" },
  { value: 7, label: "Кострома" },
  { value: 35, label: "Краснодар" },
  { value: 62, label: "Красноярск" },
  { value: 53, label: "Курган" },
  { value: 8, label: "Курск" },
  { value: 9, label: "Липецк" },
  { value: 28, label: "Махачкала" },
  { value: 1, label: "Москва и Московская область" },
  { value: 213, label: "Москва" },
  { value: 23, label: "Мурманск" },
  { value: 1092, label: "Назрань" },
  { value: 30, label: "Нальчик" },
  { value: 47, label: "Нижний Новгород" },
  { value: 65, label: "Новосибирск" },
  { value: 66, label: "Омск" },
  { value: 10, label: "Орел" },
  { value: 48, label: "Оренбург" },
  { value: 49, label: "Пенза" },
  { value: 50, label: "Пермь" },
  { value: 25, label: "Псков" },
  { value: 11, label: "Рязань" },
  { value: 39, label: "Ростов-на-Дону" },
  { value: 51, label: "Самара" },
  { value: 2, label: "Санкт-Петербург" },
  { value: 42, label: "Саранск" },
  { value: 12, label: "Смоленск" },
  { value: 239, label: "Сочи" },
  { value: 36, label: "Ставрополь" },
  { value: 973, label: "Сургут" },
  { value: 13, label: "Тамбов" },
  { value: 14, label: "Тверь" },
  { value: 67, label: "Томск" },
  { value: 15, label: "Тула" },
  { value: 195, label: "Ульяновск" },
  { value: 172, label: "Уфа" },
  { value: 76, label: "Хабаровск" },
  { value: 45, label: "Чебоксары" },
  { value: 56, label: "Челябинск" },
  { value: 1106, label: "Черкесск" },
  { value: 1106, label: "Черкесск" },
  { value: 16, label: "Ярославль" },

  // Добавьте остальные города и их идентификаторы сюда
];

const RegionSelectSearch = ({ onSelect }) => {
  const defaultOption = options.find((option) => option.value === 213); // Находим объект для региона Черкесск
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    debugger;
    onSelect(selectedOption); // Передача выбранного значения в родительский компонент
  };

  return (
    <div>
      <h2>Регион продвижения:</h2>
      <Select
        className={s.selectRegion}
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

export default RegionSelectSearch;
