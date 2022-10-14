import styles from "./LineCard.module.scss";
import { priceToString } from "../../myService";

function BasketCard({ cardInfo, handlerRemove }) {

  return (
    <div className={styles.card}>
      <img
        className={styles.preview}
        src={cardInfo.product.preview}
        alt="preview"
      />
      <div className={styles.info}>
        <p className={styles.description}>
          {cardInfo.product.name}
        </p>
        <span className={styles.price}>{ priceToString(cardInfo.product.price) } грн.</span>
      </div>
      <button className={styles.delete} onClick={ () => handlerRemove(cardInfo) }>
        <img src="images/delete.svg" alt="del" />
      </button>
    </div>
  );
}

export default BasketCard;