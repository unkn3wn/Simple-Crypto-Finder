const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export const fetchCryptos = async () => {
  try {
    const response = await fetch(`${url}`);
    const result = await response.json();
    return result;
  } catch (err) {
    resizeBy.send(err);
  }
  
};
