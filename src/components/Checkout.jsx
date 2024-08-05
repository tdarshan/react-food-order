import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../context/CardContext"
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../context/UserProgressContext";


const Checkout = () => {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce(
        (totalAmount, item) => totalAmount + item.quantity * item.price, 0
    );

    function handleClose () {
        userProgressCtx.hideCheckout();
    }


    async function handleSubmit (e) {
        e.preventDefault();

        const fd = new FormData(e.target) 
        const customerData = Object.fromEntries(fd.entries())
        // console.log(data);

        const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        });

        console.log(response);
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>

            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount : {currencyFormatter.format(cartTotal)} </p>

                <Input label="Name" type="text" id="name" />
                <Input label="Email address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />

                <div className="control-row">
                    <Input label="Postal code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                <p className="modal-actions">
                    <Button type="botton" textOnly onClick={handleClose}> Close </Button>
                    <Button> Submit Order </Button>
                </p>
            </form>

        </Modal>
    )
}

export default Checkout