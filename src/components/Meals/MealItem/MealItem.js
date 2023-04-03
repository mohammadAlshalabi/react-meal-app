import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal} e2e-data={"meal-items-" + props.name.replaceAll(' ', '-')}>
      <div>
        <h3 e2e-data="meal-item-name">{props.name}</h3>
        <div className={classes.description} e2e-data="meal-item-description">{props.description}</div>
        <div className={classes.price} e2e-data="meal-item-price">{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
