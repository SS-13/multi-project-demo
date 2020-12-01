const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "../src/index.tsx"),
    module: {
        rules: [{ test: /\.(t|j)sx$/, use: "babel-loader" }],
    },
};
