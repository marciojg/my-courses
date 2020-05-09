const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [

  new HtmlWebpackPlugin({
    /*
    adiciona um hash no final da URL dos arquivos script e CSS importados
    no arquivo HTML gerado, importante para versionamento e cache no navegador.
    Quando um bundle diferente for gerado, o hash será diferente e isso é suficiente
    para invalidar o cache do navegador, fazendo-o carregar o arquivo mais novo.
    */
    hash: true,
    /*
    recebe um objeto como parâmetro com as configurações utilizadas para minificar o HTML.
    Podemos consultar todas as configurações possíveis no
    endereço https://github.com/kangax/html-minifier#options-quick-reference.
    */
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
    },
    /*
    o nome do arquivo HTML que será gerado. Respeitará o valor do path de output
    que já configuramos logo no início da criação do arquivo webpack.config.js.
    */
    filename: 'index.html',
    /*
    caminho do arquivo que servirá como template para geração de index.html.
    */
    template: __dirname + '/main.html'
  }),

  new extractTextPlugin("styles.css"),

  // Disponibiliza o jquery no scopo global do webpack MAS
  // não disponibiliza no scopo da aplicação, ou seja,
  // no console do navegador continua não existindo jquery mas
  // para o modulo do modal do bootstrap que precisa dele, está disponivel.
  new webpack.ProvidePlugin({
    '$': 'jquery/dist/jquery.js',
    'jQuery': 'jquery/dist/jquery.js'
  }),

  new webpack.optimize.CommonsChunkPlugin(
    {
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }
  )
];

if(process.env.NODE_ENV == 'production') {
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

  plugins.push(new babiliPlugin());

  plugins.push(new optimizeCSSAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
        discardComments: {
            removeAll: true
        }
    },
    canPrint: true
  }));
}

// CARREGA DA DIREITA PARA ESQUERDA
// loader: 'style-loader!css-loader'

module.exports = {
  entry: {
    app: './app-src/app.js',
    vendor: ['jquery', 'bootstrap', 'reflect-metadata']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
    /* removeu publicPath */
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader'
      },
      {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins
}
