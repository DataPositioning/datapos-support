/**
 * @file datapos-engine-support/src/errors.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface SerialisedErrorData {
    cause?: SerialisedErrorData;
    context?: string;
    message: string;
    name: string;
    stack?: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Abort
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class AbortError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AbortError';
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Connector
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class ConnectorError extends Error {
    cause?: unknown;
    context?: string;

    constructor(message: string, context?: string, cause?: unknown) {
        super(message);
        this.name = 'ConnectorError';
        this.context = context;
        console.log(99, this.context);
        this.cause = cause;
        if (Error.captureStackTrace) {
            console.log('ConnectorError', 'Error.captureStackTrace');
            Error.captureStackTrace(this, ConnectorError);
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Contextual
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class ContextualError extends Error {
    cause?: unknown;
    context?: string;

    constructor(message: string, context?: string, cause?: unknown) {
        super(message);
        this.name = 'ContextualError';
        this.context = context;
        this.cause = cause;
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Engine
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class EngineError extends Error {
    cause?: unknown;
    context?: string;

    constructor(message: string, context?: string, cause?: unknown) {
        super(message);
        this.name = 'EngineError';
        this.context = context;
        this.cause = cause;
        if (Error.captureStackTrace) {
            console.log('EngineError', 'Error.captureStackTrace');
            Error.captureStackTrace(this, EngineError);
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Fetch Response
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Errors - Worker
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class WorkerError extends Error {
    cause?: unknown;

    constructor(cause?: unknown) {
        super('Engine error wrapper.');
        this.name = 'WorkerError';
        this.cause = cause;
    }
}
