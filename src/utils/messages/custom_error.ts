
export abstract class BaseError extends Error {
    public abstract status_code: number;
    public abstract type: string;
    public details?: unknown;

    constructor(message: string, details?: unknown) {
        super(message);
        this.name = new.target.name;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends BaseError {
    public status_code = 400;
    public type = 'ValidationError';

    constructor(message: string, details?: unknown) {
        super(message, details);
    }
}

export class NotFoundError extends BaseError {
    public status_code = 404;
    public type = 'NotFoundError';

    constructor(message: string, details?: unknown) {
        super(message, details);
    }
}

export class UnauthorizedError extends BaseError {
    public status_code = 404;
    public type = 'UnauthorizedError';
    constructor(message: string, details = null) {
        super(message, details);
    }
}

export class DatabaseError extends BaseError {
    public status_code = 500;
    public type = 'DatabaseError';
    constructor(message: string, details = null) {
        super(message, details);
    }
}

export class DocumentUploadError extends BaseError {
    public status_code = 500;
    public type = 'DocumentUploadError';
    constructor(message: string, details?: unknown) {
        super(message, details);
    }
}

export class ApiRequestError extends BaseError {
    public status_code = 500;
    public type = 'ApiRequestError';

    constructor(message: string, details?: unknown) {
        super(message, details);
    }
}

