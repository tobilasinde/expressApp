var express = require('express')
const { User } = require('../database')
var router = express.Router()

//Create a new user
router.post('/', async function (req, res) {
	const {
		firstname,
		lastname,
		email,
		password,
		phone,
	} = req.body
	const result = await User.create({
		firstname,
		lastname,
		email,
		password,
		phone
	})
	res.send(result)
})

//Update a user
router.put('/:id', async function (req, res) {
	const id = req.params.id
	const {
		firstname,
		lastname,
		email,
		password,
		phone,
	} = req.body
	const result = await User.update(
		{
			firstname,
			lastname,
			email,
			password,
			phone
		},
		{ where: { id: id } }
	)
	if (result[0] === 0) {
		res.send('User not found')
	} else {
		res.send('User updated successfully')
	}
})

//Delete a user
router.delete('/:id', async function (req, res) {
	const id = req.params.id
	const result = await User.destroy({ where: { id } })
	if (result === 0) {
		res.send('Error deleting user')
	} else {
		res.send('User deleted successfully')
	}
})

//Get all users
router.get('/', async function (req, res) {
	const result = await User.findAndCountAll()
	res.send(result)
})

module.exports = router
