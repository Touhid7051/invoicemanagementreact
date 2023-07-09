import React,{useState,useEffect} from 'react'
import { Form,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingScreen({history}) {
    
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    
    const dispatch = useDispatch()
    
    const [address, setAddress] = useState(shippingAddress.address)
    const [phone, setPhone] = useState(shippingAddress.phone)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({ address,phone,city,postalCode,country }))
        history.push('/payment')
    }
    
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping Information</h1>
            <Form onSubmit={submitHandler}>
            
            <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label> 
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        value={address ? address : ''}
                        onChange={(e)=> setAddress(e.target.value)}>                    
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='phone'>
                    <Form.Label>Phone Number</Form.Label> 
                    <Form.Control
                        required
                        type='number'
                        placeholder='Enter Phone Number'
                        value={phone ? phone : ''}
                        onChange={(e)=> setPhone(e.target.value)}>                    
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label> 
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter City'
                        value={city ? city : ''}
                        onChange={(e)=> setCity(e.target.value)}>                    
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='postalCode'>
                    <Form.Label>Post Code</Form.Label> 
                    <Form.Control
                        required
                        type='number'
                        placeholder='Enter Post Code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e)=> setPostalCode(e.target.value)}>                    
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label> 
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Country'
                        value={country ? country : ''}
                        onChange={(e)=> setCountry(e.target.value)}>                    
                    </Form.Control>
                </Form.Group>
                
                <Button type='submit' variant='primary'>
                    Coninue
                </Button>
            
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
