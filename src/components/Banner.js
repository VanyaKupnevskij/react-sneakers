import "../App.scss";

function Banner()
{
    return (
      <section className="banner">
        <div className="container">
          <div className="banner__inner">
            <button className="banner__btn banner__btn-prev banner__btn-prev--hiden">
              <img className="banner__btn-prev-img" src="images/left.svg" alt="prev"/>
            </button>
            <div className="banner__items">
              <div className="banner__item">
                <img className="banner__item-logo" src="images/Banners/banner-1-part3.png" alt="logo adidas"/>
                <p className="banner__item-text-vertical">KERMIT</p>
                <p className="banner__item-title"><span>Stan Smith</span>,<br/>Forever</p>
                <a className="banner__item-link" href="#">Купить</a>
                <img className="banner__item-img1" src="images/Banners/banner-1-part1.png" alt="image banner"/>
                <img className="banner__item-img2" src="images/Banners/banner-1-part2.png" alt="image banner"/>
              </div>
            </div>
            <button className="banner__btn banner__btn-next">
              <img className="banner__btn-next-img" src="images/right.svg" alt="right"/>
            </button>
          </div>
        </div>
      </section>
    );
}

export default Banner;