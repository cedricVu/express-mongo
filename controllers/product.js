const { ObjectId } = require('mongodb');

exports.create = async (req, res, next) => {
    try {
        const body = req.body;
        // check if user not existed
        const userId = body.userId;
        const userCollection = req.db.collection('users');
        const existedUser = await userCollection.findOne({
            _id: ObjectId(userId)
        });
        if (!existedUser) {
            return next(new Error('USER_NOT_FOUND'));
        }
        const productCollection = req.db.collection('products');
        const data = await productCollection.insertOne(body);
        return res.json({
            message: 'Create new user successfully',
            data
        });
    } catch (e) {
        return next(e);
    }
};


exports.getAll = async (req, res, next) => {
    try {
        const productCollection = req.db.collection('products');
        const products = await productCollection.find().toArray();
        return res.json({
            products
        });
    } catch (e) {
        return next(e);
    }
};
