// format the price of each product
export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number / 100);
}

// retrieve unique values of categories, company and colors for each product
export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type]);
    // since colors in an array, unlike, categories and companies which are properties in an object by default,
    // we need to flatten them.
    if (type === 'colors')
        unique = unique.flat();
    return ['all', ...new Set(unique)];
}
