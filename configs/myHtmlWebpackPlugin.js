const HtmlWebpackPlugin = require("html-webpack-plugin");
const projects = require("./projects.config");

const replacePath = (paths) => {
    projectRegTxt = [];
    projects.map((item) => {
        projectRegTxt.push(item.projectName);
    });
    var regex = new RegExp(`\/(${projectRegTxt.join("|")})`, "g");
    // console.log(regex);
    if (typeof paths === "string") {
        return paths.replace(regex, "");
    }
    return paths.map((text) => {
        return text.replace(regex, "");
    });
};

class MyHtmlWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap("MyHtmlWebpackPlugin", (compilation) => {
            HtmlWebpackPlugin.getHooks(
                compilation
            ).beforeAssetTagGeneration.tapAsync(
                "MyHtmlWebpackPlugin", // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    const { assets, plugin } = data;
                    data.assets.js = replacePath(assets.js);
                    data.plugin.assetJson = replacePath(plugin.assetJson);

                    // console.log(data.assets.js, data.plugin.assetJson);
                    cb(null, data);
                }
            );
        });
    }
}

module.exports = MyHtmlWebpackPlugin;
