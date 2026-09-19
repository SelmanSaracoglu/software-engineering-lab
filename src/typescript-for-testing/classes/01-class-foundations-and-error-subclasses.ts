/*
 * CLASS FOUNDATIONS AND ERROR SUBCLASSES
 *
 * A class defines how related objects are created and which operations they
 * provide. Classes are useful when data and behaviour form a meaningful unit or
 * when a framework expects class instances. They should not replace simple
 * object types and functions without a reason.
 *
 * This lesson covers:
 * - class declarations and instances
 * - constructors and properties
 * - methods
 * - public, private, and readonly members
 * - class identity with instanceof
 * - extending Error for domain-specific failures
 */

/*
 * SECTION 1
 * Class, constructor, and instance
 */

class StatusExpectation {
    readonly expectedStatus: number;

    constructor(expectedStatus: number) {
        this.expectedStatus = expectedStatus;
    }

    matches(actualStatus: number): boolean {
        return actualStatus === this.expectedStatus;
    }
}

const expectsOk = new StatusExpectation(200);
const expectsCreated = new StatusExpectation(201);

console.log('200 matches OK:', expectsOk.matches(200));
console.log(
    '200 matches created:',
    expectsCreated.matches(200),
);

/*
 * new creates an instance and calls the constructor. this refers to the current
 * instance. Each instance stores its own expectedStatus value.
 */

/*
 * SECTION 2
 * Parameter properties
 *
 * TypeScript can declare and initialise a property directly in a constructor
 * parameter. This shorter form has the same purpose as the explicit property
 * and assignment above.
 */

class ResponseTimeExpectation {
    constructor(
        public readonly maximumResponseTimeMs: number,
    ) {}

    matches(actualResponseTimeMs: number): boolean {
        return actualResponseTimeMs <=
            this.maximumResponseTimeMs;
    }
}

const defaultResponseTimeExpectation =
    new ResponseTimeExpectation(1000);

console.log(
    '850 is fast enough:',
    defaultResponseTimeExpectation.matches(850),
);

/*
 * public means callers may read the property. readonly prevents assignment
 * after construction through checked TypeScript code.
 */

// defaultResponseTimeExpectation.maximumResponseTimeMs = 500;

/*
 * SECTION 3
 * Private state
 */

class AttemptCounter {
    private count = 0;

    increment(): number {
        this.count = this.count + 1;

        return this.count;
    }

    current(): number {
        return this.count;
    }
}

const loginAttemptCounter = new AttemptCounter();

console.log('Attempt:', loginAttemptCounter.increment());
console.log('Attempt:', loginAttemptCounter.increment());
console.log('Current count:', loginAttemptCounter.current());

// console.log(loginAttemptCounter.count);

/*
 * private restricts direct access in TypeScript. Callers use the public methods
 * that define permitted operations. This TypeScript private modifier is a
 * compile-time restriction; JavaScript #private fields provide different
 * runtime privacy and are outside this foundation lesson.
 */

/*
 * SECTION 4
 * Instances and instanceof
 */

console.log(
    'Counter is AttemptCounter:',
    loginAttemptCounter instanceof AttemptCounter,
);

console.log(
    'Expectation is StatusExpectation:',
    expectsOk instanceof StatusExpectation,
);

/*
 * instanceof performs a runtime prototype-chain check. Interfaces and type
 * aliases cannot be used with instanceof because they do not exist at runtime.
 */

/*
 * APPLICATION
 * Use a custom Error subclass for a status expectation
 */

class UnexpectedStatusError extends Error {
    constructor(
        public readonly actualStatus: number,
        public readonly expectedStatus: number,
    ) {
        super(
            `Expected status ${expectedStatus}, received ${actualStatus}`,
        );

        this.name = 'UnexpectedStatusError';
    }
}

function requireExpectedStatus(
    actualStatus: number,
    expectedStatus: number,
): void {
    if (actualStatus !== expectedStatus) {
        throw new UnexpectedStatusError(
            actualStatus,
            expectedStatus,
        );
    }
}

try {
    requireExpectedStatus(500, 200);
} catch (error: unknown) {
    if (error instanceof UnexpectedStatusError) {
        console.log('Status error:', error.message);
        console.log('Actual status:', error.actualStatus);
    } else {
        throw error;
    }
}

/*
 * The custom error carries structured context and remains an Error. A caller
 * can distinguish it with instanceof without parsing the message string.
 */

/*
 * SECTION 6
 * Class or plain object and function?
 *
 * Prefer a class when:
 * - instances own meaningful behaviour or private state
 * - runtime identity with instanceof matters
 * - a framework requires a class
 *
 * Prefer plain data plus functions when:
 * - the value is mainly transported or serialised
 * - no instance lifecycle or identity is needed
 * - independent pure functions express the operations clearly
 */

type PlainStatusExpectation = {
    expectedStatus: number;
};

function matchesPlainExpectation(
    expectation: PlainStatusExpectation,
    actualStatus: number,
): boolean {
    return expectation.expectedStatus === actualStatus;
}

console.log(
    'Plain expectation matches:',
    matchesPlainExpectation(
        { expectedStatus: 204 },
        204,
    ),
);

/*
 * FINAL SUMMARY
 *
 * Class:
 * A runtime definition used to construct instances with properties and methods.
 *
 * Constructor:
 * Runs during new and initialises the instance.
 *
 * Method:
 * A function accessed through an instance.
 *
 * private:
 * Restricts direct member access in checked TypeScript code.
 *
 * instanceof:
 * Performs a runtime class/prototype identity check.
 *
 * Error subclass:
 * Represents a specific failure with structured context and runtime identity.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: What does a constructor do?
 * A: It runs when new creates an instance and initialises that instance's
 *    properties.
 *
 * Q: Why use a custom Error subclass?
 * A: It gives a failure a specific runtime identity and can carry structured
 *    context without forcing callers to parse a message.
 *
 * Q: Can an interface be checked with instanceof?
 * A: No. Interfaces are removed at runtime; instanceof requires a runtime
 *    constructor and prototype relationship.
 *
 * Q: When is a plain object preferable to a class?
 * A: When the value mainly represents serialisable data and separate functions
 *    express the required behaviour without instance state or identity.
 */
