import React, {useState} from 'react';
import {Form, Button, Row} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import FormContainer from '../components/ui/FormContainer';
import {saveShippingAddress} from '../actions/cartActions'
import CheckoutSteps from '../components/layout/CheckoutSteps'

const ShippingPage = ({history}) => {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch()

  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(saveShippingAddress({address, city, postalCode, country}))
      history.push('/payment')
  }

  return (
    <FormContainer>
    <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Row className="py-2">
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>
        <Row className="py-2">
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>
        <Row className="py-2">
          <Form.Group controlId="postalCode">
            <Form.Label>Postcode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Postcode"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>
        <Row className="py-2">
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Row>
        <Button className="my-2" type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
