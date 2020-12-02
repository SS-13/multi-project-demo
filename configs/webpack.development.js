const { merge } = require("webpack-merge");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const setIterm2Badge = require("set-iterm2-badge");
const setTitle = require("node-bash-title");
const common = require("./webpack.common");
const smp = new SpeedMeasurePlugin(); // 会导致htmlWebpackPlugin的hook监听失效，暂时不用
// console.log(common);

setIterm2Badge(`测试环境打包：${process.env.PROJECT}`);
setTitle(`打包测试环境：${process.env.PROJECT}`);
module.exports = merge(common, {
    mode: "development",
});
