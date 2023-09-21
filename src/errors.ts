export interface SerialisedErrorData {
    cause?: SerialisedErrorData;
    context?: string;
    message: string;
    name: string;
    stack?: string;
}

// Errors - Abort
export class AbortError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AbortError';
    }
}

// Errors - Context
export class ContextError extends Error {
    context?: string;
    constructor(message: string, context?: string) {
        super(message);
        this.name = 'ContextError';
        this.context = context;
    }
}

// Errors - Backend
export class BackendContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        super(message, context);
        this.name = 'BackendContextError';
        this.cause = cause;
    }
}

// Errors - Connector
export class ConnectorContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        super(message, context);
        this.name = 'ConnectorContextError';
        this.cause = cause;
    }
}

// Errors - Engine - Core
export class EngineCoreError extends Error {
    originalName: string;
    constructor(message: string, originalName: string) {
        super(message);
        this.name = 'EngineCoreError';
        this.originalName = originalName;
    }
}

// Errors - Engine - Context
export class EngineContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        super(message, context);
        this.name = 'EngineContextError';
        this.cause = cause;
    }
}

// Errors - Engine - Worker
export class EngineWorkerError extends Error {
    constructor(cause?: unknown) {
        super('Engine worker error wrapper.');
        this.name = 'EngineWorkerError';
        this.cause = cause;
    }
}

// Errors - Fetch Response
export class FetchResponseError extends Error {
    bodyText: string;
    status: number;
    statusText: string;
    constructor(status: number, statusText: string, bodyText: string) {
        super('Failed to return fetch response.');
        this.name = 'FetchResponseError';
        this.status = status;
        this.statusText = statusText;
        this.bodyText = bodyText;
    }
}

// Errors - Frontend
export class FrontendContextError extends ContextError {
    constructor(message: string, context?: string, cause?: unknown) {
        super(message, context);
        this.name = 'FrontendContextError';
        this.cause = cause;
    }
}
