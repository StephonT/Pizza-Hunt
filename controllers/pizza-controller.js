const { Pizza } = require('../models');

const pizzaController = {
    //Methods
    
    //get all pizzas GET /api/pizzas
    getAllPizza(req, res) {
        Pizza.find({})
        //to populate comments
        .populate({
            path: 'comments',
            select: '-__v'
        })
        // to not invlude __v
        .select('-__v')
        // sort method to return newest pizza first
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get one pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
            //If no pizza is found, send 404
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //POST /api/pizzas
    //createPizza
    createPizza({ body }, res) {
        // using body to destructure the request
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.json(err));
    },

    //PUT /api/pizzas/:id
    // update pizza by id
    updatePizza({ params, body }, res) {
        console.log(params.id);
        console.log(body);
        Pizza.findOneAndUpdate(
            { _id: params.id },
             body, 
            { new: true })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
      },

    //DELETE /api/pizzas/:id
    //delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No Pizza found with this id!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = pizzaController;
