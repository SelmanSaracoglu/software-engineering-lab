/*
 * REACT FOR COMPONENT TESTING
 * COMPONENTS, JSX, PROPS, AND COMPOSITION
 *
 * A React component is a function that receives input and describes UI output.
 * The input object is called props. JSX is syntax for describing the element
 * tree that React should render.
 *
 * A component test later observes the same relationship:
 *
 *     props -> rendered output
 *
 * This file contains no state, effects, router, context, or network access.
 * Those concepts are introduced only when their behaviour is needed.
 */

import type { ReactElement } from 'react';

export type OrderStatus =
    | 'NEW'
    | 'AWAITING_PAYMENT'
    | 'REPORTED'
    | 'CONFIRMED'
    | 'COMPLETED';

export type OrderSummary = {
    readonly id: string;
    readonly customerName: string;
    readonly itemCount: number;
    readonly totalCents: number;
    readonly status: OrderStatus;
};

type OrderStatusBadgeProps = {
    readonly status: OrderStatus;
};

type OrderCardProps = {
    readonly order: OrderSummary;
    readonly heading: string;
};

const STATUS_LABELS: Record<OrderStatus, string> = {
    NEW: 'New',
    AWAITING_PAYMENT: 'Awaiting payment',
    REPORTED: 'Reserved',
    CONFIRMED: 'Payment confirmed',
    COMPLETED: 'Completed',
};

function formatEuro(cents: number): string {
    return `${(cents / 100).toFixed(2)} EUR`;
}

export function OrderStatusBadge({
    status,
}: OrderStatusBadgeProps): ReactElement {
    return (
        <span
            className={`order-status order-status--${status.toLowerCase()}`}
            data-status={status}
        >
            {STATUS_LABELS[status]}
        </span>
    );
}

export function OrderCard({ order, heading }: OrderCardProps): ReactElement {
    return (
        <article className="order-card" data-order-id={order.id}>
            <header className="order-card__header">
                <h2>{heading}</h2>
                <OrderStatusBadge status={order.status} />
            </header>

            <dl className="order-card__details">
                <div>
                    <dt>Order</dt>
                    <dd>{order.id}</dd>
                </div>
                <div>
                    <dt>Customer</dt>
                    <dd>{order.customerName}</dd>
                </div>
                <div>
                    <dt>Items</dt>
                    <dd>{order.itemCount}</dd>
                </div>
                <div>
                    <dt>Total</dt>
                    <dd>{formatEuro(order.totalCents)}</dd>
                </div>
            </dl>
        </article>
    );
}

/*
 * HOW TO READ THIS COMPONENT
 *
 * Component:
 * OrderCard is a normal TypeScript function whose name starts with a capital
 * letter. React treats a lowercase JSX name as an HTML element and a capitalized
 * JSX name as a custom component.
 *
 * JSX:
 * <article>, <header>, <h2>, <dl>, <dt>, and <dd> become browser elements.
 * Curly braces switch from JSX markup into a JavaScript expression.
 *
 * Props:
 * order and heading are read-only inputs. OrderCard may read them but should not
 * modify them. A parent component chooses their values.
 *
 * Composition:
 * OrderCard renders OrderStatusBadge and passes only the status it needs. The
 * smaller component owns status presentation; the card owns order layout.
 *
 * Output:
 * The return value is a React element description. React later turns that tree
 * into DOM nodes in a browser or HTML during server rendering.
 */

/*
 * TESTING VIEW
 *
 * Important observable behaviour:
 * - the heading and order fields come from props,
 * - the status receives a meaningful label,
 * - the total is formatted for display,
 * - the component uses semantic elements that a user can understand.
 *
 * Internal constants and the formatEuro function are implementation details.
 * A component test should usually assert visible behaviour instead of reaching
 * into those internals.
 */

/*
 * APPLICATION TASK
 *
 * Add createdAtIso to OrderSummary and render it with a semantic <time> element.
 * Keep the original ISO value in dateTime and show a readable value to the user.
 * Then extend the runtime check with one meaningful assertion.
 */

/*
 * INTERVIEW SENTENCES
 *
 * "A React component maps props and state to a rendered element tree."
 * "Props are read-only inputs supplied by the parent component."
 * "I test observable output instead of private rendering implementation."
 */

/*
 * FINAL SUMMARY
 *
 * This file demonstrates:
 * - function components
 * - JSX elements and JavaScript expressions
 * - typed and read-only props
 * - parent-to-child data flow
 * - component composition
 * - semantic HTML
 * - a component's testable input-output boundary
 */
