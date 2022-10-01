import styles from "./LineCard.module.scss";

function BasketCard() {
  return (
    <div className={styles.card}>
      <img
        className={styles.preview}
        src="images/Products/01.png"
        alt="preview"
      />
      <div className={styles.info}>
        <p className={styles.description}>
          Мужские Кроссовки Nike Air Max 270
        </p>
        <span className={styles.price}>12 999 грн.</span>
      </div>
      <button className={styles.delete}>
        <img src="images/delete.svg" alt="del" />
      </button>
    </div>
  );
}

export default BasketCard;