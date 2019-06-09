exports.returnSuccess = function (res, data) {
	if (res) {
		return res.json(data);
	}
	return data;	
}
exports.returnError = function(res, error) {
	return res.status(400).json({
		message: 'Opps something went wrong.',
		error
	});
}