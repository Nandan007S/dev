const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

mongoose.connect('mongodb://127.0.0.1:27017/superstore')
.then(()=>{
    console.log('mongo connection open');
})
.catch(()=>{
    console.log('mongo connection error');
})

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(cookieParser());
app.use(session({secret:'password'}));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const categories = ['vegetable','fruit','dairy'];
const requireLogin = (req,res,next)=>{
    if(!req.session.user_id){
        res.redirect('/login');
    }
    next();
}
app.get('/register',(req,res)=>{
    res.render('users/register');
})

app.post('/register',async (req,res)=>{
    const {username,password} = req.body;
    const hash = await bcrypt.hash(password,12);
    const user = new User({
        username,  
        password: hash
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/products');
})

app.get('/login',(req,res)=>{
    res.render('users/login');
})

app.post('/login',async (req,res)=>{
    const {username,password,role} = req.body;
    const user = await User.findOne({username});
    const valid = await bcrypt.compare(password,user.password);
    if(valid){
        req.session.user_id = user._id;
        const accessToken = jwt.sign({user:user._id,role:user.role},'sampleSecret',);
        res.cookie('token',accessToken);
        res.redirect('/products');
    }
    else{
        res.redirect('/login');
    }
})

app.post('/logout',(req,res)=>{
    req.session.user_id=null;
    res.redirect('/login');
})

app.get('/products',requireLogin,async (req,res)=>{  
    const token = jwt.verify(req.cookies.token,'sampleSecret');
    const products = await Product.find({});
    res.render('products/index',{products,token});
})

app.get('/products/new',requireLogin,(req,res)=>{
    res.render('products/new',{categories});
})

app.post('/products',requireLogin,async (req,res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/products')
})

app.get('/products/:id',requireLogin,async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/show',{product});
}) 

app.get('/products/:id/edit',requireLogin,async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{product,categories});
})

app.put('/products/:id',requireLogin,async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id',requireLogin,async (req,res)=>{
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000,()=>{
    console.log('App is listening on port 3000');
})