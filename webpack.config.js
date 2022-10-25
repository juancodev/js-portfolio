const path = require('path'); //path ya está disponible en node por eso no hay que hacer una instalación
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js', //indicar el elemento de entrada.
  output: {
    path: path.resolve(__dirname, 'dist'), // __dirname me indica donde está posicionado mis archivos
    filename: 'main.js', // Este es el nombre del archivo que se va a crear en la carpeta dist.
  },
  resolve: {
    extensions: ['.js'] // En este array le vamos a indicar las extensiones que vamos a utilizar.
  },
  module: { // Este es un objeto que se encuentran dentro de unas reglas
    rules: [{
        test: /\.m?js$/, //Expresiones regulares indicando que utilice archivos .mjs o js
        exclude: /node_modules/, //nos permite omitir archivos o carpetas
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, // esta propiedad me permite inserción de los elementos
      template: './public/index.html', // Donde se encuentra el template
      filename: './index.html' // Y con esto indicamos cuál va a ser el resultado en html
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    })
  ]
}