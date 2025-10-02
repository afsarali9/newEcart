import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import Home from './pages/Home'
import Cart from './pages/Cart'
import Login from './pages/Login'
import AppLayout from './components/AppLayout'
import Product from './features/products/Product'
import './App.css'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'product/:id',
          element: <Product />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ]
    }
  ])
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
