import '../App.scss'

function SidePanel()
{
    return (
    <div className="side-basket hidden">
        <div className="side-basket__inner">
            <h2 className="side-basket__title">Корзина</h2>
        
            <div className="side-basket__content ">
            <div className="side-basket__product-list">
                <div className="side-basket__product">
                <img className="side-basket__product-preview" src="images/Products/01.png" alt="preview"/>
                <div className="side-basket__product-info">
                    <p className="side-basket__product-description">Мужские Кроссовки Nike Air Max 270</p>
                    <span className="side-basket__product-price">12 999 грн.</span>
                </div>
                <button className="side-basket__product-delete">
                    <img src="images/delete.svg" alt="del"/>
                </button>
                </div>
                <div className="side-basket__product">
                <img className="side-basket__product-preview" src="images/Products/02.png" alt="preview"/>
                <div className="side-basket__product-info">
                    <p className="side-basket__product-description">Мужские Кроссовки Nike Air Max 270</p>
                    <span className="side-basket__product-price">1 999 грн.</span>
                </div>
                <button className="side-basket__product-delete">
                    <img src="images/delete.svg" alt="del"/>
                </button>
                </div>
            </div>
            <div className="side-basket__total">
                <p className="side-basket__result-title">Итого:</p>
                <div className="side-basket__result-line"></div>
                <b className="side-basket__result-num">12 999 грн.</b>
            </div>
            <div className="side-basket__tax">
                <p className="side-basket__result-title">Налог 5%:</p>
                <div className="side-basket__result-line"></div>
                <b className="side-basket__result-num">1900 грн.</b>
            </div>
            <button className="side-basket__btn">
                <img className="side-basket__btn-img" src="images/arrow-right.svg" alt="back img"/>
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
      </div>
    );
}

export default SidePanel;