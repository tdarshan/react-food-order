import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../context/CardContext"
import { currencyFormatter } from "../utils/formatting"
import Button from "./UI/Button"
import UserProgressContext from "../context/UserProgressContext"
import CartItem from "./CartItem"

const Cart = () => {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalAmount, item) => totalAmount + item.quantity * item.price, 0);

    function handleCloseCart () {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout () {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal 
            className="cart" 
            open={userProgressCtx.progress === 'cart'} 
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
        >
            <h2>Your cart</h2>

            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem 
                        key={item.id} 
                        item={item} 
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>

            <p className="cart-total">
                {currencyFormatter.format(cartTotal)}

            </p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                { cartCtx.items.length > 0 && 
                    <Button onClick={handleGoToCheckout}>Go to checkout!</Button>
                }
            </p>
        </Modal>
    )
}

export default Cart