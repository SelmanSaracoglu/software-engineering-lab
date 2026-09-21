/*
 * UNIT TESTING WITH VITEST
 * PRODUCTION CODE: DEPENDENCY BOUNDARIES
 *
 * A dependency is code that the tested unit collaborates with. Database access
 * and audit publishing are dependencies here. The service receives them through
 * explicit interfaces instead of constructing concrete clients internally.
 *
 * This design keeps the business rule visible and allows a test to replace only
 * the slow or uncontrollable boundaries.
 */

export type UserRole =
    | 'ADMIN'
    | 'ORDER_OPERATOR'
    | 'PAYMENT_OPERATOR'
    | 'FULFILLMENT_OPERATOR';

export type PaymentStatus = 'REPORTED' | 'CONFIRMED';

export type Payment = {
    readonly orderId: string;
    readonly status: PaymentStatus;
    readonly confirmedBy: string | null;
};

export type PaymentConfirmedAuditEvent = {
    readonly type: 'PAYMENT_CONFIRMED';
    readonly orderId: string;
    readonly actorId: string;
};

export interface PaymentRepository {
    findByOrderId(orderId: string): Promise<Payment | null>;
    save(payment: Payment): Promise<void>;
}

export interface AuditSink {
    record(event: PaymentConfirmedAuditEvent): Promise<void>;
}

export type ConfirmPaymentDependencies = {
    readonly paymentRepository: PaymentRepository;
    readonly auditSink: AuditSink;
};

export type ConfirmPaymentCommand = {
    readonly orderId: string;
    readonly actorId: string;
    readonly actorRole: UserRole;
};

export type PaymentConfirmationErrorCode =
    | 'FORBIDDEN'
    | 'PAYMENT_NOT_FOUND'
    | 'INVALID_PAYMENT_STATE';

export class PaymentConfirmationError extends Error {
    readonly code: PaymentConfirmationErrorCode;

    constructor(code: PaymentConfirmationErrorCode, message: string) {
        super(message);
        this.name = 'PaymentConfirmationError';
        this.code = code;
    }
}

export async function confirmPayment(
    command: ConfirmPaymentCommand,
    dependencies: ConfirmPaymentDependencies,
): Promise<Payment> {
    if (command.actorRole !== 'PAYMENT_OPERATOR') {
        throw new PaymentConfirmationError(
            'FORBIDDEN',
            'only a payment operator can confirm a payment',
        );
    }

    const payment = await dependencies.paymentRepository.findByOrderId(
        command.orderId,
    );

    if (payment === null) {
        throw new PaymentConfirmationError(
            'PAYMENT_NOT_FOUND',
            'reported payment was not found',
        );
    }

    if (payment.status !== 'REPORTED') {
        throw new PaymentConfirmationError(
            'INVALID_PAYMENT_STATE',
            'only a reported payment can be confirmed',
        );
    }

    const confirmedPayment: Payment = {
        ...payment,
        status: 'CONFIRMED',
        confirmedBy: command.actorId,
    };

    await dependencies.paymentRepository.save(confirmedPayment);
    await dependencies.auditSink.record({
        type: 'PAYMENT_CONFIRMED',
        orderId: command.orderId,
        actorId: command.actorId,
    });

    return confirmedPayment;
}

/*
 * UNIT TEST LIMIT
 *
 * These unit tests can prove call order and error propagation, but they cannot
 * prove that a real database save and audit insert share one transaction. That
 * guarantee belongs to an integration test with the real database boundary.
 */
