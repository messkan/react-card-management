const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const Card = require('../models/Card');
const User = require('../models/User');

const getAllCards = async (obj) => {
      return await Card.findAll({
          where : obj
      })
}

const getAccount = async (obj) => {
    return await Account.findOne({
        
        where:obj ,
        include:[
            {model: Card}
        ]
        
    });
}

const getCard = async(obj) => {
    return await Card.findOne({
        where: obj
    });
}

router.get('/cards' , async function(req, res) {
    const account = await getAccount({userId: req.userData.user.id});
    console.log(req.userData.user);

    return res.status(200).json(account.cards);
})

router.post('/addCard' , async function(req, res) {
    const account = await getAccount({userId: req.userData.user.id});
    console.log(req.userData.user.id);
    Card.create({
        type: req.body.type,
        num: req.body.num
    }).then((card)=>{
         account.addCard(card);
         res.status(200).json({card: card , message: 'added successfully'});
    })
})

router.put('/updateCard/:id' , async function(req, res) {
    const card = await getCard({id : req.params.id});
    console.log(card);
    card.update({
        type: req.body.type, 
        num: req.body.num
    }).then(
        res.status(201).json({ card : card ,message: 'updated successfuly'})
    );
})

router.delete('/deleteCard/:id' , async function(req, res){
    
        await deleteCard({id: req.params.id});

        return res.status(200).json({message : 'ok'});

})

const deleteCard = async (obj) => {
    return await Card.destroy({
        where : obj
    })
}

module.exports = router;