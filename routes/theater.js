var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('theater/view-theater', { theater: false });
});


router.get('/screens', (req, res) => {
    res.render('theater/screens')

});

router.get('/Add-screen', (req, res) => {
    res.render('theater/Add-screen')

});

router.get('/view-schedule', (req, res) => {
    res.render('theater/view-schedule')

});

router.get('/add-show', (req, res) => {
    res.render('theater/add-show')

})






module.exports = router;
