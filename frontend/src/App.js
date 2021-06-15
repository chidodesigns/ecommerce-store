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
          <Route path="/cart/:id?" component={CartPage}></Route>
          <Route path="/" component={Homepage} exact></Route>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
