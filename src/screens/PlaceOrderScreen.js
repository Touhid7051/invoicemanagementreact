import React,{useState,useEffect} from 'react'
import { Button,Row,Col,ListGroup,Image,Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'


function PlaceOrderScreen({ history }) {
    
    const orderCreate = useSelector(state=>state.orderCreate)
    const { order, error ,success} = orderCreate
    
    const dispatch = useDispatch()
    
    const cart = useSelector(state =>state.cart)
    
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    cart.shippingPrice = cart.shippingAddress.city === ('Dhaka' || 'dhaka') ? 50 : 120
    cart.taxPrice = Number((0.015) * cart.itemsPrice)
    
    cart.totalPrice=Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
    
    if(!cart.paymentMethod){
        history.push('/payment')
    }
    
    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, history])
    
    const placeOrder = () =>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,
            
        }))
    }
    
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            
                            <p>
                                <strong>Shipping to: {cart.shippingAddress.address}, {cart.shippingAddress.city}</strong>
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country},
                                {'  '}
                                Phone: {cart.shippingAddress.phone}
                            </p>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <h2>Payment Method</h2>                            
                            <p>
                                <strong>Payment: </strong>
                                {cart.paymentMethod}
                               
                            </p>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <h2>Order Items</h2>                            
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Your cart is empty
                             </Message> : (
                                 <ListGroup variant='flush'>
                                     {cart.cartItems.map((item, index)=>(
                                         <ListGroup.Item key={index}>
                                             <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                
                                                <Col md={4}>
                                                    {item.qty} X ৳{item.price} = ৳{(item.qty * item.price)}
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
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                               <h2>Order Summary</h2>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                               <Row>
                                   <Col>Item:</Col>
                                   <Col>৳{cart.itemsPrice}</Col>
                               </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                               <Row>
                                   <Col>Shipping Charge:</Col>
                                   <Col>৳{cart.shippingPrice}</Col>
                               </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                               <Row>
                                   <Col>VAT 1.5%:</Col>
                                   <Col>৳{cart.taxPrice}</Col>
                               </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                               <Row>
                                   <Col>Total:</Col>
                                   <Col>৳{cart.totalPrice}</Col>
                               </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                               <Button
                                   type='button'
                                   className='btn-black'
                                   disabled={cart.cartItems === 0}
                                   onClick={placeOrder}
                               >
                                    Place Order
                               </Button>
                            </ListGroup.Item>
                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
