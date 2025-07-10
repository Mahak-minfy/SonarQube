function add(a, b) {
    return a + b;
}

// Export the function so other files (like your tests) can import it
module.exports = add;

// If you still want to log it, do it like this:
if (require.main === module) {
    console.log(add(5, 3));
}
