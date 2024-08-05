import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../context/CardContext';
import UserProgressContext from '../context/UserProgressContext';

const Header = () => {

  const cartContext = useContext(CartContext);

  const userProgressCtx = useContext(UserProgressContext);

  const totalItems = cartContext.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);


  function handleShowCart () {
    userProgressCtx.showCart();
  }

  return (
    <header id='main-header'>
        <div id='title'>
            <img src={logoImg} alt='Order App'  />

            <h1></h1>
        </div>

        <nav>
            <Button textOnly onClick={handleShowCart}> 
              Cart ({totalItems}) 
            </Button>
        </nav>
    </header>
  )
}

export default Header