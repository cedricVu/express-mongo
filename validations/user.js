const fs = require('fs');
const Joi = require('joi');

// get info one user
exports.getUserSchema = function() {
    return {
        query: {
            name: Joi.string().required()
        },
        body: {
            password: Joi.string().required().min(3).max(20)
        },
        params: {

        }
    };
}

exports.createUserSchema = function() {
    return {
        body: {
            username: Joi.string().required(),
            password: Joi.number().required()
        }
    }
}