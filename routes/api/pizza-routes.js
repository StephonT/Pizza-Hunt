const router = require('express').Router();

//import the functionality and hook it up with the routes
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
  } = require('../../controllers/pizza-controller');

// Set up GET all and POST at /api/pizzas
//destructuring the method names out of the imported object and use those names directly
router
  .route('/')
  .get(getAllPizza)
  .post(createPizza);

  // Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
.route('/:id')
.get(getPizzaById)
.put(updatePizza)
.delete(deletePizza);

module.exports = router;