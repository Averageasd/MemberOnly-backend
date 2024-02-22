const router = require('express').Router();
const User = require('../model/User');

router.post('/member/:id', async (req, res, next) => {
    const update = {member: false};
    if (req.body.answer.toLowerCase() === "argentina") {
        update.member = true;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, update, {
            new: true
        });
        res.status(200).json({user: updatedUser, answerGiven: true});
    } else {
        res.status(200).json({answerGiven: false});
    }


})

module.exports = router;