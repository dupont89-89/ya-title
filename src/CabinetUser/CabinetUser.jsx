import React from "react";
import s from "./CabinetUser.module.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function CabinetUser(props) {
  const { tools } = props;
  let config;

  if (process.env.NODE_ENV === "development") {
    config = require("../config.dev");
  } else {
    config = require("../config.prod");
  }
  return (
    <div className={s.wrapper}>
      <div className={s.sectionGrid}>
        <section className={s.cabinetUser}>
          <div className={s.sectionTitleCabinet}>
            <h1>Кабинет пользователя</h1>
          </div>
          <div className={s.sectionContentCabinet}>
            <div className={s.blockTools}>
              <h2>Определение типа ключевого запроса </h2>
              {tools && tools.length > 0 ? (
                <ul>
                  {tools.map((tool, index) => (
                    <li className={s.blockItemResult} key={index}>
                      <div className={s.gridList}>
                        <span>
                          Дата проверки
                          <br />
                          {format(
                            new Date(tool.dateAdded),
                            "dd-MM-yyyy HH:mm:ss"
                          )}
                        </span>
                        <span>
                          Результат:{" "}
                          <a
                            href={`${config.REACT_APP_SERVER_URL}${tool.fileTools}`}
                          >
                            Скачать
                          </a>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className={s.noData}>Нет данных</span>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
