const router = require('express').Router();
const Message = require('../model/Message');
const passport = require("passport");

router.get('/', async (req, res, next) => {
    res.status(200).json('yo');
})
router.post('/message/create', async (req, res, next) => {
    try {
        const message = new Message({
            title: req.body.title,
            message: req.body.message,
            author: req.user.id,
            date: new Date(),
        })
        await message.save();
        res.status(200).json({msg: 'new message crate', message: message})

    } catch (e) {
        throw new Error(e);
    }
});

router.post('/message/delete/:id', async (req, res, next) => {
    try {
        console.log(req.params.id);
        console.log('delete message');
        await Message.findByIdAndDelete(req.params.id).exec();
        console.log('success');
        res.status(200).json({msg: 'message deleted'})

    } catch (e) {
        console.log('in delete here ', e);
        throw new Error(e);
    }
});

router.get('/message/get', async (req, res, next) => {
    try {
        const messages = await Message.find({}).sort({'date': -1}).populate('author').exec();
        res.status(200).json({status: 200, messages: messages});
    } catch (e) {
        throw new Error(e);
    }
})

module.exports = router;