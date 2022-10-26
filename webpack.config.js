const path = require('path'); //path ya está disponible en node por eso no hay que hacer una instalación
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
/*const {CleanWebpackPlugin} = require('clean-webpack-plugin');*/

module.exports = {
  entry: './src/index.js', //indicar el elemento de entrada.
  output: {
    path: path.resolve(__dirname, 'dist'), // __dirname me indica donde está posicionado mis archivos
    filename: '[name].[contenthash].js', // Este es el nombre del archivo que se va a crear en la carpeta dist.
    assetModuleFilename: 'assets/images/[hash][ext][query]',
    clean: true
  },
  mode: 'production',
  resolve: {
    extensions: ['.js'], // En este array le vamos a indicar las extensiones que vamos a utilizar.
    alias: { //Los alias nos ayudan a simplificar las rutas con mucha búsqueda
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
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
      },
      { // Mediante esta regla podemos importar las imágenes como variables
        test: /\.png$/, //solamente trabajamos con ellos en la enfoque del proyecto
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name][contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, // esta propiedad me permite inserción de los elementos
      template: './public/index.html', // Donde se encuentra el template
      filename: './index.html' // Y con esto indicamos cuál va a ser el resultado en html
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [{ //necesitamos indicarle desde donde lo vamos a copiar hasta donde
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    }),
    new Dotenv(),
    //new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }
}