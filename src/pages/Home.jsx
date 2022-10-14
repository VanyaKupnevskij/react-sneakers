import Card from "../components/Card";
import Banner from "../components/Banner";

function Home({ searchValue,
    setSearchValue,
    products,
    favorites,
    basket,
    onClickBuy,
    onClickFavorite }) {
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
                    card.isFavorite = false;
                    card.inBasket = false;
                    favorites.forEach((o) => {
                      if (o.product_Id == card.id) {
                        card.isFavorite = true;
                      }
                    });
                    basket.forEach((o) => {
                      if (o.product_Id == card.id) {
                        card.inBasket = true;
                      }
                    });
                    return (
                      <Card
                        cardInfo={card}
                        handlerFavorite={onClickFavorite}
                        handlerBuy={onClickBuy}
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