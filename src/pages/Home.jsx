import Card from "../components/Card";
import Banner from "../components/Banner";
import CardLoader from "../components/CardLoader";
import AppContext from "../context";
import { useContext } from "react";

function PrintCard(card, isLoading) {
  if (isLoading)
    return <CardLoader/>;
  else
    return <Card cardInfo={card} key={card.id}/>; 
}

function Home({ searchValue, setSearchValue }) {
  const { basket, products, favorites, isLoading } = useContext(AppContext);

    return (
      <main className="main">
        <Banner />

        <section className="products">
          <div className="container">
            <div className="products__inner">
              <h1 className="products__title">
                {searchValue
                  ? "Поиск по запросу: " + searchValue
                  : "Все кроссовки"}
              </h1>
              <div className="products__search">
                <button className="products__search-btn">
                  <img src="images/search.svg" alt="search" />
                </button>
                { isLoading == false &&
                  <>
                    <input
                      className="products__search-input"
                      type="text"
                      placeholder="Search..."
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                    />
                    {searchValue && (
                      <button
                        className="products__search-delete"
                        onClick={() => setSearchValue("")}
                      >
                        <img src="images/delete.svg" alt="del" />
                      </button>
                    )}
                  </>
                }
              </div>
              <div className="products__items">
                {
                  isLoading ?
                    [...Array(8)].map(card => { return PrintCard(card, isLoading) })
                  : 
                  products
                    .filter((prod) =>
                      prod.name
                        .toLowerCase()
                        .includes(searchValue.toLocaleLowerCase())
                    )
                    .map((card) => {
                      card.isFavorite = favorites.some(obj => obj.product_Id == card.id);
                      card.inBasket = basket.some(obj => obj.product_Id == card.id);;

                      return PrintCard(card, isLoading);
                    })}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
}

export default Home;