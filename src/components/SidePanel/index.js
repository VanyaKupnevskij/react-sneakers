import styles from "./SidePanel.module.scss";
import BasketCard from "../BasketCard";
import { priceToString } from "../../myService";
import React, { useState } from "react";

function SidePanel({ userId, basket = [], setBasket, handlerBasket }) {

  const [ stateDisp, setStateDisp ] = useState('empty');

  return (
    <div className={`${styles.side_basket} `}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          Корзина
          <button className={styles.close} onClick={ () => {
              handlerBasket(false);
              setStateDisp('empty');
            }}>
            <img src="images/delete.svg" alt="del" />
          </button>
        </h2>
        

        {
          (basket.length > 0) ?
          <MainContent userId={userId} basket={basket} setBasket={setBasket} setStateDisp={setStateDisp}/> :
          (stateDisp == 'ready') ?
          <MessageReady handlerBasket={handlerBasket}/> :
          (stateDisp == 'empty') ?
          <MessageEmpty handlerBasket={handlerBasket}/> :
          ""
        }        
      </div>
    </div>
  );
}

function MainContent({ userId, basket = [], setBasket, setStateDisp })
{
  let sumProducts = 0;
  basket.forEach(item => sumProducts += item.product.price );

  const removeProduct = (card) => {
    let order;
    basket.forEach(o => {
      if (o.id == card.id)
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

  const submitBuy = () => {
    fetch('http://192.168.0.104:5008/api/orders/buy/'+userId, {
        method: 'PUT'
    })
    .then((d) => {
      setBasket([]);
      setStateDisp('ready');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  return (
    <div className={styles.content}>
      <div className={styles.product_list}>
        {
          basket.map((card) => {
            return <BasketCard cardInfo={card} handlerRemove={removeProduct} key={card.id}/>
          })
        } 
      </div>
      <div className={styles.total}>
        <p>Итого:</p>
        <div className={styles.result_line}></div>
        <b>{ priceToString(sumProducts) } грн.</b>
      </div>
      <div className={styles.tax}>
        <p>Налог 5%:</p>
        <div className={styles.result_line}></div>
        <b>{ priceToString(sumProducts / 100 * 5) } грн.</b>
      </div>
      <button className={styles.btn} onClick={ submitBuy }>
        <img
          className={styles.btn_img}
          src="images/arrow-right.svg"
          alt="back img"
        />
        Оформить заказ
      </button>
    </div>
  );
}

function MessageReady({ handlerBasket })
{
  return (
    <div className={styles.message}>
      <img
        className={styles.image}
        src="images/ready-order.png"
        alt="ready order img"
        width={83}
      />
      <h3>Заказ оформлен!</h3>
      <p className={styles.description}>
        Ваш заказ скоро будет передан курьерской доставке.
      </p>
      <button className={styles.btn} onClick={ () => handlerBasket(false) }>
        <img
          className={styles.btn_img}
          src="images/arrow-left.svg"
          alt="back img"
        />
        Вернуться назад
      </button>
    </div>
  );
}

function MessageEmpty({ handlerBasket })
{
  return (
    <div className={styles.message}>
      <img
        className={styles.image}
        src="images/empty-basket.png"
        alt="empty basket img"
      />
      <h3>Корзина пустая</h3>
      <p className={styles.description}>
        Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
      </p>
      <button className={styles.btn} onClick={ () => handlerBasket(false) }>
        <img
          className={styles.btn_img}
          src="images/arrow-left.svg"
          alt="back img"
        />
        Вернуться назад
      </button>
    </div>
  );
}

export default SidePanel;
