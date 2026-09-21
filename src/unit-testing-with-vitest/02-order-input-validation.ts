/*
 * UNIT TESTING WITH VITEST
 * PRODUCTION CODE: ORDER INPUT VALIDATION
 *
 * TypeScript types protect code during compilation. They cannot prove that
 * runtime data from HTTP, JSON, a form, or a database has the expected shape.
 * This module accepts unknown input, validates it, and either returns a safe
 * value or throws a structured validation error.
 */

export type ValidationIssueCode =
    | 'INVALID_TYPE'
    | 'REQUIRED'
    | 'INVALID_VALUE';

export type ValidationIssue = {
    readonly path: string;
    readonly code: ValidationIssueCode;
    readonly message: string;
};

export type ValidatedOrderItem = {
    readonly productId: string;
    readonly quantity: number;
    readonly unitPriceCents: number;
};

export type ValidatedOrderInput = {
    readonly customerName: string;
    readonly items: readonly ValidatedOrderItem[];
    readonly totalCents: number;
};

export class OrderValidationError extends Error {
    readonly issues: readonly ValidationIssue[];

    constructor(issues: readonly ValidationIssue[]) {
        super('Order validation failed');
        this.name = 'OrderValidationError';
        this.issues = [...issues];
    }
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requiredTextIssue(path: string): ValidationIssue {
    return {
        path,
        code: 'REQUIRED',
        message: `${path} must be a non-empty string`,
    };
}

export function parseOrderInput(input: unknown): ValidatedOrderInput {
    if (!isRecord(input)) {
        throw new OrderValidationError([
            {
                path: '$',
                code: 'INVALID_TYPE',
                message: 'order input must be an object',
            },
        ]);
    }

    const issues: ValidationIssue[] = [];
    const customerName =
        typeof input.customerName === 'string'
            ? input.customerName.trim()
            : '';

    if (customerName.length === 0) {
        issues.push(requiredTextIssue('customerName'));
    }

    const validatedItems: ValidatedOrderItem[] = [];

    if (!Array.isArray(input.items) || input.items.length === 0) {
        issues.push({
            path: 'items',
            code: 'REQUIRED',
            message: 'items must contain at least one order item',
        });
    } else {
        input.items.forEach((item: unknown, index: number) => {
            const itemPath = `items[${index}]`;

            if (!isRecord(item)) {
                issues.push({
                    path: itemPath,
                    code: 'INVALID_TYPE',
                    message: `${itemPath} must be an object`,
                });
                return;
            }

            const issueCountBeforeItem = issues.length;
            const productId =
                typeof item.productId === 'string'
                    ? item.productId.trim()
                    : '';

            if (productId.length === 0) {
                issues.push(requiredTextIssue(`${itemPath}.productId`));
            }

            if (!Number.isInteger(item.quantity) || Number(item.quantity) < 1) {
                issues.push({
                    path: `${itemPath}.quantity`,
                    code: 'INVALID_VALUE',
                    message: `${itemPath}.quantity must be a positive integer`,
                });
            }

            if (
                !Number.isInteger(item.unitPriceCents) ||
                Number(item.unitPriceCents) < 0
            ) {
                issues.push({
                    path: `${itemPath}.unitPriceCents`,
                    code: 'INVALID_VALUE',
                    message: `${itemPath}.unitPriceCents must be a non-negative integer`,
                });
            }

            if (issues.length === issueCountBeforeItem) {
                validatedItems.push({
                    productId,
                    quantity: Number(item.quantity),
                    unitPriceCents: Number(item.unitPriceCents),
                });
            }
        });
    }

    if (issues.length > 0) {
        throw new OrderValidationError(issues);
    }

    return {
        customerName,
        items: validatedItems,
        totalCents: validatedItems.reduce(
            (total, item) => total + item.quantity * item.unitPriceCents,
            0,
        ),
    };
}
