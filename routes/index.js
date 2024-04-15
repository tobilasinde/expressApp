var express = require('express')
const userRouter = require('./users')
const recipeRouter = require('./recipe')
var router = express.Router()

/* GET home page. */
router.use('/users', userRouter)
router.use('/recipes', recipeRouter)

module.exports = router

//create - post
//read - get
//update - put/patch
//delete - delete
