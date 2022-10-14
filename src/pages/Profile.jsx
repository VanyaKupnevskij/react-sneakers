import Card from "../components/Card";

function Profile({
  purchases,
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
                Profile
              </h1>
              <div className="products__items">
                {
                  purchases.map((card) => {
                    card.product.isFavorite = false;
                    card.product.inBasket = false;
                    favorites.forEach((o) => {
                      if (o.product_Id == card.product.id) {
                        card.product.isFavorite = true;
                      }
                    });
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

export default Profile;