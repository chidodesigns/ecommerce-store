import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row , Col} from 'react-bootstrap';
import ProductList from '../components/products/ProductsList'
import {Link} from 'react-router-dom'
import Message from '../components/utilities/Message'
import Loader from '../components/utilities/Loader'
import Meta from '../components/utilities/Meta'
//  State Management
import {listProducts} from '../actions/productActions'
//  Pagination
import Paginate from '../components/ui/Paginate'
import ProductCarousel from '../components/ui/ProductCarousel';

const Homepage = ({match}) => {

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const { loading, error, products, page, pages } = productList
 
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

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
        <Meta/>
        {!keyword ? <ProductCarousel/> : <Link to="/" className="btn btn-light">Go Back</Link>}
          <h1>Latest Products</h1>   
         <Row>
              {products.map(product => (
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <ProductList product={product}/>
                  </Col>
              ))}
         </Row>
         <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}></Paginate>
        </>
    )   
}

export default Homepage
