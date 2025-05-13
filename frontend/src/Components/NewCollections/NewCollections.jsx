import React, { useState,useEffect } from 'react'
import './NewCollections.css';
// import new_collections from '../Assets/new_collections';
import Item from '../Items/Item.jsx';


const NewCollections = ({ refProp}) => {

  const [new_collection,setNewCollecction] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollections')
    .then((response)=> response.json())
    .then((data)=>{setNewCollecction(data.slice(-8))});

  },[]);

  return (
    <div className='new-collections' ref={refProp}>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {
                new_collection.map((item,index)=>{
                    return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />

                })
            }
        </div>
      
    </div>
  )
}

export default NewCollections
