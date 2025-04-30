import React, { useContext} from 'react'
import Fooditem from '../Fooditems/Fooditem'
import { StoreContext } from '../../context/StoreContext'
import "./Fooddisplay.css"

const Fooddisplay = ({category,setCategory}) => {
    const {food_list}=useContext(StoreContext)
  return (
    <div className='food-display' id='food_display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list" >
        {
            food_list.map((item,index)=>{
                if(category==="All"||category===item.category){
                return(
                    <Fooditem key={index} id={item._id} name={item.name} desc={item.description} image={item.image} price={item.price} />
                )
            }
            })
        }
        </div>

      
    </div>
  )
}

export default Fooddisplay

