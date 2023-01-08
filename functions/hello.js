// to access hello function:
// domain/.netlify/functions/hello
// in the browser url address bar: http://localhost:8888/.netlify/functions/hello
const items = [
    { id: 1, name: "tom" },
    { id: 2, name: "jerry" }
];

// node code
exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(items)
    }
}