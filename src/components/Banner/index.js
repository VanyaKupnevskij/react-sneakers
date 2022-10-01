import styles from "./Banner.module.scss";

function Banner()
{
    return (
      <section className={styles.banner}>
        <div className="container">
          <div className={styles.inner}>
            <button className={`${styles.btn_prev} ${styles.btn}`}>
              <img  src="images/left.svg" alt="prev"/>
            </button>
            <div className={styles.items}>
              <div className={styles.item}>
                <img className={styles.item_logo} src="images/Banners/banner-1-part3.png" alt="logo adidas"/>
                <p className={styles.item_text_vertical}>KERMIT</p>
                <p className={styles.item_title}><span>Stan Smith</span>,<br/>Forever</p>
                <a className={styles.item_link} href="#">Купить</a>
                <img className={styles.item_img1} src="images/Banners/banner-1-part1.png" alt="image banner"/>
                <img className={styles.item_img2} src="images/Banners/banner-1-part2.png" alt="image banner"/>
              </div>
            </div>
            <button className={`${styles.btn_next} ${styles.btn}`}>
              <img src="images/right.svg" alt="right"/>
            </button>
          </div>
        </div>
      </section>
    );
}

export default Banner;