const fs = require('fs');

// get info one user
getUser = (req, res, next) => {
    try {
        const getIdUser = parseInt(req.params.id);
        if (isNaN(getIdUser)) {
            return next(new Error('id have to a number!'));
        };
        
        next();
    } catch (e) {
        return next(new Error('Something went wrong!'));
    }
};

// get info list user
getListUser = (req, res, next) => {
    try {
        next();
    } catch (e) {
        return next(new Error('Something went wrong!'));
    }
};

// create new user
createUser = (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username) {
            return next(new Error('username is required field!'));
        };

        if (!password) {
            return next(new Error('password is required field!'));
        }
        next();

    } catch (e) {
        return next(new Error('Something went wrong'));
    }
};

// delete user
deleteUser = (req, res, next) => {
    try {
        const deleteUserId = parseInt(req.params.id);

        if (isNaN(deleteUserId)) {
            return next(new Error('id have to a number!'));
        };
        
        next();

    } catch (e) {
        return next(new Error('Something went wrong!'));
    }
};

// update user
updateUser = (req, res, next) => {
    try {
        const updateUserId = parseInt(req.params.id);

        if (isNaN(updateUserId)) {
            return next(new Error('id have to a number!'));
        };
        next();

    } catch (e) {
        return next(new Error('Something went wrong!'));
    }
};

module.exports = {
    getUser : getUser,
    getListUser : getListUser,
    createUser : createUser,
    deleteUser : deleteUser,
    updateUser : updateUser
};