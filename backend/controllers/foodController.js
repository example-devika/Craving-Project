import foodModel from "../models/foodModel.js";
import fs from "fs"

// add food item
const addFood=async (req,res)=>{
    let image_filename=`${req.file.filename}`;
    const food=new foodModel({
name:req.body.name,
description:req.body.description,
price:req.body.price,
category:req.body.category,
image:image_filename
    })
    
    try {
        await food.save()
        res.json({success:true,message:"food added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}
// all food list
const listFood=async (req,res)=>{
    try {
        const foods=await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,messge:"Error"})
        
    }
}
//remove food item
const removeFood=async(req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id)
        console.log(food)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"food is removed"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,messge:"Error"})
    }
}

export {addFood,listFood,removeFood}