import Card from "../components/Card";
import Banner from "../components/Banner";
import AppContext from "../context";
import { useContext } from "react";

function Home({ searchValue, setSearchValue }) {
  const { basket, products, favorites } = useContext(AppContext);

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
              </div>
              <div className="products__items">
                {products
                  .filter((prod) =>
                    prod.name
                      .toLowerCase()
                      .includes(searchValue.toLocaleLowerCase())
                  )
                  .map((card) => {
                    card.isFavorite = favorites.some(obj => obj.product_Id == card.id);
                    card.inBasket = basket.some(obj => obj.product_Id == card.id);;

                    return (
                      <Card
                        cardInfo={card}
                        key={card.id}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
}

export default Home;