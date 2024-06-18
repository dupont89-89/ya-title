import React, { useState } from "react";
import axios from "axios";

const FetchKeyComponent = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleFetchKey = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/fetch-key", {
        query,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите запрос"
      />
      <button onClick={handleFetchKey}>Получить ключ</button>
      {result && <div>Результат: {JSON.stringify(result)}</div>}
    </div>
  );
};

export default FetchKeyComponent;
