  
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


class UnknownError extends ErrorBase {
    constructor(message) {
        super(412, message);
    }
}

module.exports = {
	EntityAlreadyExists,
	UnknownError,
	ErrorBase
};