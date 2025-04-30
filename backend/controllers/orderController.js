import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import dotenv from 'dotenv';



import Stripe from 'stripe';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

//placing userorder for frontend
const placeOrder=async (req,res)=>{
    const frontend_url="http://localhost:5174"
    try{
      const itemsWithQty = req.body.items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity ||1
      }));
const newOrder=new orderModel({
    userId:req.body.userId,
items: itemsWithQty,
amount:req.body.amount,
address:req.body.address
})
    
await newOrder.save()
await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

const line_items = req.body.items.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name || "Unnamed Product",
        },
        unit_amount: Math.round(item.price * 100), // 100 paise = 1 INR
      },
      quantity: item.quantity || 1, // default to 1 if missing
    };
  });

line_items.push({
    price_data: {
      currency: "inr",
      product_data: {
        name: "Delivery Charges"
      },
      unit_amount:  100 * 80
    },
    quantity: 1,
  });

  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items,
    mode: "payment",
    success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
  });
  
 
console.log("🟢 Stripe session created:", session);

res.json({success:true,session_url:session.url})
    }
catch(error){  console.error("Stripe session creation failed:", error.message);
res.json({success:false,message:"Error"})
    
}
}
  const verifyOrder=async (req,res)=>{
  const {orderId,success}=req.body
  try{
    if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true})
      res.json({success:true,message:"Paid"})
    }
    else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false,message:"Not Paid"})

    }
  }
  catch(error){
console.log(error)
      res.json({success:false,message:"Error"})

  }
}
//users order for frontend
  const userOrder=async(req,res)=>{
try {
  const orders=await orderModel.find({userId:req.body.userId})
  res.json({success:true,data:orders})
} catch (error) {
  console.log(error)
  res.json({success:false,message:"Error"})
}
}
//listing orders from admin panel
  const listOrders=async(req,res)=>{
try {
  const orders=await orderModel.find({})
  res.json({success:true,data:orders})
} catch (error) {
  console.log(error)
  res.json({success:false,message:"Error"})

}
}
//aPI FOR UPdating order status
  const updateStatus=async(req,res)=>{
try {
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
  res.json({success:true,message:"status Updated"})
} catch (error) {
  console.log("error");
  res.json({success:false,message:"Error"})
  
  
}
}
export  {placeOrder,listOrders,updateStatus,userOrder,verifyOrder}
