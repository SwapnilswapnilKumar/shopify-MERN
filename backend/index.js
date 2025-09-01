const port = 4000;
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const Product = require('./Schema/ProductSchema');
const Users = require('./Schema/UsersSchema');

app.use(express.json());
app.use(cors());  
const userName = process.env.USERNAME;
const userPassword = process.env.USERPASSWORD;

console.log(process.env.USERNAME);

//database connection with mongodb atlas
// mongoose.connect(`mongodb+srv://swapnilkumartailor:${userPassword}@cluster0.hls6pnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
mongoose.connect(`mongodb+srv://swapnilkumartailor:${userPassword}@cluster0.hls6pnz.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0`);
console.log("connected to mongodb");

app.get('/',(req,res)=>{
    return res.send("this is slash /");
})


const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage});

//creatigng Upload Endpoint 

app.use('/images',express.static('upload/images'));

app.post('/upload',upload.single("product"),(req,res)=>{
  
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
});  //"product" is fieldname

app.post('/addproduct',async (req,res)=>{

    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }else{
        id = 1;
    }

    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    
    });
    console.log(product);

    await product.save();

    console.log("saved");

    res.json({
        success:true,
        name:req.body.name
    })
})

//creating api for deleting products

app.post('/removeproduct',async (req,res)=>{

    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");

    res.json({
        success:1,
        name:req.body.name
    })

});

//creating api for getting all products
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("ALL products fetched ");

    res.send(products);
});

//creating endpoint for registering the user

app.post('/signup',async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"Existing user found with same email address"})

    }
    let cart = {};
    for(let i=0; i<300; i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    });

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true, token})

    
});

// creating Endpoint for user login
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        // const passCompare = req.body.password === user.password;
        const passCompare = user.comparePassword(req.body.password);
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }

            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true, token})
        }else{
        res.json({success:false,error:"wrong password or email"});
    }
    }else{
        res.json({success:false,error:"User Does not exist"});
    }

})


app.get('/newcollections', async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);

    console.log("newCollection fetched");
    res.send(newcollection);
})

//creating endpoint for popular in women section

app.get('/popularinwomen', async (req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);


});

//creating middleware to fetch user

    const fetchUser = async (req,res,next)=>{
        const token = req.header('auth-token');
        if(!token){
            res.status(401).send({errors:"Please authenticate using valid token"})
        }else{
            try{
                const data = jwt.verify(token,'secret_ecom');
                req.user = data.user;
                next();
            }catch(err){
                res.status(401).send({errors:"please authenticate using a valid token"})
            }
        }
    }

app.post('/addtocart',fetchUser,async (req,res)=>{
    // console.log("this si addtocart in app.post");
    // console.log(req.body,req.user);
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
});

// creating endpoint to remove cartData

app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0){
         userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
});

//creating endpoint  to get cartdata
app.post('/getcart',fetchUser,async (req,res)=>{

    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error){
        console.log("surver is running on port : ",port);
    }
    else{
        console.log("error in running server: ",error);
    }
})