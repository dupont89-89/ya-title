import { useEffect } from "react";

const TrackingReferalUrl = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get("ref");

    if (refParam) {
      localStorage.setItem("ref", refParam);
    }
  }, []);

  return null; // Возвращаем null, так как компонент ничего не должен отображать
};

export default TrackingReferalUrl;
