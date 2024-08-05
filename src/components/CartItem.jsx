import { currencyFormatter } from "../utils/formatting"

const CartItem = ({ item, onIncrease, onDecrease }) => {
    return (
        <li className="cart-item">
            <p>
                {item.name} - {item.quantity} * {currencyFormatter.format(item.price)}
            </p>

            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>QTY</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    )
}

export default CartItem