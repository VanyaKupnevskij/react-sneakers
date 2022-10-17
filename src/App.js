import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import AppContext from "./context";
import API from "./apiAxios";
import "./App.scss";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import SidePanel from "./components/SidePanel";

function App() {
  const idUser = 1;
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [basket, setBasket] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const [isOpenBasket, setOpenBasket] = useState(false);
  const [sumPrice, setSumPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  async function getData() {
    setIsLoading(true);
    const [ favoritesResp, basketResp, purchasesResp, productsResp ] = await Promise.all([
      API.get("favorites/" + idUser),
      API.get("orders/basket/" + idUser),
      API.get("orders/purchases/" + idUser),
      API.get("products")
    ]);
    setIsLoading(false);

    setFavorites(favoritesResp.data)
    setBasket(basketResp.data)
    setPurchases(purchasesResp.data)
    setProducts(productsResp.data)
  }

  useEffect(() => {
    getData();
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
      API.post("favorites", sendData)
        .then((d) => setFavorites((prev) => [...prev, d.data]));
    } 
    else {
      const idProd = favorites.find((item) => item.product_Id == card.id).id;

      API.delete("favorites/" + idProd)
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
      API.post("orders", sendData)
        .then((d) => setBasket((prev) => [...prev, d.data]));
    } 
    else {
      const idOrder = basket.find((item) => item.product_Id == card.id).id;

      API.delete("orders/" + idOrder)
        .then(() => setBasket((prev) => prev.filter((item) => item.product_Id !== card.id)));
    }
  };

  function onBasketOpen(isOpen) {
    setOpenBasket(isOpen);
  };

  function onSumPrice() {
    setSumPrice(basket.reduce((sum, item) => sum + item.product.price, 0));
  };

  useEffect(onSumPrice, [basket]);

  function onSubmitBuy() {
    API.put("orders/buy/" + idUser).then(() => setBasket([]));
  }

  return (
    <AppContext.Provider value={{ products, favorites, basket, purchases, isLoading, onClickBuy, onClickFavorite }}>
      <div className="wrapper">
        {isOpenBasket && (
          <SidePanel
            sumProducts={sumPrice}
            handlerBuy={onClickBuy}
            handlerSubmit={onSubmitBuy}
            handlerBasket={onBasketOpen}
          />
        )}
        <Header sumPrice={sumPrice} handlerBasket={onBasketOpen} />

        <Routes>
            <Route index exact path="react-sneakers/" element={ 
              <Home searchValue={searchValue}
                setSearchValue={setSearchValue}/> 
            }/>
            <Route strict exact path="/react-sneakers/favorites/" element={ 
              <Favorites/> 
            }/>
            <Route strict exact path="react-sneakers//profile/" element={ 
              <Profile/> 
            }/>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
