/*
 * ARRAY, OBJECT, RECORD, MAP AND SET
 *
 * A collection stores several related values. The important question is not
 * "Which syntax do I remember?" but "What relationship does this data have?"
 *
 * Test automation and security automation commonly work with ordered events,
 * fixed configuration, dynamic counters, and unique identifiers. Those needs
 * do not all belong in the same data structure.
 *
 * This lesson covers:
 * - choosing between Array, object, Record, Map, and Set
 * - copying and sorting an array without changing the source
 * - iterating object keys, values, and entries
 * - Map operations and possibly missing values
 * - Set operations and uniqueness
 * - converting between arrays and sets
 * - collection choices for log and event analysis
 */

type EventOutcome = 'SUCCESS' | 'FAILURE';

type EventSeverity = 'LOW' | 'MEDIUM' | 'HIGH';

type SecurityEvent = {
    readonly id: string;
    readonly sourceIp: string;
    readonly username: string;
    readonly outcome: EventOutcome;
    readonly severity: EventSeverity;
    readonly occurredAt: string;
};

const securityEvents: readonly SecurityEvent[] = [
    {
        id: 'event-101',
        sourceIp: '203.0.113.10',
        username: 'admin',
        outcome: 'FAILURE',
        severity: 'MEDIUM',
        occurredAt: '2026-09-20T08:01:00Z',
    },
    {
        id: 'event-102',
        sourceIp: '203.0.113.10',
        username: 'admin',
        outcome: 'FAILURE',
        severity: 'HIGH',
        occurredAt: '2026-09-20T08:03:00Z',
    },
    {
        id: 'event-103',
        sourceIp: '198.51.100.25',
        username: 'analyst',
        outcome: 'SUCCESS',
        severity: 'LOW',
        occurredAt: '2026-09-20T08:05:00Z',
    },
];

/*
 * SECTION 1
 * Array: an ordered sequence
 *
 * Use an array when order matters or when several values may legitimately be
 * equal. The same source IP appears twice because these are two different
 * events. Removing that duplicate would destroy evidence.
 */

console.log('First event:', securityEvents[0]);
console.log('Event count:', securityEvents.length);

const failedEvents = securityEvents.filter((event) => {
    return event.outcome === 'FAILURE';
});

console.log('Failed events:', failedEvents);

/*
 * An array is usually the correct structure for ordered API results, log
 * lines, test cases, or findings. A Set is not a replacement merely because
 * some property values repeat.
 */

/*
 * SECTION 2
 * Copy before a mutating sort
 *
 * Array.prototype.sort changes the array on which it is called. Spread creates
 * a new outer array first, so the original event order remains unchanged.
 */

const newestEventsFirst = [...securityEvents].sort(
    (leftEvent, rightEvent) => {
        return Date.parse(rightEvent.occurredAt) -
            Date.parse(leftEvent.occurredAt);
    },
);

console.log(
    'Original first event:',
    securityEvents[0]?.id,
);

console.log(
    'Newest first event:',
    newestEventsFirst[0]?.id,
);

/*
 * The spread is a shallow copy. The array container is new, but the event
 * objects inside it are the same readonly objects. Deep copying is not needed
 * merely to reorder references.
 */

/*
 * SECTION 3
 * Object and Record: known named keys
 *
 * A normal object is appropriate when properties have different meanings and
 * a known shape, such as one SecurityEvent.
 *
 * Record<Key, Value> is a TypeScript type for an object whose allowed keys map
 * to one value type. It does not create a new runtime collection.
 */

const investigationMinutesBySeverity: Record<
    EventSeverity,
    number
> = {
    LOW: 240,
    MEDIUM: 60,
    HIGH: 15,
};

console.log(
    'High-severity investigation target:',
    investigationMinutesBySeverity.HIGH,
);

/*
 * Every EventSeverity key is required. A missing HIGH entry or an unsupported
 * CRITICAL entry would fail TypeScript checking on this object literal.
 */

/*
 * SECTION 4
 * Object.keys, Object.values, and Object.entries
 */

const severityNames = Object.keys(
    investigationMinutesBySeverity,
);

const investigationTargets = Object.values(
    investigationMinutesBySeverity,
);

const severityTargetEntries = Object.entries(
    investigationMinutesBySeverity,
);

console.log('Severity keys:', severityNames);
console.log('Investigation targets:', investigationTargets);

for (const [severityName, minutes] of severityTargetEntries) {
    console.log(
        `${severityName} must be investigated within ${minutes} minutes`,
    );
}

/*
 * Object.keys returns keys, Object.values returns values, and Object.entries
 * returns [key, value] pairs. JavaScript returns object keys as strings at
 * runtime, so do not assume that every value from Object.keys automatically
 * keeps a narrower TypeScript key union.
 */

/*
 * SECTION 5
 * Map: dynamic key-to-value relationships
 *
 * Use Map when keys are discovered at runtime, when keys are not limited to
 * strings, or when collection operations such as size, has, and delete express
 * the problem more clearly than an object.
 */

const failedLoginCountByIp = new Map<string, number>();

for (const event of securityEvents) {
    if (event.outcome !== 'FAILURE') {
        continue;
    }

    const previousCount =
        failedLoginCountByIp.get(event.sourceIp) ?? 0;

    failedLoginCountByIp.set(
        event.sourceIp,
        previousCount + 1,
    );
}

console.log(
    'Failures from 203.0.113.10:',
    failedLoginCountByIp.get('203.0.113.10'),
);

