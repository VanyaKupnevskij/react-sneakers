import styles from "./LineCard.module.scss";

function BasketCard(props) {
  const { cardInfo } = props;

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
        <span className={styles.price}>{cardInfo.product.price} грн.</span>
      </div>
      <button className={styles.delete}>
        <img src="images/delete.svg" alt="del" />
      </button>
    </div>
  );
}

export default BasketCard;