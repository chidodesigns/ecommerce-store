import React from 'react';
import {useState, useEffect} from 'react'
import { Row , Col} from 'react-bootstrap';
import ProductList from '../components/products/ProductsList'
import axios from 'axios';



const Homepage = () => {

    const [products, setProducts] = useState([]); 

    useEffect(() => {
        const fetchProducts = async () => {
            //  destructure data from axios promise
            const {data} = await axios.get('/api/products')
            setProducts(data)
        }
        fetchProducts()
    }, [])

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
