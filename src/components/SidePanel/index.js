import styles from "./SidePanel.module.scss";
import BasketCard from "../BasketCard";

var stateDisp = 'empty';

function SidePanel(props) {
  const { basket, handlerBasket } = props;

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
          <MainContent basket={basket}/> :
          (stateDisp == 'ready') ?
          <MessageReady/> :
          (stateDisp == 'empty') ?
          <MessageEmpty/> :
          ""
        }        
      </div>
    </div>
  );
}

function MainContent(props)
{
  const { basket } = props;

  return (
    <div className={styles.content}>
      <div className={styles.product_list}>
        {
          basket.map((card) => {
            return <BasketCard cardInfo={card} key={card.id}/>
          })
        } 
      </div>
      <div className={styles.total}>
        <p>Итого:</p>
        <div className={styles.result_line}></div>
        <b>12 999 грн.</b>
      </div>
      <div className={styles.tax}>
        <p>Налог 5%:</p>
        <div className={styles.result_line}></div>
        <b>1900 грн.</b>
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

function MessageEmpty()
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

export default SidePanel;
