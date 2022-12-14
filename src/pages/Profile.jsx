import Card from "../components/Card";
import AppContext from "../context";
import { useContext } from "react";

function Profile() {
  const { basket, purchases, favorites } = useContext(AppContext);

  return (
    <main className="main">

      <section className="products">
        <div className="container">
          <div className="products__inner">
            <h1 className="products__title">
              Мои покупки
            </h1>
            <div className="products__items">
              {
                purchases.map((card) => {
                  card.product.isFavorite = favorites.some(obj => obj.product_Id == card.product_Id);
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

export default Profile;