console.log(
    'Known failing IP:',
    failedLoginCountByIp.has('203.0.113.10'),
);

console.log(
    'Number of IPs with failures:',
    failedLoginCountByIp.size,
);

for (const [sourceIp, failureCount] of failedLoginCountByIp) {
    console.log(sourceIp, 'failure count:', failureCount);
}

/*
 * Map.get returns number | undefined here because the requested key may not
 * exist. Nullish coalescing supplies zero only because zero is the correct
 * domain starting point for this counter.
 *
 * Map.has answers whether the key exists. This is important when undefined is
 * itself an allowed stored value and get alone cannot distinguish "missing"
 * from "present with undefined".
 */

const temporaryCounters = new Map(failedLoginCountByIp);

temporaryCounters.delete('203.0.113.10');

console.log(
    'IP remains in temporary counters:',
    temporaryCounters.has('203.0.113.10'),
);

/*
 * const prevents assigning a different Map to the variable. It does not make
 * the existing Map immutable. set, delete, and clear can still change it.
 */

/*
 * SECTION 6
 * Set: unique values
 *
 * Use Set when membership and uniqueness are the main questions. A Set does
 * not store a count for each value; use Map when the value needs associated
 * information such as a counter.
 */

const uniqueSourceIps = new Set(
    securityEvents.map((event) => event.sourceIp),
);

console.log('Unique source IP count:', uniqueSourceIps.size);

uniqueSourceIps.add('192.0.2.44');

console.log(
    'Contains 192.0.2.44:',
    uniqueSourceIps.has('192.0.2.44'),
);

uniqueSourceIps.delete('192.0.2.44');

const uniqueSourceIpArray = [...uniqueSourceIps];

console.log('Unique IP array:', uniqueSourceIpArray);

/*
 * An array can be passed to the Set constructor to remove duplicate primitive
 * values. Spread converts the Set back into an array when array operations or
 * JSON-compatible data are needed.
 */

/*
 * SECTION 7
 * Object identity inside Set and Map
 */

const firstReference = { id: 'event-201' };
const secondReference = { id: 'event-201' };

const eventReferences = new Set([
    firstReference,
    secondReference,
]);

console.log(
    'Different objects with equal fields:',
    eventReferences.size,
); // 2

/*
 * Objects are compared by identity, not by matching property content. For
 * event-ID uniqueness, store the ID strings in a Set rather than separate
 * objects that happen to contain the same ID.
 */

/*
 * APPLICATION
 * Summarise failed authentication events
 */

type FailedLoginSummary = {
    readonly countsByIp: ReadonlyMap<string, number>;
    readonly targetedUsernames: ReadonlySet<string>;
};

function summariseFailedLogins(
    events: readonly SecurityEvent[],
): FailedLoginSummary {
    const countsByIp = new Map<string, number>();
    const targetedUsernames = new Set<string>();

    for (const event of events) {
        if (event.outcome !== 'FAILURE') {
            continue;
        }

        const currentCount =
            countsByIp.get(event.sourceIp) ?? 0;

        countsByIp.set(event.sourceIp, currentCount + 1);
        targetedUsernames.add(event.username);
    }

    return {
        countsByIp,
        targetedUsernames,
    };
}

const failedLoginSummary =
    summariseFailedLogins(securityEvents);

console.log(
    'Summary count for repeated IP:',
    failedLoginSummary.countsByIp.get('203.0.113.10'),
);

console.log(
    'Targeted usernames:',
    [...failedLoginSummary.targetedUsernames],
);

/*
 * ReadonlyMap and ReadonlySet prevent callers from using mutating methods
 * through the returned contract. The function can still build its result with
 * mutable Map and Set instances internally.
 */

/*
 * COLLECTION CHOICE
 *
 * Array:
 * Ordered values; duplicates are allowed. Use for events, findings, test cases,
 * and API result lists.
 *
 * Object:
 * One value with known named properties that may have different types.
 *
 * Record<K, V>:
 * A TypeScript object type for known keys that share one value type. It is not
 * a runtime Map.
 *
 * Map<K, V>:
 * Dynamic runtime key-to-value relationships with get, set, has, delete, size,
 * and direct iteration.
 *
 * Set<T>:
 * Unique runtime values where membership matters more than position.
 */

/*
 * FINAL SUMMARY
 *
 * Choose a collection from the data relationship, not from familiarity.
 * Preserve ordered evidence in arrays, model fixed shapes with objects, use
 * Record for typed known-key mappings, use Map for dynamic runtime mappings,
 * and use Set for unique membership.
 *
 * Copy an array before calling sort when the original order must remain
 * unchanged. Remember that const and readonly types do not deep-freeze runtime
 * values.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: How do Array and Set differ?
 * A: Array preserves an ordered sequence and allows duplicates. Set stores
 *    unique values and is designed for membership checks.
 *
 * Q: How do Record and Map differ?
 * A: Record is a TypeScript type describing object properties. Map is a runtime
 *    collection with operations such as get, set, has, delete, and size.
 *
 * Q: Why can Map.get return undefined?
 * A: The requested key may not exist. Map.has can distinguish key absence when
 *    undefined is also a permitted stored value.
 *
 * Q: Why copy an array before sort?
 * A: sort mutates its receiver. Sorting a copied array preserves the source
 *    order, which is often important for test evidence and event timelines.
 *
 * Q: Does Set compare object properties?
 * A: No. Two separate objects remain different Set values even when their
 *    properties contain equal data.
 */
