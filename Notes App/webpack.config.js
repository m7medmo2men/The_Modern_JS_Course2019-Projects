const path = require("path");

module.exports = {
  entry: {
    index: ['babel-polyfill' , './src/index.js'],
    edit: ['babel-polyfill' , './src/edit.js']
    //index: ['babel-polyfill' , './src/index.js'],
    //index:  './src/index.js',
    //edit: './src/edit.js'
  },
  output: {
    path: path.resolve(__dirname, `public/scripts`), // need to be absolute path
    filename: "[name]-bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    publicPath: "/scripts/",
  },
};

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     path: path.resolve(__dirname, "public/scripts"),
//     filename: "bundle.js",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["env"],
//           },
//         },
//       },
//     ],
//   },
//   devServer: {
//     contentBase: path.resolve(__dirname, "public"),
//     publicPath: "/scripts/",
//   },
//   devtool: "source-map",
// };
