const router = require('express').Router();

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            throw new Error(err);
        } else {
            console.log(req.user);
            res.status(200).json({user: req.user});
        }
    })
})

module.exports = router;