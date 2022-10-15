import Card from "../components/Card";
import AppContext from "../context";
import { useContext } from "react";

function Favorites() {
  const { basket, favorites } = useContext(AppContext);

    return (
      <main className="main">

        <section className="products">
          <div className="container">
            <div className="products__inner">
              <h1 className="products__title">
                Мои закладки
              </h1>
              <div className="products__items">
                {
                  favorites.map((card) => {
                    card.product.isFavorite = true;
                    card.product.inBasket = basket.some(obj => obj.product_Id == card.product_Id);

                    return (
                      <Card
                        cardInfo={card.product}
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