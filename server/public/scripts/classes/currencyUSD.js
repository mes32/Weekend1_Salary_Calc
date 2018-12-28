// Class representing currency in US dollars
class CurrencyUSD {
    constructor(inputString) {
        const amount = parseFloat(inputString);
        if (typeof (amount) !== 'number' || !isFinite(amount)) {
            throw new CurrencyUSDError('input must parse to float');
        }
        this.amount = amount;
    }

    // Add a currency object to this object (using arithmetic)
    add(additional) {
        this.amount += additional.amount;
    }

    // Format the current amount as a string for display purposes
    format(hasDollarSign) {
        const formattedStr = this.amount.toLocaleString("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        if (hasDollarSign) {
            return '$' + formattedStr;
        } else {
            return formattedStr;
        }
    }

    // Override toString() using method this.format(false)
    toString() {
        this.format(false);
    }
}

// Error class for CurrencyUSD
class CurrencyUSDError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CurrencyUSDError';
    }
}