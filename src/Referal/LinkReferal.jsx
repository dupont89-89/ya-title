import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function LinkReferal() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const refParam = searchParams.get("ref");
    if (refParam) {
      // Здесь можно выполнить действия на основе значения параметра "ref"
      localStorage.setItem("referralCode", refParam);
      console.log("Referral parameter:", refParam);
    }
  }, [location.search]);

  return null;
}

export default LinkReferal;
