import logo from './logo.svg';
import React, { useState } from "react";
import './App.scss';
import Card from './components/Card';
import SidePanel from './components/SidePanel';
import DB_cards from './DB_cards';

function App() {
  const [isShowSide, ShowSide] = useState(false);

  const side_basket = (
    <div className="side-basket " onClick={() => { ShowSide(false) }}>
      <div className="side-basket__inner">
        <h2 class="side-basket__title">Корзина</h2>
      
        <div class="side-basket__content ">
          <div class="side-basket__product-list">
            <div class="side-basket__product">
              <img class="side-basket__product-preview" src="images/Products/01.png" alt="preview"/>
              <div class="side-basket__product-info">
                <p class="side-basket__product-description">Мужские Кроссовки Nike Air Max 270</p>
                <span class="side-basket__product-price">12 999 грн.</span>
              </div>
              <button class="side-basket__product-delete">
                <img src="images/delete.svg" alt="del"/>
              </button>
            </div>
            <div class="side-basket__product">
              <img class="side-basket__product-preview" src="images/Products/02.png" alt="preview"/>
              <div class="side-basket__product-info">
                <p class="side-basket__product-description">Мужские Кроссовки Nike Air Max 270</p>
                <span class="side-basket__product-price">1 999 грн.</span>
              </div>
              <button class="side-basket__product-delete">
                <img src="images/delete.svg" alt="del"/>
              </button>
            </div>
          </div>
          <div class="side-basket__total">
            <p class="side-basket__result-title">Итого:</p>
            <div class="side-basket__result-line"></div>
            <b class="side-basket__result-num">12 999 грн.</b>
          </div>
          <div class="side-basket__tax">
            <p class="side-basket__result-title">Налог 5%:</p>
            <div class="side-basket__result-line"></div>
            <b class="side-basket__result-num">1900 грн.</b>
          </div>
          <button class="side-basket__btn">
            <img class="side-basket__btn-img" src="images/arrow-right.svg" alt="back img"/>
            Оформить заказ
          </button>
        </div>

        <div className="side-basket__message side-basket__message--empty hidden">
          <img className="side-basket__image" src="images/empty-basket.png" alt="empty basket img"/>
          <h3 className="side-basket__subtitle">Корзина пустая</h3>
          <p className="side-basket__description">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
          <button className="side-basket__btn">
            <img className="side-basket__btn-img" src="images/arrow-left.svg" alt="back img"/>
            Вернуться назад
          </button>
        </div>

        <div className="side-basket__message side-basket__message--ready hidden">
          <img className="side-basket__image" src="images/ready-order.png" alt="ready order img" width={83}/>
          <h3 className="side-basket__subtitle">Заказ оформлен!</h3>
          <p className="side-basket__description">Ваш заказ #18 скоро будет передан курьерской доставке.</p>
          <button className="side-basket__btn">
            <img className="side-basket__btn-img" src="images/arrow-left.svg" alt="back img"/>
            Вернуться назад
          </button>
        </div> 
      </div>
    </div>);

  return <div className='wrapper'>
      

      <header className="header">
        <div className="container">
          <div className="header__inner">
            <div className="header__name-block">
              <a className="header__logo-link" href="#">
                <img className="header__logo-img" src="images/logo.png" alt="logo"/>
              </a>
              <div className="header__name">
                <b className="header__name-title">REACT SNEAKERS</b>
                <p className="header__name-description">Магазин лучших кроссовок</p>
              </div>
            </div>
            <nav className="menu">
              <ul className="menu__list">
                <li className="menu__basket">
                  <button className="menu__basket-link" onClick={() => { ShowSide(true) }}>
                    <img className="menu__basket-img" src="images/basket.svg" alt="basket"/>
                    <span className="menu__basket-price">1205 грн.</span>
                  </button>
                </li>
                <li className="menu__favorite">
                  <a className="menu__favorite-link" href="#">
                    <svg className="menu__favorite-img" width="21" height="19" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path stroke='#9B9B9B' strokeWidth={1.6} d="M14.5849 3.22311C14.3615 2.7098 14.0394 2.24464 13.6365 1.85368C13.2333 1.46155 12.758 1.14993 12.2363 0.935761C11.6954 0.712803 11.1152 0.59868 10.5295 0.600018C9.70772 0.600018 8.90596 0.823295 8.20921 1.24504C8.04253 1.34593 7.88418 1.45674 7.73416 1.57748C7.58414 1.45674 7.42579 1.34593 7.2591 1.24504C6.56236 0.823295 5.7606 0.600018 4.93884 0.600018C4.3471 0.600018 3.7737 0.712483 3.23198 0.935761C2.70858 1.15077 2.23686 1.46005 1.83181 1.85368C1.42843 2.2442 1.10619 2.70947 0.883373 3.22311C0.65168 3.75732 0.533333 4.32461 0.533333 4.90844C0.533333 5.45919 0.646679 6.0331 0.871705 6.61693C1.06006 7.10483 1.33009 7.61092 1.67513 8.12198C2.22186 8.93074 2.97361 9.77423 3.90705 10.6293C5.4539 12.0467 6.98574 13.0258 7.05075 13.0655L7.44579 13.3169C7.62081 13.4277 7.84584 13.4277 8.02086 13.3169L8.4159 13.0655C8.48091 13.0242 10.0111 12.0467 11.5596 10.6293C12.493 9.77423 13.2448 8.93074 13.7915 8.12198C14.1366 7.61092 14.4083 7.10483 14.5949 6.61693C14.82 6.0331 14.9333 5.45919 14.9333 4.90844C14.935 4.32461 14.8166 3.75732 14.5849 3.22311V3.22311Z"/>
                    </svg>
                  </a>
                </li>
                <li className="menu__profile">
                  <a className="menu__profile-link" href="#">
                    <img className="menu__profile-img" src="images/profile.svg" alt="profile"/>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="main">
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
                <Card cardInfo={DB_cards[0]} />
                <Card cardInfo={DB_cards[1]} />
                <Card cardInfo={DB_cards[2]} />
                <Card cardInfo={DB_cards[3]} />
                <Card cardInfo={DB_cards[4]} />
                <Card cardInfo={DB_cards[5]} />
                <Card cardInfo={DB_cards[6]} />
                <Card cardInfo={DB_cards[7]} />
                <Card cardInfo={DB_cards[8]} />
                <Card cardInfo={DB_cards[9]} />
              </div>
            </div>
          </div>
        </section>
      </main>
      {isShowSide ? side_basket : ""}
    </div>
  
}

export default App;
