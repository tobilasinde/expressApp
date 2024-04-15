const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('expressApp', 'tony', 'P@55w0rd', {
	host: 'localhost',
	dialect: 'postgres',
	logging: false,
})
const User = sequelize.define(
	'User',
	{
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password_hint: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		valid_license: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		// Other model options go here
		// paranoid: true,
	}
)
const Recipe = sequelize.define(
	'Recipe',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		prep_time: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0,
		},
		cook_time: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM('draft', 'published', 'archived'),
			defaultValue: 'draft',
		},
	},
	{
		// Other model options go here
	}
)
User.hasMany(Recipe)
Recipe.belongsTo(User)
sequelize.sync({ alter: true })
const create_user = async (req, res, next) => {
	const user = await User.create({
		password: 'P@55w0rd',
		name: 'Anthony3',
		username: 'tony',
		password_hint: 'password',
		email: 'tobilasinde@yahoo.com',
		phone: '1234567890',
		valid_license: true,
	})
	next()
}
const update_user = async (id) => {
	const user = await User.update(
		{ valid_license: false },
		{ where: { id: id } } //method 1 (condition)
	)
	console.log(user)
}
const update_user2 = async (id) => {
	const user = await User.findByPk(id)
	user.valid_license = false
	await user.save() //method 2
	user.update({ valid_license: false }) //method 3
}
const delete_user = async (id) => {
	const user = await User.destroy({ where: { id: id } })
	console.log(user)
}
const get_all_users = async () => {
	const users = await User.findAll({
		where: { valid_license: false, email: 'tobilasinde@yahoo.com' },
	})
	console.log(users.map((user) => user.toJSON()))
}
const get_one_user_by_id = async (id) => {
	const user = await User.findByPk(id)
	console.log(user.toJSON())
}
const get_one_user = async (email) => {
	const user = await User.findOne({
		where: { email: email },
	})
	// console.log(user)
	console.log(user?.toJSON())
}
// create_user()
// update_user([3, 4])
// delete_user(1)
// get_all_users()
// get_one_user_by_id(2)
// get_one_user('anthony@yahoo.com')

//crud

//sequelize functions
//.create
//.update
//.destroy
//.findAll
//.findByPk
//.findOne
//.restore

const check_authorization = async (req, res, next) => {
	const logged_in = true
	if (logged_in) {
		next()
	} else {
		res.send('You are not authorized')
	}
}
module.exports = { User, Recipe, create_user, check_authorization }
