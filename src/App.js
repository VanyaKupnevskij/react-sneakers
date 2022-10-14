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

  const [isOpenBasket, setOpenBasket] = useState(false);
  const [sumPrice, setSumPrice] = useState(0);

  const getData = () => {
    fetch('http://192.168.0.104:5008/api/products')
      .then((resp) => resp.json())
      .then((res) => {return setProducts(res);})
      .catch((err) => console.log(err));

    fetch('http://192.168.0.104:5008/api/favorites/'+idUser)
      .then((resp) => resp.json())
      .then((res) => {return setFavorites(res);})
      .catch((err) => console.log(err));

    fetch('http://192.168.0.104:5008/api/orders/basket/'+idUser)
      .then((resp) => resp.json())
      .then((res) => {return setBasket(res);})
      .catch((err) => console.log(err));

    fetch('http://192.168.0.104:5008/api/orders/purchases/'+idUser)
      .then((resp) => resp.json())
      .then((res) => {return setPurchases(res);})
      .catch((err) => console.log(err));
  }

  useEffect(() => {
      getData();
  }, []);

  const onClickFavorite = (card) => {
    card.isFavorite = !(card.isFavorite);

    const sendData = {
        "user_Id": idUser,
        "user": {
            "name": "Admin",
            "password": "12345",
            "id": 1
        },
        "product_Id": card.id,
        "product": {
            "name": card.name,
            "preview": card.preview,
            "price": card.price,
            "id": card.id
        },
        "is_Favorite": card.isFavorite
    }

    if (card.isFavorite)
    {
      fetch('http://192.168.0.104:5008/api/favorites', {
          method: 'PUT', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData)
      })
      .then((response) => response.json())
      .then((d) => setFavorites([...favorites, d]))
      .catch((error) => {
          console.error('Error:', error);
      });
    }
    else
    {
      let prod;
      favorites.forEach(o => {
        if (o.product_Id == card.id)
        {
          sendData.id = o.id;
          prod = o;
        }
      });

      fetch('http://192.168.0.104:5008/api/favorites', {
          method: 'DELETE', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData)
      })
      .then((response) => response.json())
      .then((d) => {
        const index = favorites.indexOf(prod);
        if (index > -1) { 
          favorites.splice(index, 1); 
        }
        setFavorites([...favorites])
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    }
  };

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
        "created_time": new Date().toISOString().slice(0, 19),
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
      .then((d) => { setBasket([...basket, d]); })
      .catch((error) => {
          console.error('Error:', error);
      });
    }
    else
    {
      let order;
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

  const onBasketOpen = (isOpen) => {
    setOpenBasket(isOpen);
  }

  const onSumPrice = () => {
    let sumProducts = 0;
    basket.forEach(item => sumProducts += item.product.price );
    setSumPrice(sumProducts);
  }

  useEffect(onSumPrice, [basket]);

  return <div className='wrapper'>
      
      { 
        isOpenBasket && 
        <SidePanel userId={idUser} basket={basket} setBasket={setBasket} handlerBasket={onBasketOpen}/> 
      }
      <Header sumPrice={sumPrice} handlerBasket={onBasketOpen} />

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
                    return (<Card cardInfo={card} handlerFavorite={onClickFavorite} handlerBuy={onClickBuy} key={card.id}/>)
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
