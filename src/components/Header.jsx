import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../features/cart/cartSlice";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setSearchQuery } from "../features/search/searchSlice";
import { logout } from "../features/auth/authSlice";
import Logo from '../assets/images/logo_blue.svg'
import { CiLogin, CiShoppingCart, CiLogout } from "react-icons/ci";
import { HiMagnifyingGlass } from "react-icons/hi2";
import './header.css'

const Header = () => {
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);
  const [inputValue, setInputValue] = useState(query);

  const location = useLocation();
  const navigate = useNavigate();
  const hiddenHeaderPaths = ["/login", "/cart", "/product"];
  const isHiddenPage = hiddenHeaderPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue, dispatch]);

  return (
    <>
      <div className="header">
        <div className='header_content'>
          <Link to='/' className='main_logo'>
            <img src={Logo} alt='logo' />
          </Link>
          <div className='header_right'>
            <div className='search_box'>
              {
                !isHiddenPage && (
                  <>
                    <input type='text' placeholder='Search item' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <HiMagnifyingGlass className='search_icon' />
                  </>
                )
              }

            </div>
            <div className='cart_login'>
              <Link className='cart_outer' to='/cart'><span>{cartCount > 0 ? cartCount : 0}</span><CiShoppingCart /> Cart</Link>
              {
                isLoggedIn ? <button className="login_outer" onClick={handleLogout}><CiLogout /> Logout</button> :
                  <Link className='login_outer' to='/login'><CiLogin /> Login</Link>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header