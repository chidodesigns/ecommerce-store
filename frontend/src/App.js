import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
//  Pages
import Homepage from './pages/Homepage'
import SingleProduct from './pages/SingleProduct'
import CartPage from './pages/CartPage'
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Route path="/" component={Homepage} exact></Route>
          <Route path="/product/:id" component={SingleProduct}></Route>
          <Route path="/cart/:id?" component={CartPage}></Route>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
