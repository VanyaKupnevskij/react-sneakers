import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.scss";
import Card from "./components/Card";
import Header from "./components/Header";
import Banner from "./components/Banner";
import SidePanel from "./components/SidePanel";

function App() {
  const idUser = 1;
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [basket, setBasket] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const [isOpenBasket, setOpenBasket] = useState(false);
  const [sumPrice, setSumPrice] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("http://192.168.0.104:5008/api/products")
      .then((resp) => resp.json())
      .then((res) => setProducts(res));

    fetch("http://192.168.0.104:5008/api/favorites/" + idUser)
      .then((resp) => resp.json())
      .then((res) => setFavorites(res));

    fetch("http://192.168.0.104:5008/api/orders/basket/" + idUser)
      .then((resp) => resp.json())
      .then((res) => setBasket(res));

    fetch("http://192.168.0.104:5008/api/orders/purchases/" + idUser)
      .then((resp) => resp.json())
      .then((res) => setPurchases(res));
  }, []);

  function onClickFavorite(card, isFavorite) {
    card.isFavorite = !isFavorite;

    const sendData = {
      user_Id: idUser,
      user: {
        name: "Admin",
        password: "12345",
        id: 1,
      },
      product_Id: card.id,
      product: {
        name: card.name,
        preview: card.preview,
        price: card.price,
        id: card.id,
      }
    };

    if (card.isFavorite) {
      fetch("http://192.168.0.104:5008/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData)
      })
      .then((response) => response.json())
      .then((d) => setFavorites((prev) => [...prev, d]));
    } 
    else {
      const idProd = favorites.find((item) => item.product_Id == card.id).id;

      fetch("http://192.168.0.104:5008/api/favorites/" + idProd, {method: "DELETE"})
      .then((response) => response.json())
      .then(() => setFavorites((prev) => prev.filter((item) => item.product_Id !== card.id)));
    }
  };

  function onClickBuy(card, inBasket) {
    card.inBasket = !inBasket;

    const sendData = {
      user_Id: idUser,
      user: {
        name: "Admin",
        password: "12345",
      },
      product_Id: card.id,
      product: {
        name: card.name,
        preview: card.preview,
        price: card.price,
      },
      count_product: 1,
      created_time: new Date().toISOString().slice(0, 19),
      in_Basket: card.inBasket
    };

    if (card.inBasket) {
      fetch("http://192.168.0.104:5008/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData)
      })
      .then((response) => response.json())
      .then((d) => setBasket((prev) => [...prev, d]));
    } 
    else {
      const idOrder = basket.find((item) => item.product_Id == card.id).id;

      fetch("http://192.168.0.104:5008/api/orders/" + idOrder, {method: "DELETE"})
      .then((response) => response.json())
      .then(() => setBasket((prev) => prev.filter((item) => item.product_Id !== card.id)));
    }
  };

  function onBasketOpen(isOpen) {
    setOpenBasket(isOpen);
  };

  function onSumPrice() {
    let sumProducts = 0;
    basket.forEach((item) => (sumProducts += item.product.price));
    setSumPrice(sumProducts);
  };

  useEffect(onSumPrice, [basket]);

  function onSubmitBuy() {
    fetch('http://192.168.0.104:5008/api/orders/buy/' + idUser, { method: 'PUT' })
    .then(() => setBasket([]));
  }

  return (
    <div className="wrapper">
      {isOpenBasket && (
        <SidePanel
          sumProducts={sumPrice}
          basket={basket}
          handlerBuy={onClickBuy}
          handlerSubmit={onSubmitBuy}
          handlerBasket={onBasketOpen}
        />
      )}
      <Header sumPrice={sumPrice} handlerBasket={onBasketOpen} />

      <main className="main">
        <Banner />

        <section className="products">
          <div className="container">
            <div className="products__inner">
              <h1 className="products__title">
                {searchValue
                  ? "Поиск по запросу: " + searchValue
                  : "Все кроссовки"}
              </h1>
              <div className="products__search">
                <button className="products__search-btn">
                  <img src="images/search.svg" alt="search" />
                </button>
                <input
                  className="products__search-input"
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                />
                {searchValue && (
                  <button
                    className="products__search-delete"
                    onClick={() => setSearchValue("")}
                  >
                    <img src="images/delete.svg" alt="del" />
                  </button>
                )}
              </div>
              <div className="products__items">
                {products
                  .filter((prod) =>
                    prod.name
                      .toLowerCase()
                      .includes(searchValue.toLocaleLowerCase())
                  )
                  .map((card) => {
                    card.isFavorite = false;
                    card.inBasket = false;
                    favorites.forEach((o) => {
                      if (o.product_Id == card.id) {
                        card.isFavorite = true;
                      }
                    });
                    basket.forEach((o) => {
                      if (o.product_Id == card.id) {
                        card.inBasket = true;
                      }
                    });
                    return (
                      <Card
                        cardInfo={card}
                        handlerFavorite={onClickFavorite}
                        handlerBuy={onClickBuy}
                        key={card.id}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
