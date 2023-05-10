import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Success from './pages/Success';
import './Style.css'
import "animate.css";

const App = () => {
  return (
    <div className=" container mx-auto bg-primary">
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/detail/:id" element={<ProductDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App
App