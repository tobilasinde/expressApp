var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function async(req, res, next) {
	const users = [
		{ id: 1, name: 'Alice' },
		{ id: 2, name: 'Bob' },
		{ id: 3, name: 'Charlie' },
		{ id: 4, name: 'David' },
		{ id: 5, name: 'Eve' },
		{ id: 6, name: 'Frank' },
	] // await get from facebook.com
	res.send(users)
})

module.exports = router
