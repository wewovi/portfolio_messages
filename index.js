const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const messageModel = require('./models/messages');

app.use(bodyParser.json());

app.post('/portfolioMessage', async(req, res)=>{
        const Message =await messageModel.create({
            name: req.body.name,
            body: req.body.body
        });
        try {
        const sendMessage = await Message.save();
        res.json({
            data:sendMessage,
            message: 'message successfully sent'
        });
        
    } catch (error) {
        res.json({
            message:error
        })
    }
    
});

app.get('/portfolioMessage', async(req, res)=>{
    try {
       const getAllMessages = await messageModel.find();
       res.json({
           data:getAllMessages,
           message:"operation sucessful"
       })
    } catch (err) {
        res.json({
            message:err
        });
        
    }
});
app.delete('/portfolioMessage/:messageId', async(req, res)=>{
    try{
   const deleteMessage = await messageModel.findOneAndDelete({_id:req.params.messageId});
   res.json({
       data: deleteMessage,
       message:"message successfully deleted"
   })
    }
    catch(err){
res.json({
    message:err
});
    }
});
app.get('/',(req,res)=>{
    res.send('we are in the root folder');
})


mongoose.connect(process.env.MONGO_URL,()=>{
    console.log('connected successfully');
});


app.listen(process.env.PORT_NUM || 2000);