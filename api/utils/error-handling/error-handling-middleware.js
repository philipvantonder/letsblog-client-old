const { ErrorBase } = require('./custom-errors');

async function errorHandlingMiddleware(err, req, res, next) {

    if (err instanceof ErrorBase) {
        err.statusCode = err.httpErrorCode;
    } else {
        err.statusCode = 500;
    }

    res.status(err.statusCode).send({
        statusCode: err.statusCode,
        message: err.message
	});
	
}

module.exports = {
    errorHandlingMiddleware
};