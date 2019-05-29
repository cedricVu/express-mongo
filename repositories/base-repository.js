module.exports = class BaseRepository {
	constructor(model) {
		this.model = model;
	}

	getAll(options) { 
		const newOptions = Object.assign(
			{
				isLean: true,
				limit: 100,
				page: 1
			},
			options
		);
		if (newOptions.limit > 100) {
			newOptions.limt = 100;
		}
		newOptions.where = Object.assign({
			deletedAt: null
		}, newOptions.where);
		// { isLean: fasle, limit: 10, page: 1 }
		return this.model.find(newOptions.where).lean(newOptions.isLean);
	}

	getOne(options) {
		return this.model.findOne(options.where);
	}

	create(data) {
		if (Array.isArray(data)) {
			return this.model.createMany(data);
		}
		return this.model.createOne(data);
	}
}