// Import private key, public key
// export sign, verify.
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../config/private.key'), 'utf8');
console.log(privateKey);
const publicKey = fs.readFileSync(path.resolve(__dirname, '../config/public.key'), 'utf8');
console.log(publicKey);

exports.sign = function(payload, options = {}) {
	options = Object.assign(
		{
			algorithm: 'RS256',
			expiresIn: 60 * 60
		},
		options
	);
	return jwt.sign(payload, privateKey, options);
};

exports.verify = function(token, options = {}) {
	return jwt.verify(token, publicKey, options);
};

