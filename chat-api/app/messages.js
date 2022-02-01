const express = require('express');
const db = require('../fileDb');
const router = express.Router();

router.get('/',(req,res) => {
    const messages = db.getMessages();
    return  res.send(messages);
});

router.get('/:dateTime',(req,res) => {

});

router.post('/',async (req,res, next) => {
    try {
        if (!req.body.message || !req.body.author) {
            return res.status(400).send({message: 'Author and message must be present in the request'});
        }

        const item = {
            message: req.body.message,
            author: req.body.author
        };
        await db.addMessage(item);
        return res.send(item);
    } catch (e) {
        next(e);
    }
});

module.exports = router;

