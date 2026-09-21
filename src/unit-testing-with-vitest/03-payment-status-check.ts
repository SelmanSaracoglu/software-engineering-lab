/*
 * UNIT TESTING WITH VITEST
 * PRODUCTION CODE: ASYNCHRONOUS PAYMENT STATUS CHECK
 *
 * An async function always returns a Promise. A returned value becomes a
 * fulfilled Promise, while a thrown error becomes a rejected Promise.
 *
 * The status source is passed into the function so this business operation is
 * not coupled to fetch, a database client, or another global dependency.
 */

export type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED';

export type PaymentStatusResult = {
    readonly reference: string;
    readonly status: PaymentStatus;
    readonly checkedAtMs: number;
};

export type LoadPaymentStatus = (reference: string) => Promise<unknown>;

export type PaymentStatusErrorCode =
    | 'INVALID_REFERENCE'
    | 'INVALID_RESPONSE'
    | 'STATUS_SOURCE_UNAVAILABLE';

export class PaymentStatusCheckError extends Error {
    readonly code: PaymentStatusErrorCode;
    readonly cause: unknown;

    constructor(
        code: PaymentStatusErrorCode,
        message: string,
        cause?: unknown,
    ) {
        super(message);
        this.name = 'PaymentStatusCheckError';
        this.code = code;
        this.cause = cause;
    }
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isPaymentStatus(value: unknown): value is PaymentStatus {
    return value === 'PENDING' || value === 'CONFIRMED' || value === 'REJECTED';
}

export async function checkPaymentStatus(
    rawReference: string,
    loadStatus: LoadPaymentStatus,
): Promise<PaymentStatusResult> {
    const reference = rawReference.trim();

    if (reference.length === 0) {
        throw new PaymentStatusCheckError(
            'INVALID_REFERENCE',
            'payment reference must be a non-empty string',
        );
    }

    let payload: unknown;

    try {
        payload = await loadStatus(reference);
    } catch (error: unknown) {
        throw new PaymentStatusCheckError(
            'STATUS_SOURCE_UNAVAILABLE',
            'payment status source is unavailable',
            error,
        );
    }

    if (
        !isRecord(payload) ||
        payload.reference !== reference ||
        !isPaymentStatus(payload.status) ||
        !Number.isInteger(payload.checkedAtMs) ||
        Number(payload.checkedAtMs) < 0
    ) {
        throw new PaymentStatusCheckError(
            'INVALID_RESPONSE',
            'payment status source returned an invalid response',
        );
    }

    return {
        reference,
        status: payload.status,
        checkedAtMs: Number(payload.checkedAtMs),
    };
}
