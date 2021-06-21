import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
//  Pages
import Homepage from './pages/Homepage'
import SingleProduct from './pages/SingleProduct'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage'
import OrderListPage from './pages/OrderListPage'
import UserListPage from './pages/UserListPage'
import UserEditPage from './pages/UserEditPage'
import ProductListPage from './pages/ProductListPage'
import ProductEditPage from './pages/ProductEditPage'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Route path="/login" component={LoginPage}></Route> 
          <Route path="/register" component={RegisterPage}></Route> 
          <Route path="/profile" component={ProfilePage}></Route> 
          <Route path="/product/:id" component={SingleProduct}></Route>
          <Route path="/shipping" component={ShippingPage}></Route> 
          <Route path="/payment" component={PaymentPage}></Route> 
          <Route path="/placeorder" component={PlaceOrderPage}></Route> 
          <Route path="/order/:id" component={OrderPage}></Route> 
          <Route path="/cart/:id?" component={CartPage}></Route>
          <Route path="/admin/userlist" component={UserListPage}></Route>
          <Route path="/admin/productlist" component={ProductListPage}></Route>
          <Route path="/admin/orderlist" component={OrderListPage}></Route>
          <Route path="/admin/product/:id/edit" component={ProductEditPage}></Route>
          <Route path="/admin/user/:id/edit" component={UserEditPage}></Route>
          <Route path="/search/:keyword" component={Homepage}></Route>
          <Route path="/" component={Homepage} exact></Route>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
