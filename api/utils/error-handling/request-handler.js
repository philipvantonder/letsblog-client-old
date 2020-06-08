const { ErrorBase, UnknownError } = require('./custom-errors');

async function handle (func, next) {

	try {

		await func();

	} catch (error) {
		if ((error instanceof ErrorBase) === false) {
			error = new UnknownError(error.message);
		}

		next(error);
	}

}

module.exports = {
	handle
};