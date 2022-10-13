import styles from "./SidePanel.module.scss";
import BasketCard from "../BasketCard";
import { priceToString } from "../../myService";

var stateDisp = 'empty';

function SidePanel(props) {
  const { basket, setBasket, handlerBasket } = props;

  return (
    <div className={`${styles.side_basket} `}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          Корзина
          <button className={styles.close} onClick={ () => handlerBasket(false)}>
            <img src="images/delete.svg" alt="del" />
          </button>
        </h2>
        

        {
          (basket.length > 0) ?
          <MainContent basket={basket} setBasket={setBasket}/> :
          (stateDisp == 'ready') ?
          <MessageReady/> :
          (stateDisp == 'empty') ?
          <MessageEmpty handlerBasket={handlerBasket}/> :
          ""
        }        
      </div>
    </div>
  );
}

function MainContent(props)
{
  const { basket, setBasket } = props;

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
      <button className={styles.btn}>
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

function MessageReady()
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
        Ваш заказ #18 скоро будет передан курьерской доставке.
      </p>
      <button className={styles.btn}>
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

function MessageEmpty(props)
{
  const { handlerBasket } = props;

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
