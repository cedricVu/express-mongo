const { groupRepository } = require('../repositories');
const responseHelper = require('../helpers/response-helper');

exports.create = async (req, res, next = function(error) {
    return Promise.reject(error);
}) => {
    try {
        const { name, members, type } = req.body;
        const logingUserId = req.user._id;
        // 1. Truyen member chua user khong ton tai trong bang user
        // 2. Truyen double phan user: [1, 1, 2, 3] ==> [1, 2, 3] => set
        // 3. Truyen co the chua thang author, hoac khong chua author
        // const setOfMember = new Set([1, 1, 2, 3]);
        // Set({ 1, 2, 3 })
        // members = Array.from(setOfMember);
        // Sollution
        // Vong lap tung phan tu trong members, query vao bang user.
        // Tinh length cua members = 2. Query trong user 

        // const existingUsers = User.find({
        //     _id: members
        // });
        if (!members.includes(logingUserId)) {
            members.push(logingUserId);
        }
        const countExistingUser = User.count({
            _id: members
        });

        // existingUsers.length !== members.length => return error
        const group = await groupRepository.create({
            name,
            members,
            type,
            author: logingUserId
        });
        return responseHelper.returnSuccess(res, group);
    } catch (e) {
        return next(e);
    }
};


exports.list = async (req, res, next) => {
    try {
        const { limit, lastId } = req.query;
        
        const [groups, totalRecord] = await Promise.all([
            groups.find({
                {
                    _id: {
                        $lt: lastId
                    }
                }
            }),

            groups.count({
                {
                    _id: {
                        $lt: lastId
                    }
                }
            })
        ]);
        // max size call stack = 4

        // const groups = await groupRepository.getAll({ isLean: false });
        return responseHelper.returnSuccess(res, {
            groups,
            totalRecord
        });
    } catch (e) {
        return next(e);
    }
};
