const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MyHtmlWebpackPlugin = require("./myHtmlWebpackPlugin");
const projects = require("./projects.config");

console.log(process.env.PROJECT);
const needPack = process.env.PROJECT;
const filteredProjects = projects.filter((project) => {
    if (needPack === "all") {
        return true;
    }
    return project.projectName === needPack;
});
const getEntries = () => {
    const entry = {};
    filteredProjects.map(({ projectName }) => {
        entry[`${projectName}/main`] = path.resolve(
            __dirname,
            "../src/index.tsx"
        );
    });
    console.log(entry);
    return entry;
};
const HtmlWebpackPlugins = () => {
    const plugins = [];
    filteredProjects.map(({ projectName, title }) => {
        plugins.push(
            new HtmlWebpackPlugin({
                title,
                template: path.resolve(__dirname, "../public/index.html"),
                filename: `${projectName}/index.html`,
                publicPath: "./",
                chunks: [`${projectName}/main`],
            })
        );
    });
    plugins.push(
        new MyHtmlWebpackPlugin({
            options: {
                test: 1,
            },
        })
    );
    return plugins;
};

module.exports = {
    entry: getEntries(),
    output: {
        filename: "[name].bundle.[hash:4].js",
        path: path.resolve(__dirname, "../dist"),
    },
    module: {
        rules: [{ test: /\.(t|j)sx$/, use: "babel-loader" }],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin(),
        new HardSourceWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    "You application is running here http://localhost:3000",
                ],
                notes: [
                    "Some additionnal notes to be displayed unpon successful compilation",
                ],
            },
            onErrors: function (severity, errors) {
                // You can listen to errors transformed and prioritized by the plugin
                // severity can be 'error' or 'warning'
                // node-notifier
            },
            // should the console be cleared between each compilation?
            // default is true
            clearConsole: true,

            // add formatters and transformers (see below)
            additionalFormatters: [],
            additionalTransformers: [],
        }),
    ].concat(HtmlWebpackPlugins()),
};
