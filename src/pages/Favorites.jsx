import Card from "../components/Card";

function Favorites({
    products,
    favorites,
    basket,
    onClickBuy,
    onClickFavorite }) {
    return (
      <main className="main">

        <section className="products">
          <div className="container">
            <div className="products__inner">
              <h1 className="products__title">
                Favorites
              </h1>
              <div className="products__items">
                {
                  favorites.map((card) => {
                    card.product.isFavorite = true;
                    card.product.inBasket = false;
                    basket.forEach((o) => {
                      if (o.product_Id == card.product.id) {
                        card.product.inBasket = true;
                      }
                    });
                    return (
                      <Card
                        cardInfo={card.product}
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

export default Favorites;