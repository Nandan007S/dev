const mongoose = require('mongoose');
const Product = require('./models/product');
const bcrypt = require('bcrypt');
const User = require('./models/user');
mongoose.connect('mongodb://127.0.0.1:27017/superstore')
.then(()=>{
    console.log('mongo connection open');
})
.catch(()=>{
    console.log('mongo connection error');
})

const admins = [
    {
        username: 'Admin',
        password: '$2b$12$/w5sTtv.x/e2Per8YCUVt.yaFiK12nBawYFp3BzwyzyyRKd8zAWvC',
        role: 'Admin'
    }
]
const inventory = [
    {
        name: 'Eggplant',
        price: 20,
        category: 'vegetable'
    },
    {
        name: 'Orange',
        price: 50,
        category: 'fruit'
    },
    {
        name: 'strawberry',
        price: 100,
        category: 'fruit'
    },
    {
        name: 'cheese',
        price: 200,
        category: 'dairy'
    },
    {
        name: 'yoghurt',
        price: 150,
        category: 'dairy'
    }
]
User.insertMany(admins);
Product.insertMany(inventory)
.then(res=>{
    console.log(res);
})
.catch(e=>{
    console.log(e);
})