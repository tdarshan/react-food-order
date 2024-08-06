import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../context/CardContext"
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../context/UserProgressContext";
import Error from './Error'

import useHttp from "../hooks/useHttp";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

const Checkout = () => {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { 
        data, 
        isLoading: isSending, 
        error, 
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce(
        (totalAmount, item) => totalAmount + item.quantity * item.price, 0
    );

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish () {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }


    async function handleSubmit(e) {
        e.preventDefault();

        const fd = new FormData(e.target)
        const customerData = Object.fromEntries(fd.entries())
        // console.log(data);

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
    }


    let actions = (
        <>
            <Button
                type="botton"
                textOnly
                onClick={handleClose}>
                Close
            </Button>
            <Button> Submit Order </Button>
        </>
    );

    if(isSending) {
        actions = <span>Sending order data...</span>
    }

    if(data && !error) {
        return (
            <Modal 
                open={userProgressCtx.progress === 'checkout'} 
                onClose={handleFinish}
            >
                <h2>Success</h2>
                <p>Order placed successfully!</p>
                <p>We will get back to you.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
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

                {error && <Error message="Please try again" title="Failed to place the order!" />}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>

        </Modal>
    )
}

export default Checkout