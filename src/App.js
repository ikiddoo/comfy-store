import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
// destructure all components from src/pages/...
import { Home, Products, SingleProduct, About, Cart, Error, Checkout, PrivateRoute } from './pages';
import AuthWrapper from './pages/AuthWrapper';

function App() {
  return (
    // refactor react router to react router 6.
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          {/* the rest of the routes... */}
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='cart' element={<Cart />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:id' element={<SingleProduct />} />
          {/* restricting access to checkout */}
          <Route path='checkout' element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  )
}

export default App
