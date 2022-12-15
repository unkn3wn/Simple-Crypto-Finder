import { fetchCryptos } from "../api";

import { useState, useEffect } from "react";

export default function AllCrpyto() {
  const [crypto, setCrypto] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getAllCrypto() {
      const crypt = await fetchCryptos();
      setCrypto(crypt);
    }
    getAllCrypto();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      {crypto
        .filter((info) => {
          if (setSearchTerm == "") {
            return info;
          } else if (
            info.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return info;
          }
        })
        .map((info) => {
          return (
            <div key={info.id}>
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
