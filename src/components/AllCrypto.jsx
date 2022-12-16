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
      {" "}
      <input
        type="text"
        placeholder="search"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <div className="flex flex-wrap">
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
              <div key={info.id} className="flex flex-wrap ml-10 mt-10">
                <div className="flex flex-col">
                  <h1>{info.symbol}</h1>
                  <h1>{info.name}</h1>

                  {info.price_change_percentage_24h < 0 ? (
                    <p className="text-red-600">
                      {info.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-green-400">
                      {info.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  )}

                  <img className="h-10 w-10 justify-center" src={info.image} />
                  <h1>{info.current_price}</h1>
                  <h1>{info.market_cap}</h1>
                  <h1>{info.total_volume}</h1>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
