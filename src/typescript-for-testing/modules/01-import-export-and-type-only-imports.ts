/*
 * IMPORT, EXPORT AND TYPE-ONLY IMPORTS
 *
 * A module is a file with its own scope that explicitly shares selected values
 * or types. Modules let test contracts and helpers be reused without placing
 * every name in one global file.
 *
 * This lesson uses two small support modules so every import is real and
 * executable. It covers:
 * - named exports
 * - relative value imports
 * - type-only imports
 * - package imports
 * - .js specifiers with NodeNext TypeScript
 * - module boundaries and side effects
 */

import {
    DEFAULT_TIMEOUT_MS,
    createStatusResult,
} from './support/test-helpers.js';

import type {
    StatusResult,
    TestConfiguration,
} from './support/test-contracts.js';

import {
    version as reactVersion,
} from 'react';

/*
 * SECTION 1
 * Named value exports and imports
 *
 * test-helpers.ts exports a constant and a function. This file imports those
 * runtime values by their exported names.
 */

const loginResult = createStatusResult(200, 200);

console.log('Login result:', loginResult);
console.log('Default timeout:', DEFAULT_TIMEOUT_MS);

/*
 * A value import remains in executable JavaScript because the program needs
 * the constant and function at runtime.
 */

/*
 * SECTION 2
 * Type-only imports
 *
 * import type marks imports used only by TypeScript. They are removed from the
 * emitted JavaScript and cannot be used as runtime values.
 */

const storedResult: StatusResult = {
    actualStatus: 201,
    expectedStatus: 201,
    passed: true,
};

const configuration: TestConfiguration = {
    endpoint: '/api/orders',
    expectedStatus: 201,
};

console.log('Stored result:', storedResult);
console.log('Configuration:', configuration);

/*
 * StatusResult and TestConfiguration describe values. They do not create
 * runtime objects and cannot be logged directly.
 */

/*
 * SECTION 3
 * Relative imports
 *
 * A path beginning with ./ or ../ resolves relative to the importing file.
 * This repository uses module: nodenext and verbatimModuleSyntax. The source
 * import uses a .js extension because the emitted runtime module will be .js;
 * TypeScript resolves it to the corresponding .ts source while compiling.
 */

console.log(
    'Configured request:',
    configuration.endpoint,
    configuration.expectedStatus,
);

/*
 * SECTION 4
 * Package imports
 *
 * A specifier without ./ or ../ refers to an installed package. react above is
 * resolved from the project's dependencies.
 */

console.log('Installed React version:', reactVersion);

/*
 * Import only packages declared by the project. A successful editor suggestion
 * does not mean a dependency is installed or appropriate.
 */

/*
 * SECTION 5
 * Module scope
 *
 * Names declared in a module are local unless exported. Another file cannot
 * import loginResult because this file does not export it.
 *
 * Export the smallest stable surface that another module genuinely needs.
 * Internal calculation details should remain private to their file.
 */

/*
 * SECTION 6
 * Importing a module may run top-level code
 *
 * A module's top-level runtime statements execute when the module is loaded for
 * the first time. Support modules should avoid surprising side effects such as
 * modifying global state merely because they were imported.
 *
 * test-helpers.ts only declares exports, so importing it does not execute a
 * network request or change shared test state.
 */

/*
 * PRACTICE
 */

function createConfiguredResult(
    actualStatus: number,
    testConfiguration: TestConfiguration,
): StatusResult {
    return createStatusResult(
        actualStatus,
        testConfiguration.expectedStatus,
    );
}

console.log(
    'Configured result:',
    createConfiguredResult(201, configuration),
);

/*
 * FINAL SUMMARY
 *
 * Export:
 * Makes a selected value or type available to other modules.
 *
 * Value import:
 * Loads a runtime value such as a function or constant.
 *
 * import type:
 * Imports only a TypeScript type and is removed from runtime JavaScript.
 *
 * Relative import:
 * Uses ./ or ../ to identify another project module.
 *
 * Package import:
 * Resolves a declared installed dependency by package name.
 *
 * Module scope:
 * File-local by default; only explicit exports form the public surface.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: Why use import type?
 * A: It communicates that an import exists only for checking and guarantees it
 *    is removed from runtime JavaScript.
 *
 * Q: Why does a NodeNext TypeScript relative import use .js in source?
 * A: The runtime executes emitted .js modules. TypeScript maps the .js
 *    specifier to the corresponding .ts source during development.
 *
 * Q: What is the difference between a relative and package import?
 * A: Relative imports begin with ./ or ../ and address project files. Package
 *    imports resolve dependencies by package name.
 *
 * Q: Can importing a module have side effects?
 * A: Yes. Its top-level runtime statements execute when loaded, so reusable
 *    modules should avoid surprising work at import time.
 */
