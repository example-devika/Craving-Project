import React, { useEffect, useState } from "react";
import "./Add.css";
import axios from "axios"
import { toast } from "react-toastify";
const Add = ({url}) => {
  const [image,setImage]=useState(false)
  const [data,setData]=useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })
  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}))
  }
//   useEffect(()=>{
// console.log(data)
//   },[data])
const onSubmitHandler=async (e)=>{
e.preventDefault()
const formData=new FormData()
formData.append("name",data.name)
formData.append("description",data.description)
formData.append("price",Number(data.price))
formData.append("category",data.category)
formData.append("image",image)
const response=await axios.post(`${url}/api/food/add`,formData)
if(response.data.success){
setData(
  {
    name:"",
    description:"",
    price:"",
    category:"Salad"
  }
)
setImage(false)
toast.success(response.data.message)

}
else{
  toast.error(response.data.message)
}


}
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
      <div className="add-img-upload flex-col">
        <p>Upload Image</p>
        <label htmlFor="image">
          <img src={image?URL.createObjectURL(image):"/upload_area.png"} alt="upload" />
        </label>
        <input type="file" id="image" onChange={(e)=>{setImage(e.target.files[0])}} hidden required />
      </div>
      <div className="add-product-name flex-col">
        <p>Product name</p>
        <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Type here" required />
      </div>
      <div className="add-product-description  flex-col">
        <p>Product description</p>
        <textarea
          name="description"
          rows="6"
          placeholder="Write content here"
          value={data.description}
          onChange={onChangeHandler}
          required
        ></textarea>
      </div>
      <div className="add-category-price">
        <div className="add-category flex-col">
          <p>Product category</p>
          <select onChange={onChangeHandler} value={data.category} name="category" required>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Desserts">Desserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>

          </select>
        </div>
        <div className="add-price flex-col">
          <p>Product price</p>
          <input type="Number" required onChange={onChangeHandler} value={data.price} name="price" placeholder="$20"/>
        </div>
    </div>
      <button type="submit" className="add-btn">Add</button>
      </form>
    </div>
);
};

export default Add;
