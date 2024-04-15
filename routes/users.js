var express = require('express')
const { User } = require('../database')
var router = express.Router()

//Create a new user
router.post('/', async function (req, res, next) {
	const {
		name,
		email,
		password,
		username,
		password_hint,
		phone,
		valid_license,
	} = req.body
	const result = await User.create({
		name: name,
		email: email,
		password: password,
		username: username,
		password_hint: password_hint,
		phone: phone,
		valid_license: valid_license,
	})
	res.send(result)
})

//Update a user
router.put('/:id', async function (req, res) {
	const id = req.params.id
	const {
		name,
		email,
		password,
		username,
		password_hint,
		phone,
		valid_license,
	} = req.body
	const result = await User.update(
		{
			name,
			email,
			password,
			username,
			password_hint,
			phone,
			valid_license,
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
	const limit = 5
	const offset = 2 * limit
	//where
	const result = await User.findAndCountAll({ limit: 5, offset })
	res.send(result)
})

module.exports = router
