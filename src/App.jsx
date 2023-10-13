import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/login'
import Dashboard from './pages/dashboard/dashboard'
import Layout from './common/layout/layout'
import ProductDetails from './pages/product-details/product-details'
import ProductByCategory from './pages/category/productsByCategory'
import ProtectedRoutes from './protected-routes'
import CheckOut from './pages/checkout/CheckOut'
import Cart from './pages/cart/Cart'

const App = () => {
  const isLoggedIn = () => {
    if (sessionStorage.getItem("token")) {
      return true
    } else {
      return false
    }
  }
  
  return (
    <>
    <Routes>
      <Route element={<Layout/>}>
        <Route
          path="/"
          element={
              <Dashboard />
          }
        />
        <Route
          path="/single-product/:id"
          element={
            <ProductDetails />
          }
        />
        <Route
          path=":category"
          element={
              <ProductByCategory />
          }
        />
                <Route
          path='/cart'
          element={
            <ProtectedRoutes isLoggedIn={isLoggedIn()}>
            <Cart/>
            </ProtectedRoutes>
          } />
        <Route
          path='/checkout'
          element={
            <ProtectedRoutes isLoggedIn={isLoggedIn()}>
            <CheckOut/>
            </ProtectedRoutes>
          } />
      </Route>
      <Route path="/login" element={<Login/>} />
      
      <Route
        path="*"
        element={
          <div className="h-[100svh] flex items-center justify-center">
            404: Page not found
          </div>
        }
      />
    </Routes>
      
    </>
  );
}

export default App