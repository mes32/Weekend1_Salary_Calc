// Simple test harness for file 'client.js'
function client_test_js() {
    let totalTests = 0;
    let totalPass = 0;

    // Running unit tests and logging results to console
    logTestStart();
    // metaTests();
    unitTest('formatAsUSD(53)', '53.00');
    unitTest('formatAsUSD(1.7)', '1.70');
    unitTest('formatAsUSD(0)', '0.00');
    unitTest('formatAsUSD(-50.55)', '-50.55');
    unitTest('formatAsUSD(25000.333)', '25,000.33');
    logTestSummary();

    // Run a single unit test
    function unitTest(expressionStr, expected, expectedError) {
        totalTests++;
        try {
            let result = eval(expressionStr);

            if (expectedError) {
                // [Failed] Exception was expected, but none was thrown
                logFailOnException(expressionStr, null, expectedError);
                return false;
            } else if (result !== expected && (!isNaN(result) || !isNaN(expected))) {
                // [Failed] Expected result was not produced
                // Note: Requires special check for NaN, since NaN != NaN
                logFail(expressionStr, expected, result);
                return false;
            }
        } catch (actualError) {
            if (!errorsEqual(actualError, expectedError)) {
                // [Failed] Actual exception does not match expected
                logFailOnException(expressionStr, expectedError, actualError);
                return false;
            }
        }
        // [Passed]
        totalPass++;
        return true;
    }

    // Checks if two error ojects have the same 'name' and 'message'
    function errorsEqual(err1, err2) {
        // TODO: The following 'instanceof' check seems like it should work, but
        // causes some error inside jQuery that I can't figure out.

        // if (!(err1 instanceof Error) || !(err2 instanceof Error)) {
        //     throw 'errorsEqual cannot run with non-Error inputs';
        // }
        if (err1.name === err2.name) {
            if (err1.message === err2.message) {
                return true;
            }
        }
        return false;
    }

    // Produces a nicely formatted summary of a failed unit test and logs it to 
    // the console.
    function logFail(expressionStr, expected, result) {
        console.log('Failed unit test');
        console.log('    ---');
        console.log('    expression: ' + expressionStr);
        console.log('    expected: ' + expected);
        console.log('    actual: ' + result);
        console.log('    ...');
    }

    // Produces a nicely formatted summary of a failed unit test (involving an 
    // exception) and logs it to the console.
    function logFailOnException(expressionStr, expectedException, resultException) {
        console.log('Failed unit test on exception');
        console.log('    ---');
        console.log('    expression: ' + expressionStr);
        console.log('    expected throws: ' + expectedException);
        console.log('    actual throws: ' + resultException);
        console.log('    ...');
    }

    // Log the start of the unit tests with some nicely formated text
    function logTestStart() {
        console.log('# Start unit testing');
    }

    // Log results of the unit tests along with the number of tests 
    // passed/failed.
    function logTestSummary() {
        console.log('');
        console.log(`# Results for ${totalTests} tests`);
        console.log(`${totalPass} pass`);
        console.log(`${totalTests - totalPass} fail`);
    }

    // Attempts to test the unitTest function
    function metaTests() {
        unitTest('true', true);
        unitTest('true', true, undefined);
        unitTest('false', false);
        unitTest('false', false, undefined);
        unitTest('\'true\'', 'true');
        unitTest('1 + 1', 2);
        unitTest('1 + 1 // Should fail', 5); // Should fail
        unitTest('1 + 1 // Should fail', 2, 'Some exception'); // Should fail
        unitTest('5 / 0', Infinity);
        unitTest('parseInt(\'90.45\')', 90);
        unitTest('NaN', NaN);
        unitTest('parseInt(\'foobar\')', NaN);
        unitTest('throw \'Some exception\'', null, 'Some exception');
        unitTest('throw new Error(\'Some exception\')', null, new Error('Some exception'));
        unitTest('adddlert()', null, new ReferenceError('adddlert is not defined'));
    }
}