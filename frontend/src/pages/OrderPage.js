import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'
import {Link} from 'react-router-dom';
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/utilities/Message';
import Loader from '../components/utilities/Loader';
import {getOrderDetails, payOrder, deliverOrder} from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_REQUEST_RESET} from '../constants/orderConstants'

const OrderPage = ({match, history}) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const {order, loading, error} = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  //  renamed the loading and success 'state' props to loadingPay successPay
  const {loading:loadingPay, success:successPay} = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  //  renamed the loading and success 'state' props to loadingPay successPay
  const {loading:loadingDeliver, success:successDeliver} = orderDeliver;


  useEffect(() => {

    if(!userInfo){
      history.push('/login')
    }

    const addPaypalScript = async () => {
      const {data: clientId} = await axios.get('/api/third-party/paypal');
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    };

    // if (!order || order._id !== orderId) {
    //   dispatch(getOrderDetails(orderId));
    // }

    if(!order || successPay || successDeliver){
      dispatch({type:ORDER_PAY_RESET})
      dispatch({type:ORDER_DELIVER_REQUEST_RESET})
      dispatch(getOrderDetails(orderId))
    }else if(!order.isPaid){
      if(!window.paypal){
        addPaypalScript()
      }else{
        setSdkReady(true)
      }
    }

  }, [dispatch, order, orderId, successPay,successDeliver]);

  //  paymentResult is coming from Paypal
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    //    Calculate Prices
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                <strong>Shipping Address</strong>
              </h2>
              <p>{order.shippingAddress.address},</p>
              <p>{order.shippingAddress.postalCode},</p>
              <p>{order.shippingAddress.city},</p>
              <p>{order.shippingAddress.country},</p>
              <p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </p>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>
                <strong>Payment Method</strong>
              </h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              <p>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>
                <strong>Order Items</strong>
              </h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader/>}
                  {!sdkReady ? <Loader/> : (
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader/>}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
