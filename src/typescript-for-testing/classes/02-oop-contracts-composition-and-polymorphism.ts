/*
 * OOP CONTRACTS, COMPOSITION AND POLYMORPHISM
 *
 * Object-oriented programming is a way to organise data and behaviour around
 * collaborating objects. TypeScript is a multi-paradigm language: classes are
 * useful tools, but plain objects and functions often remain the simpler
 * choice.
 *
 * For testing and security automation, the practical value of OOP is the
 * ability to hide internal state, depend on clear contracts, replace external
 * systems with controlled fakes, and extend behaviour without rewriting the
 * coordinating code.
 *
 * This lesson covers:
 * - encapsulation
 * - abstraction with interfaces and abstract classes
 * - implements, extends, and super
 * - polymorphism through a shared contract
 * - composition and constructor dependency injection
 * - choosing composition or inheritance
 * - replacing an external dependency with an in-memory fake
 */

type SecurityEvent = {
    readonly id: string;
    readonly type: 'LOGIN_SUCCEEDED' | 'LOGIN_FAILED';
    readonly sourceIp: string;
    readonly severity: 'LOW' | 'MEDIUM' | 'HIGH';
};

type DetectionFinding = {
    readonly ruleName: string;
    readonly summary: string;
};

const exampleEvents: readonly SecurityEvent[] = [
    {
        id: 'event-301',
        type: 'LOGIN_FAILED',
        sourceIp: '203.0.113.20',
        severity: 'MEDIUM',
    },
    {
        id: 'event-302',
        type: 'LOGIN_FAILED',
        sourceIp: '203.0.113.20',
        severity: 'HIGH',
    },
    {
        id: 'event-303',
        type: 'LOGIN_SUCCEEDED',
        sourceIp: '198.51.100.40',
        severity: 'LOW',
    },
];

/*
 * SECTION 1
 * An interface as a behaviour contract
 *
 * This interface describes what a detection rule can do. It does not describe
 * how a particular rule performs its analysis.
 */

interface DetectionRule {
    readonly name: string;

    evaluate(
        events: readonly SecurityEvent[],
    ): readonly DetectionFinding[];
}

/*
 * implements asks TypeScript to verify that the class fulfils the interface.
 * The interface is removed during compilation; it does not add methods or
 * create runtime identity.
 */

class HighSeverityEventRule implements DetectionRule {
    readonly name = 'high-severity-event';

    evaluate(
        events: readonly SecurityEvent[],
    ): readonly DetectionFinding[] {
        const findings: DetectionFinding[] = [];

        for (const event of events) {
            if (event.severity !== 'HIGH') {
                continue;
            }

            findings.push({
                ruleName: this.name,
                summary: `High-severity event: ${event.id}`,
            });
        }

        return findings;
    }
}

class FailedLoginThresholdRule implements DetectionRule {
    readonly name = 'failed-login-threshold';

    constructor(private readonly threshold: number) {
        if (threshold < 1) {
            throw new Error('Threshold must be at least one');
        }
    }

    evaluate(
        events: readonly SecurityEvent[],
    ): readonly DetectionFinding[] {
        const failureCountsByIp = new Map<string, number>();

        for (const event of events) {
            if (event.type !== 'LOGIN_FAILED') {
                continue;
            }

            const currentCount =
                failureCountsByIp.get(event.sourceIp) ?? 0;

            failureCountsByIp.set(
                event.sourceIp,
                currentCount + 1,
            );
        }

        const findings: DetectionFinding[] = [];

        for (const [sourceIp, failureCount] of failureCountsByIp) {
            if (failureCount < this.threshold) {
                continue;
            }

            findings.push({
                ruleName: this.name,
                summary:
                    `${failureCount} failed logins from ${sourceIp}`,
            });
        }

        return findings;
    }
}

/*
 * Both classes satisfy DetectionRule, but each class owns a different
 * algorithm. The threshold is private because callers may choose it during
 * construction but must not silently change the rule later. This is
 * encapsulation: internal state is protected behind a deliberate public API.
 */

/*
 * SECTION 2
 * Polymorphism
 *
 * Polymorphism means that coordinating code can work through one contract
 * while different objects provide different implementations.
 */

const detectionRules: readonly DetectionRule[] = [
    new HighSeverityEventRule(),
    new FailedLoginThresholdRule(2),
];

for (const rule of detectionRules) {
    console.log(
        'Rule result:',
        rule.name,
        rule.evaluate(exampleEvents),
    );
}

/*
 * The loop does not ask which concrete class it received. It calls name and
 * evaluate because every value fulfils DetectionRule. A new rule can be added
 * without changing the loop.
 */

/*
 * SECTION 3
 * Abstract class, inheritance, and super
 *
 * An abstract class can define a shared base for related runtime objects. It
 * may provide state and implemented methods while requiring subclasses to
 * implement other methods.
 */

abstract class SecurityEventSource {
    constructor(public readonly sourceName: string) {}

    describe(): string {
        return `Security event source: ${this.sourceName}`;
    }

