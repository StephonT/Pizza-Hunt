const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
    {
    pizzaName: {
        type: String,
        required: 'You need to provide a pizza name!',
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        required: true,
        // If a user attempts to enter a pizza size not listed, the validation simply won't allow it.
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    },
    toppings:  [],

    comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment'
        }
      ]
    },
    {
        toJSON: {
            //telling the PizzaSchema to use virtuals and getters
            virtuals: true,
            getters: true
          },
          id: false
    }
);

//get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    //using the .reduce() method to tally up the total of every comment with its replies.
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

//create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;