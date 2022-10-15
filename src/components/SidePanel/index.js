import styles from "./SidePanel.module.scss";
import BasketCard from "../BasketCard";
import { priceToString } from "../../myService";
import React, { useState, useContext } from "react";
import AppContext from "../../context";

function SidePanel({ sumProducts, handlerBuy, handlerSubmit, handlerBasket }) {

  const { basket } = useContext(AppContext);
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
          <MainContent sumProducts={sumProducts} handlerBuy={handlerBuy} handlerSubmit={handlerSubmit} setStateDisp={setStateDisp}/> :
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

function MainContent({ sumProducts, handlerBuy, handlerSubmit, setStateDisp })
{
  const { basket } = useContext(AppContext);

  const submitBuy = () => {
    handlerSubmit();
    setStateDisp('ready');
  }

  return (
    <div className={styles.content}>
      <div className={styles.product_list}>
        {
          basket.map((card) => 
            <BasketCard cardInfo={card} handlerRemove={() => handlerBuy(card.product, card.in_Basket)} key={card.id}/>)
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
