const express = require('express');
const db = require('../fileDb');
const router = express.Router();

router.get('/',(req,res) => {
    const date = new Date(req.query.dateTime);
    if (date) {
        if (isNaN(date.getDate())) {
            return res.send({message: "Date is wrong"});
        } else {
            const messageFromDate =  db.getMessageFromDate(date);
            return  res.send(messageFromDate);
        }
    }

    const messages = db.getMessages();
    return  res.send(messages);
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

