/*
 * UNIT TESTING WITH VITEST
 * FOURTH TEST SUITE: FAKE, STUB, SPY, AND MOCK
 *
 * Test-double names describe how a replacement is used:
 * - fake: a lightweight working implementation, such as an in-memory store,
 * - stub: returns controlled data so the test can reach a behaviour,
 * - spy: records calls while the underlying implementation can still run,
 * - mock: a configured replacement verified through interaction expectations.
 *
 * vi.fn is a tool, not automatically one category. Its role depends on whether
 * the test uses it to provide data, observe calls, or enforce interactions.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    confirmPayment,
    PaymentConfirmationError,
} from './04-payment-confirmation-service.js';

import type {
    AuditSink,
    ConfirmPaymentCommand,
    Payment,
    PaymentConfirmedAuditEvent,
    PaymentRepository,
} from './04-payment-confirmation-service.js';

const PAYMENT_OPERATOR_COMMAND: ConfirmPaymentCommand = {
    orderId: 'order-101',
    actorId: 'user-payment-7',
    actorRole: 'PAYMENT_OPERATOR',
};

const REPORTED_PAYMENT: Payment = {
    orderId: 'order-101',
    status: 'REPORTED',
    confirmedBy: null,
};

class InMemoryPaymentRepository implements PaymentRepository {
    readonly payments = new Map<string, Payment>();

    constructor(initialPayments: readonly Payment[]) {
        initialPayments.forEach((payment) => {
            this.payments.set(payment.orderId, payment);
        });
    }

    async findByOrderId(orderId: string): Promise<Payment | null> {
        return this.payments.get(orderId) ?? null;
    }

    async save(payment: Payment): Promise<void> {
        this.payments.set(payment.orderId, payment);
    }
}

class InMemoryAuditSink implements AuditSink {
    readonly events: PaymentConfirmedAuditEvent[] = [];

    async record(event: PaymentConfirmedAuditEvent): Promise<void> {
        this.events.push(event);
    }
}

afterEach(() => {
    vi.restoreAllMocks();
});

describe('confirmPayment test doubles', () => {
    it('uses fakes to verify the resulting repository and audit state', async () => {
        const paymentRepository = new InMemoryPaymentRepository([
            REPORTED_PAYMENT,
        ]);
        const auditSink = new InMemoryAuditSink();

        const actual = await confirmPayment(PAYMENT_OPERATOR_COMMAND, {
            paymentRepository,
            auditSink,
        });

        expect(actual).toEqual({
            orderId: 'order-101',
            status: 'CONFIRMED',
            confirmedBy: 'user-payment-7',
        });
        expect(paymentRepository.payments.get('order-101')).toEqual(actual);
        expect(auditSink.events).toEqual([
            {
                type: 'PAYMENT_CONFIRMED',
                orderId: 'order-101',
                actorId: 'user-payment-7',
            },
        ]);
    });

    it('uses a stub to reach the payment-not-found behaviour', async () => {
        const paymentRepository: PaymentRepository = {
            findByOrderId: async () => null,
            save: async () => undefined,
        };
        const auditSink: AuditSink = {
            record: async () => undefined,
        };

        await expect(
            confirmPayment(PAYMENT_OPERATOR_COMMAND, {
                paymentRepository,
                auditSink,
            }),
        ).rejects.toMatchObject({
            code: 'PAYMENT_NOT_FOUND',
            message: 'reported payment was not found',
        });
    });

    it('uses a spy to observe a real fake implementation', async () => {
        const paymentRepository = new InMemoryPaymentRepository([
            REPORTED_PAYMENT,
        ]);
        const auditSink = new InMemoryAuditSink();
        const recordSpy = vi.spyOn(auditSink, 'record');

        await confirmPayment(PAYMENT_OPERATOR_COMMAND, {
            paymentRepository,
            auditSink,
        });

        expect(recordSpy).toHaveBeenCalledOnce();
        expect(recordSpy).toHaveBeenCalledWith({
            type: 'PAYMENT_CONFIRMED',
            orderId: 'order-101',
            actorId: 'user-payment-7',
        });
        expect(auditSink.events).toHaveLength(1);
    });

    it('uses mocks when dependency interactions are part of the contract', async () => {
        const findByOrderId = vi
            .fn<PaymentRepository['findByOrderId']>()
            .mockResolvedValue(REPORTED_PAYMENT);
        const save = vi
            .fn<PaymentRepository['save']>()
            .mockResolvedValue(undefined);
        const record = vi
            .fn<AuditSink['record']>()
            .mockResolvedValue(undefined);

        await confirmPayment(PAYMENT_OPERATOR_COMMAND, {
            paymentRepository: { findByOrderId, save },
            auditSink: { record },
        });

        expect(findByOrderId).toHaveBeenCalledWith('order-101');
        expect(save).toHaveBeenCalledWith({
            orderId: 'order-101',
            status: 'CONFIRMED',
            confirmedBy: 'user-payment-7',
        });
        expect(record).toHaveBeenCalledWith({
            type: 'PAYMENT_CONFIRMED',
            orderId: 'order-101',
            actorId: 'user-payment-7',
        });
        expect(save.mock.invocationCallOrder[0]).toBeLessThan(
            record.mock.invocationCallOrder[0]!,
        );
    });

    it('does not call dependencies when authorization fails', async () => {
        const findByOrderId = vi.fn<PaymentRepository['findByOrderId']>();
        const save = vi.fn<PaymentRepository['save']>();
        const record = vi.fn<AuditSink['record']>();

        await expect(
            confirmPayment(
                {
                    ...PAYMENT_OPERATOR_COMMAND,
                    actorRole: 'ORDER_OPERATOR',
                },
                {
                    paymentRepository: { findByOrderId, save },
                    auditSink: { record },
                },
            ),
        ).rejects.toBeInstanceOf(PaymentConfirmationError);

        expect(findByOrderId).not.toHaveBeenCalled();
        expect(save).not.toHaveBeenCalled();
        expect(record).not.toHaveBeenCalled();
    });
});

/*
 * WHEN TO PREFER EACH DOUBLE
 *
 * Prefer a fake when state is the important observation. Use a stub when only
 * controlled indirect input is needed. Add a spy or mock when an interaction is
 * itself a requirement, such as writing a security audit event.
 *
 * Do not assert every internal call. Excessive interaction assertions couple a
 * test to implementation details and make safe refactoring unnecessarily hard.
 */

/*
 * ERROR OBSERVATION
 *
 * Move audit recording before repository.save in the production service. The
 * mock test fails on invocationCallOrder and explains which required side-effect
 * order changed. Restore the original order after observing the failure.
 */

/*
 * APPLICATION TASK
 *
 * Add an invalid-state test for an already CONFIRMED payment. Use a stub because
 * the goal is to reach and verify a returned error, not to inspect every call.
 */

/*
 * INTERVIEW SENTENCES
 *
 * "A fake has working behaviour; a stub supplies controlled answers."
 * "A spy records interactions, while a mock is configured around expectations."
 * "I mock external boundaries only when the interaction is relevant to risk."
 */

/*
 * FINAL SUMMARY
 *
 * This suite demonstrates:
 * - dependency injection through small interfaces
 * - in-memory fakes and fixed-response stubs
 * - vi.spyOn around a working implementation
 * - typed vi.fn mocks and async mockResolvedValue
 * - call arguments, call counts, negative calls, and invocation order
 * - the difference between state-based and interaction-based verification
 */
