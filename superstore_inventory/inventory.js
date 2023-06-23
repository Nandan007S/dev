const express = require('express');
const router = express.Router();
const inventory = require('./inventory.json');

router.get('/',(req,res)=>{
    res.json(inventory);
});

router.get('/:id',(req,res)=>{
    const {id} = req.params;
    res.json(inventory.filter((ele)=>ele.id === parseInt(id)));
})

router.post('/',(req,res)=>{
    const body = req.body;
    inventory.push(body);
    res.json({ message: 'new item has been added to inventory'});
})

router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const body = req.body;
    inventory.forEach((item,index)=>{
        if(inventory.id === parseInt(id)){
            console.log('to implement')
        }
    });
    res.json({ message: `item with id ${id} updated`});
})

router.delete('/:id',(res,req)=>{
    const {id} = params.id;
    inventory.forEach((ele,index)=>{
        if(ele.id === parseInt(id)){
            inventory.splice(index);
        }
    });
    res.json({message: `item with id ${id} removed`});
})

module.exports = router;