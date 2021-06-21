import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row , Col} from 'react-bootstrap';
import ProductList from '../components/products/ProductsList'
import Message from '../components/utilities/Message'
import Loader from '../components/utilities/Loader'
//  State Management
import {listProducts} from '../actions/productActions'

const Homepage = ({match}) => {

    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const { loading, error, products } = productList
 
    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    if (loading) {
        return (
            <section>
                <Loader/>
            </section>
        )
    }

    if (error) {
        return (
            <section>
                <Message variant="danger">{error}</Message>
            </section>
        )
    }

    return (
        <>
          <h1>Latest Products</h1>   
         <Row>
              {products.map(product => (
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <ProductList product={product}/>
                  </Col>
              ))}
         </Row>
           
        </>
    )   
}

export default Homepage
