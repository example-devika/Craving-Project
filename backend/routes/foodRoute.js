import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"


const foodRouter=express.Router()

// image storage engine
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{//cb-callback
        return cb(null,`${Date.now()}${file.originalname}`)  //multer.diskStorage() అనేది file upload చేసే సమయంలో, ఫైల్‌ ను ఎక్కడ save చేయాలి మరియు ఏ పేరుతో save చేయాలి అని చెప్పేందుకు వాడే configuration.
    }
})
const upload=multer({storage:storage})


foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)




export {foodRouter}