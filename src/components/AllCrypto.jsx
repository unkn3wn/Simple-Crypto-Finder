import { fetchCryptos } from "../api";

import { useState, useEffect } from "react";

export default function AllCrpyto() {
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    async function getAllCrypto() {
      const crypt = await fetchCryptos();
      setCrypto(crypt);
    }
    getAllCrypto();
  }, []);

  return (
    <div>
      {crypto.map((info) => {
        return (
          <div key={info}>
            <h1>{info.id}</h1>
            <h1>{info.symbol}</h1>
            <h1>{info.name}</h1>
            <img src={info.image} />
            <h1>{info.current_price}</h1>
            <h1>{info.market_cap}</h1>
            <h1>{info.total_volume}</h1>
          </div>
        );
      })}
    </div>
  );
}
