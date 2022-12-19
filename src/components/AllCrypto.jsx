import { fetchCryptos } from "../api";

import { useState, useEffect } from "react";
import styles from "../styles/cards.module.css";

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
    <div >
      <h1>SEARCH FOR A CRYPTO OF YOUR CHOICE</h1>
      <div >
        <input
          className="bg-red-300 text-center w-full"
          type="text"
          placeholder="search"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>

      <div className={styles.allCard}>
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
              <div key={info.id} className={styles.format}>
                <div  className={styles.cards}>
                  <div className={styles.name}>
                    {" "}
                    <h1 className={styles.sym}>
                      SYM: {info.symbol.toUpperCase()}
                    </h1>
                    <h1>{info.name}</h1>
                  </div>
                  {info.price_change_percentage_24h < 0 ? (
                    <p className="text-red-600 text-center">
                      {info.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-green-400 text-center">
                      {info.price_change_percentage_24h}%
                    </p>
                  )}

                  <img className={styles.image} src={info.image} />
                  <h1 className={styles.wordingLeft}>
                    {" "}
                    <span className={styles.darkerText}>PRICE: </span> $
                    {info.current_price}
                  </h1>
                  <h1 className={styles.wordingLeft}>
                    {" "}
                    <span className={styles.darkerText}>
                      MARKET CAP 24HRS:{" "}
                    </span>{" "}
                    {info.market_cap}
                  </h1>
                  <h1 className={styles.wordingLeft}>
                    {" "}
                    <span className={styles.darkerText}>VOLUME: </span>{" "}
                    {info.total_volume}
                  </h1>
                  <h6 className={styles.smaller}>
                    <span className={styles.darkerText}>LAST UPDATED: </span>
                    {info.last_updated}
                  </h6>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
