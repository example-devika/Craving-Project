import React from 'react'
import "./Orders.css"
import { useState } from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import { useEffect } from 'react'
import { assets } from '../../../../frontend/src/assets/assets'
const Orders = ({url}) => {
  
  const [orders,setorders]=useState([])
  const fetchAllOrders=async()=>{
const response=await axios.get(url+"/api/order/list")
if(response.data.success){
  setorders(response.data.data)
  console.log(response.data.data);
  
}
else{
  toast.error("Error")
}
  }
  const statusHandler=async(e,orderId)=>{
const response=await axios.post(url+"/api/order/status",{
  orderId,status:e.target.value
})
if(response.data.success){
  await fetchAllOrders()
}
  }
  useEffect(()=>{
fetchAllOrders()
  },[])
  return (
    <div className='order add'>
     <h3>Order Page</h3>
     <div className="order-list">
      {
        orders.map((order,index)=>{
          return(
          <div className="order-item" key={index}>
            <img src={assets.bag} alt="" />
            <div>
              <p className='order-item-food'>
                {
                  order.items.map((item,index)=>{
                    if(index===order.items.liength-1){
                      return item.name+ " X "+item.quantity
                    }
                    else{
                      return item.name+ " X "+item.quantity+" , "

                    }
                  })
                }
              </p>
              <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
<div className="order-item-address"><p>{order.address.street+" ,"}</p>
<p>{order.address.city+" , "+order.address.state+" , "+order.address.country+" , "+order.address.zipcode+" , "}</p>
</div>
<p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>items:{order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)}> 
              <option value="Food Processing">Food Processing</option>
              <option value="outfordelivery">out for delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>)
        })
      }
     </div>
    </div>
  )
}

export default Orders
