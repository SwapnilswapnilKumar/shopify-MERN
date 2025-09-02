import React from 'react';
import { useState} from 'react';
import './AddProduct.css';
import upload_area from '../Assets/upload_area.svg';
import './AddProduct.css';


const AddProduct = ()=>{
    const[image,setImage]=useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",
        description:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    });


    

    const changeHandler = (e)=>{
        setProductDetails({ ...productDetails, [e.target.name]:e.target.value });
    }


    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }

    const Add_product = async ()=>{
        console.log(productDetails);

        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
            method:"POST",
            headers:{
                Accept:'application/json',
            },
            body:formData,

        }).then((resp) => resp.json() )
            .then((data) => {responseData = data});

        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);

            await fetch('http://localhost:4000/addproduct',{
                method:"POST",
                headers:{
                    Accept:'application/json',
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json())
            .then((data)=>{
                data.success ? alert("Product Added") : alert("Uploading failed")
            })
        }
    }







    return (
        <div className="addProduct">
            <div className='addproduct-itemfield'>
                <p>Product title</p>
                <input type="text" name="name" placeholder="Type here" value={productDetails.name} onChange={changeHandler} />
            </div>
            <div className='addproduct-itemfield'>
                <p>Product description</p>
                <input type="text" name="description" placeholder='Type here' value={productDetails.description} onChange={changeHandler} />
            </div>
            <div className='addproduct-price'>
            <div className='addproduct-itemfield'>
                <p>Price</p>
                <input type="number" name="old_price" placeholder="Type here" value={productDetails.old_price} onChange={changeHandler} />
            </div>
            <div className='addproduct-itemfield'>
                <p>Offer Price</p>
                <input type="number" name="new_price" placeholder='Type here' value={productDetails.new_price} onChange={changeHandler} />
            </div>

            </div>
            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select name="category" className='add-product-selector' value={productDetails.category} onChange={changeHandler}>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>

                </select>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product image</p>
                <label htmlFor="file-input">
                    <img className="addproduct-thumbnail-img"  src={ !image ? upload_area : URL.createObjectURL(image)} alt="" />
                </label>
                <input type="file" name="image" id='file-input' accept="image/*" hidden onChange={imageHandler} />
            </div>
            <button onClick={()=>{Add_product()}}  className='addproduct-btn' >ADD</button>



        </div>
    )



}

export default  AddProduct;
