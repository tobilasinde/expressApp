var express = require('express')
const { Recipe, create_user, check_authorization } = require('../database')
var router = express.Router()

//Create a new recipe
router.post('/', check_authorization, async function (req, res, next) {
	const { name, description, cook_time, prep_time, yield, category, directions, ingredients } = req.body
	const result = await Recipe.create({
		name,
		description,
		cook_time,
		prep_time,
		yield,
		category,
		directions,
		ingredients
	})
	res.send(result)
})

//Update a recipe
router.put('/:id', async function (req, res, next) {
	const id = req.params.id
	const { name, description, cook_time, prep_time, yield, category, directions, ingredients, status} = req.body
	const result = await Recipe.update(
		{
			name,
			description,
			cook_time,
			prep_time,
			yield,
			category,
			directions,
			ingredients,
			status,
		},
		{ where: { id: id } }
	)
	if (result[0] === 0) {
		res.send('Recipe not found')
	} else {
		res.send('Recipe updated successfully')
	}
})

//Delete a recipe
router.delete('/:id', async function (req, res, next) {
	const id = req.params.id
	const result = await Recipe.destroy({ where: { id: id } })
	if (result === 1) {
		res.send('Recipe deleted successfully')
	} else {
		res.send('Recipe not found')
	}
})

//Get all recipes
router.get('/', async function (req, res, next) {
	const { status, name } = req.query
	const whereClause = {}
	if (status) {
		whereClause.status = status
	}
	if (name) {
		whereClause.name = name
	}
	const recipes = await Recipe.findAll({ where: whereClause })
	res.send(recipes)
})

//Get a recipe by id
router.get('/:id', async function (req, res, next) {
	const id = req.params.id
	const recipe = await Recipe.findByPk(id)
	console.log(recipe)
	if (recipe) {
		res.send(recipe)
	} else {
		res.send('Recipe not found')
	}
})
//Get one recipe by name
router.get('/name/:name', async function (req, res, next) {
	const name = req.params.name
	const recipe = await Recipe.findOne({ where: { name: name } })
	if (recipe) {
		res.send(recipe)
	} else {
		res.send('Recipe not found')
	}
})
module.exports = router
