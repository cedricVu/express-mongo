const fs = require('fs');
const bcrypt = require('bcrypt-nodejs');
const { ObjectId } = require('mongodb');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

// get info one user
updateById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return next(new Error());
        }
        // user.username = username;
        // user.password = password;
        // await user.save();

            // Instance (Model) (method, properies, _doc ...)
        // doc
        // user.save()
        // user.create()
        if (!user) {
            return next(new Error('USER_NOT_FOUND'));
        }

        return res.json({
            message: 'List users',
            data: user
        });
    } catch (e) {
        return next(new Error('Something went wrong!'));
    }
};

// get info list user
getListUser = async (req, res, next) => {
    try {
        const token = req.query.token;
        if (!token) {
            return next(new Error('NOT_FOUND_TOKEN'));
        }
        jwt.verify(token, 'shhhhh');

        const users = await User.find().lean();
        return res.json({
            message: 'List users',
            data: users
        });
    } catch (e) {
        return next(e);
    }
};

// create new user
createUser = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const salt = bcrypt.genSaltSync(2);
        const hashPassword = bcrypt.hashSync(password, salt);

        const result = await User.create({
            username,
            password: hashPassword
        });

        delete result._doc.password;

        return res.json({
            message: 'Create new user successfully',
            data: result
        });

    } catch (e) {
        return next(e);
    }
};

login = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({
            username
        });

        if (!user) {
            return next(new Error('account not existed'));
        }
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return next(new Error('Password is incorrect'));
        }
        // Generate the access token to user.
        const token = jwt.sign({ username }, 'shhhhh', { expiresIn: 60 }); // data, key to verify the token
        return res.json({
            message: 'Login successfully',
            data: user,
            access_token: token
        });
    } catch (e) {
        return next(e);
    }
};

// delete user
deleteUser = (req, res, next) => {
    try {
        const deleteUserId = parseInt(req.params.id);

        let listUserExist = fs.readFileSync('users.json', 'utf8');
        listUserExist = JSON.parse(listUserExist);
        const userIndex = listUserExist.findIndex((item, index) => {
            if (item.id === deleteUserId) {
                return true;
            }
        });

        if (userIndex !== -1) {
            listUserExist.splice(userIndex, 1);
            fs.writeFileSync('users.json', JSON.stringify(listUserExist));
        } else {
            return next(new Error('Not found user!'));
        }

        return res.json({
            message: 'Delete user ' + deleteUserId + ' successfully!'
        });
    } catch (e) {
        return next(new Error('Something went wrong!'));
    }
};

// update user
updateUser = (req, res, next) => {
    try {
        const updateUserId = parseInt(req.params.id);
        const username = req.body.username;
        const password = req.body.password;

        let listUserExist = fs.readFileSync('users.json', 'utf8');
        listUserExist = JSON.parse(listUserExist);
        const userIndex = listUserExist.findIndex((item) => {
            if (item.id === updateUserId) {
                return true;
            }
        });

        if (userIndex !== -1) {
            listUserExist[userIndex].username = username || listUserExist[userIndex].username;
            listUserExist[userIndex].password = password || listUserExist[userIndex].password;
            fs.writeFileSync('users.json', JSON.stringify(listUserExist));
        } else {
            return next(new Error('Not found user!'));
        }

        return res.json({
            message: 'Update user ' + updateUserId + ' successfully!'
        });
    } catch (e) {
        return next(e);
    }
};

module.exports = {
    // getUser: getUser,
    getListUser: getListUser,
    createUser: createUser,
    login: login
    // deleteUser: deleteUser,
    // updateUser: updateUser
};