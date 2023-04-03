import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']} e2e-data={"cart-items-" + props.name.replaceAll(' ', '-')}>
      <div>
        <h2 e2e-data={"cart-item-name"}>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price} e2e-data={"cart-item-price"}>{price}</span>
          <span className={classes.amount} e2e-data={"cart-item-amount"}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button e2e-data="remove-item" onClick={props.onRemove}>−</button>
        <button e2e-data="add-item" onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
