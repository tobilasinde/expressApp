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
		firstname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Other model options go here
		paranoid: true,
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
			defaultValue: 0,
		},
		cook_time: {
			type: DataTypes.FLOAT,
			defaultValue: 0,
		},
		yield: {
			type: DataTypes.FLOAT,
			defaultValue: 0,
		},
		category: DataTypes.ENUM('vegan','drinks','dessert','cake','breakfast','lunch','dinner'),
		directions: DataTypes.TEXT,
		ingredients: DataTypes.TEXT,
		status: {
			type: DataTypes.ENUM('draft', 'published', 'archived'),
			defaultValue: 'draft',
		},
	},
	{
		paranoid: true
	}
)
User.hasMany(Recipe)
Recipe.belongsTo(User)
sequelize.sync({ alter: true })
module.exports = { User, Recipe }
