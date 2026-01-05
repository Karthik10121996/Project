import { useEffect, useState } from "react";

function useConvertCurrency(fromCurr, toCurr) {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    async function getDollarPrice() {
      try {
        const res = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurr}`
        );
        const data = await res.json();
        setRate(data.rates[toCurr]);
      } catch (err) {
        console.error("Error fetching rate", err);
      }
    }

    getDollarPrice();
  }, [fromCurr, toCurr]);

  return rate;
}

export default useConvertCurrency;