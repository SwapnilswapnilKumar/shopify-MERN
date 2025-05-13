import React, {useContext,useState,useEffect} from 'react'
import './RelatedProduct.css'
// import data_product from '../Assets/data'
import Item from '../items/item'
import { ShopContext } from '../../Context/ShopContext'

const RelatedProduct = (props) => {
  // const {product} = props; 
    const {all_product} = useContext(ShopContext);
    let [related_items,setRelated_items] = useState([]);
    

useEffect(()=>{
    const filteredItems = all_product.filter((item)=>{
        return item.category===props.product.category && item.id !== props.product.id 

    }).slice(0,4);

    console.log(props.product.category);
    setRelated_items(filteredItems);
    console.log(related_items.length)
},[props.product.category,props.product.id]);



  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {
            related_items.map((item,index)=>(
                <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />

            ))
          
        }
      </div>
    </div>
  )
}

export default RelatedProduct ;
