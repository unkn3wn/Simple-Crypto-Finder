import { fetchCryptos } from "../api";

import { useState, useEffect } from "react";
import styles from "../styles/cards.module.css";
import Aos from "aos"
import "aos/dist/aos.css";

export default function AllCrpyto() {
  const [crypto, setCrypto] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const refreshPage = () =>{
    window.location.reload();
  }

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    async function getAllCrypto() {
      const crypt = await fetchCryptos();
      setCrypto(crypt);
    }
    getAllCrypto();
  }, []);

  return (
    <div >
      <div className="sticky top-0 bg-black">
        <h1 className="text-center text-white ">SEARCH FOR A CRYPTO OF YOUR CHOICE</h1>
        <h4 className="text-center text-white "> Refresh about every 5-10 minutes</h4>
          <button  className={styles.bttn} onClick={refreshPage}>Refresh</button>
        
        <input
          className="bg-red-600 text-center w-full  h-10 mt-2"
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
              <div key={info.id} data-aos="fade-up" className={styles.format}>
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