    abstract loadEvents(): Promise<
        readonly SecurityEvent[]
    >;
}

class InMemorySecurityEventSource extends SecurityEventSource {
    constructor(
        sourceName: string,
        private readonly events: readonly SecurityEvent[],
    ) {
        super(sourceName);
    }

    async loadEvents(): Promise<readonly SecurityEvent[]> {
        return this.events;
    }
}

const inMemorySource = new InMemorySecurityEventSource(
    'controlled-fixture',
    exampleEvents,
);

console.log(inMemorySource.describe());

/*
 * extends creates the inheritance relationship. super calls the base
 * constructor so it can initialise sourceName. SecurityEventSource cannot be
 * instantiated directly because it leaves loadEvents abstract.
 *
 * This inheritance has a clear "is-a" relationship: an in-memory event source
 * is one kind of SecurityEventSource.
 */

/*
 * SECTION 4
 * Composition and constructor dependency injection
 *
 * Composition means one object uses other objects to do its work. The
 * DetectionEngine has an event source and has detection rules; it is not a
 * specialised kind of either dependency.
 */

class DetectionEngine {
    constructor(
        private readonly eventSource: SecurityEventSource,
        private readonly rules: readonly DetectionRule[],
    ) {}

    async run(): Promise<readonly DetectionFinding[]> {
        const events = await this.eventSource.loadEvents();
        const findings: DetectionFinding[] = [];

        for (const rule of this.rules) {
            findings.push(...rule.evaluate(events));
        }

        return findings;
    }
}

const detectionEngine = new DetectionEngine(
    inMemorySource,
    detectionRules,
);

const findings = await detectionEngine.run();

console.log('Detection findings:', findings);
console.log('Expected finding count:', findings.length === 2);

/*
 * Passing dependencies through the constructor is dependency injection. The
 * engine does not create a specific API client or read a real file internally.
 * Its caller decides which event source and rules it receives.
 */

/*
 * SECTION 5
 * Controlled fake for testing
 */

const emptySource = new InMemorySecurityEventSource(
    'empty-fixture',
    [],
);

const engineWithNoEvents = new DetectionEngine(
    emptySource,
    detectionRules,
);

const emptyFindings = await engineWithNoEvents.run();

console.log(
    'No events produce no findings:',
    emptyFindings.length === 0,
);

/*
 * InMemorySecurityEventSource acts as a fake external dependency. It gives the
 * engine deterministic input without network access, credentials, unavailable
 * services, or changing production data. The same design can later support an
 * API-backed or file-backed source.
 */

/*
 * SECTION 6
 * Composition or inheritance?
 *
 * Prefer composition when:
 * - one object uses another object
 * - a dependency should be replaceable for tests or different environments
 * - behaviours need to be combined independently
 *
 * Consider inheritance when:
 * - a genuine "is-a" relationship exists
 * - subclasses must share base state or implemented behaviour
 * - callers should treat every subclass as the base abstraction
 *
 * Do not create an inheritance hierarchy only to reuse a few lines. A function
 * or a composed helper is often clearer.
 */

/*
 * OOP CONCEPTS IN THIS EXAMPLE
 *
 * Encapsulation:
 * FailedLoginThresholdRule protects its threshold from later mutation.
 *
 * Abstraction:
 * DetectionRule and SecurityEventSource expose required capabilities without
 * exposing every implementation detail.
 *
 * Inheritance:
 * InMemorySecurityEventSource extends a meaningful event-source base.
 *
 * Polymorphism:
 * DetectionEngine evaluates different rule classes through DetectionRule.
 *
 * Composition:
 * DetectionEngine receives and coordinates an event source and a list of
 * rules.
 */

/*
 * FINAL SUMMARY
 *
 * OOP is valuable when objects have meaningful state, behaviour, runtime
 * identity, or replaceable implementations. Interfaces define compile-time
 * contracts. Abstract classes can also provide shared runtime behaviour.
 *
 * For testable automation, depend on a small contract and inject the concrete
 * dependency. Prefer composition for collaborating components and use
 * inheritance only when the subtype relationship is genuine.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: What is encapsulation?
 * A: It protects internal state behind a deliberate public API so callers
 *    cannot freely bypass the object's rules.
 *
 * Q: What does implements do?
 * A: It asks TypeScript to check that a class fulfils an interface. It does not
 *    copy an implementation into the class or create runtime identity.
 *
 * Q: What is polymorphism in this example?
 * A: DetectionEngine can use different rule classes through the shared
 *    DetectionRule contract without knowing their concrete class names.
 *
 * Q: How do an interface and an abstract class differ?
 * A: An interface is a compile-time contract and disappears at runtime. An
 *    abstract class exists at runtime and may provide state and implementation.
 *
 * Q: Why does dependency injection improve testability?
 * A: The caller can replace an external dependency with a deterministic fake
 *    without changing the class that coordinates the work.
 *
 * Q: When is composition usually preferable to inheritance?
 * A: When an object uses replaceable collaborators rather than representing a
 *    true specialised form of a base class.
 */
