import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.scss';
import Card from './components/Card';
import Header from './components/Header';
import Banner from './components/Banner';
import SidePanel from './components/SidePanel';
import DB_cards from './DB_cards';

function App() {

  const idUser = 1;
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [basket, setBasket] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const getData = () => {
    fetch('http://192.168.0.104:5008/api/products')
      .then((resp) => resp.json())
      .then((res) => {console.log(res); return setProducts(res);})
      .catch((err) => console.log(err));

    fetch('http://192.168.0.104:5008/api/favorites/'+idUser)
      .then((resp) => resp.json())
      .then((res) => {console.log(res); return setFavorites(res);})
      .catch((err) => console.log(err));

    fetch('http://192.168.0.104:5008/api/orders/basket/'+idUser)
      .then((resp) => resp.json())
      .then((res) => {console.log(res); return setBasket(res);})
      .catch((err) => console.log(err));

    fetch('http://192.168.0.104:5008/api/orders/purchases/'+idUser)
      .then((resp) => resp.json())
      .then((res) => {console.log(res); return setPurchases(res);})
      .catch((err) => console.log(err));
  }

  useEffect(() => {
      getData();
  }, []);

  const onClickBuy = (card) => {
    card.inBasket = !(card.inBasket);

    const sendData = {
        "user_Id": idUser,
        "user": {
            "name": "Admin",
            "password": "12345"
        },
        "product_Id": card.id,
        "product": {
            "name": card.name,
            "preview": card.preview,
            "price": card.price
        },
        "count_product": 1,
        "created_time": "2022-11-11T00:00:00",
        "in_Basket": card.inBasket
    }

    if (card.inBasket)
    {
      fetch('http://192.168.0.104:5008/api/orders', {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData)
      })
      .then((response) => response.json())
      .then((d) => setBasket([...basket, d]))
      .catch((error) => {
          console.error('Error:', error);
      });
    }
    else
    {
      let order = 0;
      basket.forEach(o => {
        if (o.product_Id == card.id)
        {
          order = o;
        }
      });

      fetch('http://192.168.0.104:5008/api/orders/'+order.id, {
          method: 'DELETE', 
          headers: {
              'Content-Type': 'application/json',
          }
      })
      .then((response) => response.json())
      .then((d) => {
        const index = basket.indexOf(order);
        if (index > -1) { 
          basket.splice(index, 1); 
        }
        setBasket([...basket])
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    }
}

  return <div className='wrapper'>
      
      {/* <SidePanel/> */}
      <Header/>

      <main className="main">
        <Banner/>

        <section className="products">
          <div className="container">
            <div className="products__inner">
              <h1 className="products__title">Все кроссовки</h1>
              <div className="products__search">
                <input className="products__search-input" type="text" placeholder="Search..."/>
                <button className="products__search-btn">
                  <img src="images/search.svg" alt="search"/>
                </button>
              </div>
              <div className="products__items">
                {
                  products.map((card) => {
                    card.isFavorite = false;
                    card.inBasket = false;
                    favorites.forEach(o => {
                      if (o.product_Id == card.id)
                      {
                        card.isFavorite = true;
                      }
                    });
                    basket.forEach(o => {
                      if (o.product_Id == card.id)
                      {
                        card.inBasket = true;
                      }
                    });
                    return (<Card cardInfo={card} handlerBuy={onClickBuy} key={card.id}/>)
                  })
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  
}

export default App;
