  
class ErrorBase extends Error {
    constructor(httpErrorCode, message) {
        super(message);

        this.httpErrorCode = httpErrorCode;
    }
}

class EntityAlreadyExists extends ErrorBase {
    constructor(entity, message) {
        super(400, message);

        this.entity = entity;
    }
}

class EntityNotFoundError extends ErrorBase {
	constructor (entity, message) {
		super(404, message);

		this.entity = entity;
	}
}

class TokenExpiredError extends ErrorBase {
    constructor() {
        super(401, 'Token expired');
    }
}

class InvalidTokenError extends ErrorBase {
    constructor() {
        super(401, 'Invalid Token Provided');
    }
}

class InvalidPermissionError extends ErrorBase {
    constructor() {
        super(401, 'Unauthorized');
    }
}

class UnknownError extends ErrorBase {
    constructor(message) {
        super(412, message);
    }
}

module.exports = {
	EntityAlreadyExists,
	EntityNotFoundError,
	TokenExpiredError,
	InvalidTokenError,
	InvalidPermissionError,
	UnknownError,
	ErrorBase,
};