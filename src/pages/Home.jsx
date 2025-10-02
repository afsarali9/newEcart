import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../features/products/productSlice';
import Filter from '../components/Filter';
import ProductList from '../features/products/ProductList';
import './home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { query } = useSelector((state) => state.search);

  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className='home'>
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <div className='products_outer'>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductList key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
