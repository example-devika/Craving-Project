import React, { useContext, useEffect, useState } from 'react'
import "./Placeorder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { loadStripe } from '@stripe/stripe-js';
import {useNavigate} from 'react-router-dom'

const Placeorder = () => {
  const {getTotalCartAmount,token,url,food_list,cartItems}=useContext(StoreContext)
const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",state:"",country:"",
    phone:""
  })
 

  const onchangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}))
  }
  useEffect(()=>{
console.log(data)
  },[data])
  const placeOrder=async (e)=>{
    e.preventDefault()
    let orderItems=[]
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = { ...item, quantity: cartItems[item._id] };
     
orderItems.push(itemInfo)
      }
    })
    console.log(orderItems)
    let orderData={

      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    
    let response= await axios.post(url+"/api/order/place",orderData,{headers:{token}})
if(response.data.success){
  const {session_url}=response.data;
  window.location.replace(session_url)
  console.log("Stripe session_url:", session_url);

}
else{
  alert("Error")
}

  }
  const navigate= useNavigate()
  useEffect(()=>{
    if(!token){
      navigate("/cart")

    }
    else if(getTotalCartAmount()===0){
      navigate("/cart")

    }
  },[token])
  return (
    <>
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-oder-left">
        <p className="title">Delivery Information</p>
        <div className="multifields">
          <input required type="text" name="firstName" onChange={onchangeHandler} value={data.firstName} placeholder='First name' />
          <input required type="text" name="lastName" onChange={onchangeHandler} value={data.lastName} placeholder='Last name' />

        </div>
        <input required type="email" onChange={onchangeHandler} name="email" value={data.email} placeholder='Email'/>
        <input required type="text"  placeholder='street' onChange={onchangeHandler} name="street" value={data.street}/>
        <div className="multifields">
          <input required type="text" onChange={onchangeHandler} name="city" value={data.city} placeholder='City'/>
          <input required type="text" placeholder='State'  onChange={onchangeHandler} name="state" value={data.state} />

        </div>
        <div className="multifields">
    
          <input required type="text" placeholder='Country' onChange={onchangeHandler} name="country" value={data.country} />

        </div>
        <input required type="number" onChange={onchangeHandler} name="phone" value={data.phone}  placeholder='Phone'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
     <h2>Cart Totals</h2>
     <div>
       <div className="cart-total-details">
         <p>Subtotal</p>
         <p>${getTotalCartAmount()}</p>
       </div>
       <hr />
       <div className="cart-total-details">
         <p>Delivery Fee</p>
         <p>${2}</p>
       </div>
       <hr />
       <div className="cart-total-details">
         <b>Total</b>
         <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
       </div>
     </div>

     <button type="submit">Proceed To Payment</button>
   </div>
      </div>
      
    </form>
    
   </>
  )
}

export default Placeorder
