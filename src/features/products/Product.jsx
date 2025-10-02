import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../products/productSlice';

import { addToCart } from '../cart/cartSlice';
import './product.css'

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector(state => state.products);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products.length, dispatch]);

  const product = products.find(p => p.id === parseInt(id));
  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  const handleBuyNow = () => {
    dispatch(addToCart(product));
    if (isLoggedIn) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };
  return (
    <div className='product_details home'>
      <div className='product_details_img'>
        <img src={product.image} alt={product.title} />
      </div>
      <div className='product_details_right'>
        <h2>{product.title}</h2>
        <p>Description: {product.description}</p>
        <p className='product_rating'>Rating: {product.rating?.rate}</p>
        <div className='main_buttons'>
          <button className='add_cart' onClick={handleAddToCart} >
            Add to Cart
          </button>
          <button className='buy_now' onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product;