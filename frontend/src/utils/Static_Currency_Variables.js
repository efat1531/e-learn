// Static_Currency_Variables.js

export const CURRENCY_DATA = [
    {
        "name": "United States Dollar",
        "code": "USD",
        "symbol": "$",
    },
    {
        "name": "Euro",
        "code": "EUR",
        "symbol": "€",
    },
    {
        "name": "Bangladeshi Taka",
        "code": "BDT",
        "symbol": "৳",
    }
];

export const CURRENCY_LIST = CURRENCY_DATA.reduce((acc, currency) => {
    acc[currency.code] = currency;
    return acc;
}, {});

export const CURRENCY_SYMBOL = (currencyName) => {
    const currency = CURRENCY_DATA.find(currency => currency.name === currencyName);
    return currency ? currency.symbol : null;
};

export const CURRENCY_CODE = (currencyName) => {
    const currency = CURRENCY_DATA.find(currency => currency.name === currencyName);
    return currency ? currency.code.toLowerCase() : null;
};