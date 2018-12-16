// Simple test harness for file 'client.js'
function client_test_js() {
    let totalTests = 0;
    let totalPass = 0;

    // Running unit tests and logging results to console
    logTestStart();
    unitTest(1 + 1, 2);
    unitTest(1 + 1, 5);
    unitTest(formatAsUSD(25000.333), '25,000.33');
    logTestSummary();

    // Run a single unit test
    function unitTest(input, answer) {
        // TODO: Maybe this should also be able to test exceptions
        totalTests++;
        if (input === answer) {
            totalPass++;
            return true;
        } else {
            // TODO: This should print something more descriptive for failed tests
            console.log('Failed unit test.');
            return false;
        }
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
}