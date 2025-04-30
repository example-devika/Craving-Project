import mongoose from "mongoose"
export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://deevikareddy94:deevikareddy94@cluster0.kbeko9s.mongodb.net/Cravings').then(()=>console.log("DB connected"))
}