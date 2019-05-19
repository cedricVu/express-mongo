const jwt = require('jsonwebtoken');
const { verify } = require('../helpers/jwt-helper.js');

exports.verifyToken = function(req, res, next) {
	try {
		let token = req.body.token || req.query.token || req.headers.token;
		let queryToken = req.query.token;
		if (!token) {
			return next(new Error('AUTHENTICATION_FAILED'));
		}
		const [ prefixToken, accessToken ] = token.split(' ');
		if (prefixToken !== 'Bearer') {
			return next(new Error('JWT_INVALID_FORMAT'));
		}
		token = accessToken;
		const verifiedData = verify(token);
		req.user = verifiedData;
		return next();
	} catch (e) {
		return next(e);
	}
};