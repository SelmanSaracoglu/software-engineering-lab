/*
 * RUNTIME CHECK
 *
 * renderToStaticMarkup executes the React component and converts its initial
 * element tree to HTML. This is not a browser interaction test. It is a small
 * runtime proof that JSX, props, composition, formatting, and escaping work.
 */

import { renderToStaticMarkup } from 'react-dom/server';

import { OrderCard } from './01-component-jsx-and-props.js';

import type { OrderSummary } from './01-component-jsx-and-props.js';

function expectMarkupToContain(
    markup: string,
    expected: string,
    reason: string,
): void {
    if (!markup.includes(expected)) {
        throw new Error(
            `React foundation check failed: ${reason}. Missing: ${expected}`,
        );
    }
}

function expectMarkupNotToContain(
    markup: string,
    forbidden: string,
    reason: string,
): void {
    if (markup.includes(forbidden)) {
        throw new Error(
            `React foundation check failed: ${reason}. Found: ${forbidden}`,
        );
    }
}

const reportedOrder: OrderSummary = {
    id: 'order-101',
    customerName: 'Ada Lovelace',
    itemCount: 3,
    totalCents: 10_500,
    status: 'REPORTED',
};

const reportedOrderMarkup = renderToStaticMarkup(
    <OrderCard order={reportedOrder} heading="Payment review" />,
);

expectMarkupToContain(
    reportedOrderMarkup,
    'Payment review',
    'heading prop should be rendered',
);
expectMarkupToContain(
    reportedOrderMarkup,
    'Ada Lovelace',
    'customer prop should be rendered',
);
expectMarkupToContain(
    reportedOrderMarkup,
    'Reserved',
    'REPORTED status should use its user-facing label',
);
expectMarkupToContain(
    reportedOrderMarkup,
    '105.00 EUR',
    'total cents should be formatted for display',
);
expectMarkupToContain(
    reportedOrderMarkup,
    'data-order-id="order-101"',
    'the card should identify its order',
);

const untrustedCustomerOrder: OrderSummary = {
    ...reportedOrder,
    id: 'order-unsafe-name',
    customerName: '<script>alert("unsafe")</script>',
};

const escapedMarkup = renderToStaticMarkup(
    <OrderCard order={untrustedCustomerOrder} heading="Order" />,
);

expectMarkupToContain(
    escapedMarkup,
    '&lt;script&gt;',
    'React should escape text inserted through a JSX expression',
);
expectMarkupNotToContain(
    escapedMarkup,
    '<script>',
    'untrusted text must not become an executable script element',
);

console.log('React component, JSX, and props check: PASSED');
console.log({
    component: 'OrderCard',
    checks: 7,
    renderedMarkup: reportedOrderMarkup,
});

/*
 * ERROR OBSERVATION
 *
 * Replace {order.customerName} in OrderCard with a fixed name and run the check.
 * The customer assertion fails and identifies the broken props-to-output flow.
 * Restore the original JSX after observing the failure.
 */
