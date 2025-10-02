import { Link } from 'react-router-dom';
import './productList.css'

const ProductList = ({ product }) => {
  const { id, image, title, description, rating, category } = product;
  return (
    <Link to={`/product/${id}`} className="product_card">
      <div className='product_img'>
        <img src={image} alt={category} />
      </div>
      <h4>{title}</h4>
      <p>{rating?.rate}</p>
      <p>{description}</p>
    </Link>
  )
}

export default ProductList