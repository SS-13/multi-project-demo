const { merge } = require("webpack-merge");
const common = require("./webpack.common");
console.log(common);
module.exports = merge(common, {
    mode: "development",
});
