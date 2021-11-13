const path = require("path");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const demoHttpServer = require("./server/http");

module.exports = {
  entry: {
    lib: {
      import: "./src/Loader.ts",
      filename: "basiscore.form-maker.js",
      library: {
        name: "formMaker",
        type: "assign",
      },
    },
    component: {
      import: "./src/ComponentLoader.ts",
      filename: "basiscore.form-maker.component.js",
      library: {
        name: "bc",
        type: "assign",
      },
    },
  },
  devServer: {
    static: path.resolve(__dirname, "wwwroot"),
    onBeforeSetupMiddleware: function (server) {
      server.app.use("/server", demoHttpServer);
    },
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/i,
        type: "asset/inline",
      },
      {
        test: /\.html$/i,
        type: "asset/source",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".png"], // there's a dot missing
  },
  plugins: [
    new CircularDependencyPlugin({
      // `onStart` is called before the cycle detection starts
      onStart({ compilation }) {
        console.log("start detecting webpack modules cycles");
      },
      // `onDetected` is called for each module that is cyclical
      onDetected({ module: webpackModuleRecord, paths, compilation }) {
        // `paths` will be an Array of the relative module paths that make up the cycle
        // `module` will be the module record generated by webpack that caused the cycle
        compilation.errors.push(new Error(paths.join(" -> ")));
      },
      // `onEnd` is called before the cycle detection ends
      onEnd({ compilation }) {
        console.log("end detecting webpack modules cycles");
      },
    }),
  ],
};
