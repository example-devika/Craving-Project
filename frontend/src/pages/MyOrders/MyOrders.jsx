import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import "./MyOrders.css"

const MyOrders = () => {
    const [data,setData]=useState([])
    const {url,token}=useContext(StoreContext)
    const fetchOrders=async()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data)
        console.log(response.data.data)
    }
    useEffect(()=>{
        if(token){
            fetchOrders()
        }
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {
                data.map((order,index)=>{
                    console.log(order)
return(
    <div key={index} className="my-orders-order">
        <img src={assets.bag} alt="parcel" />
        <p>
            {order.items

                .map((item) => `${item.name} x ${item.quantity}`)
                .join(', ')}
               
            </p>
            <p>${order.amount}.00</p>
            <p>items:{order.items.length}</p>
            <p><span>&#x25cf;</span><b>{order.status}</b></p>
            <button onClick={fetchOrders}>TrackOrder</button>
    </div>
)
                })
            }
        </div>
      
    </div>
  )
}

export default MyOrders
