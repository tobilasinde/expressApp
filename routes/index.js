var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('user', { title: 'Express' })
})

module.exports = router

//create - post
//read - get
//update - put/patch
//delete - delete
