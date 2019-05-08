const fs = require('fs');
const { ObjectId } = require('mongodb');

// get info one user
getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await req.db.collection('users').findOne({
            _id: ObjectId(userId)
        });

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
        const users = await req.db.collection('users').find().toArray();
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

        const newUser = {
            username: username,
            password: password
        };

        const result = await req.db.collection('users').insertOne(newUser);
        return res.json({
            message: 'Create new user successfully',
            data: result.ops[0]
        });

    } catch (e) {
        return next(new Error('Something went wrong'));
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
    getUser: getUser,
    getListUser: getListUser,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser
};