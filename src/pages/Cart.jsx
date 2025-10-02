import { selectCartCount } from "../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../features/cart/cartSlice";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import './cart.css'
import { Link } from "react-router-dom";

const Cart = () => {
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return <div className="home"><p>Your cart is empty</p></div>;
  }

  return (
    <div className="home">
      <div className="cart">
        <div className="cart_list">
          {items.map((item) => (
            <div key={item.id} className="cart_item">
              <Link to={`/product/${item.id}`} className="cart_img">
                <img src={item.image} alt={item.title} />
              </Link>
              <div className="cart_content">
                <h5><Link to={`/product/${item.id}`}>{item.title}</Link></h5>
                <p className="price">Price: ${item.price}</p>
                <div className="product_quantity">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))}><IoRemoveCircleOutline /></button>
                  <p>{item.quantity}</p>
                  <button onClick={() => dispatch(increaseQuantity(item.id))}><IoAddCircleOutline /></button>
                </div>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cart_total_outer">
          <div className="cart_total">
            <h5>Total Item: {cartCount}</h5>
            <p>Total: ${totalPrice.toFixed(2)}</p>
          </div>

          {isLoggedIn ? (
            <button className="checkout"
              onClick={() => {
                const cartData = items.map(item => ({
                  title: item.title,
                  quantity: item.quantity,
                  price: item.price
                }));

                const totalPrice = items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                );

                cartData.push({ totalPrice: totalPrice.toFixed(2) });

                console.log(cartData);
              }}
            >CHECKOUT TO PAYMENT</button>
          ) : (
            <p>Order Items please <Link to='/login'>Login</Link> or <Link to='/login'>Signup</Link></p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Cart;
