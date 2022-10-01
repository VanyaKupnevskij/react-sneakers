import logo from './logo.svg';
import React, { useState } from "react";
import './App.scss';
import Card from './components/Card';
import Header from './components/Header';
import Banner from './components/Banner';
import SidePanel from './components/SidePanel';
import DB_cards from './DB_cards';

function App() {

  return <div className='wrapper'>
      
      <SidePanel/>
      <Header/>

      <main className="main">
        <Banner/>

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
    </div>
  
}

export default App;
