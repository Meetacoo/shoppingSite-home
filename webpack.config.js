const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath = '/';


const getHtmlConfig = (name,title)=>({
	template:'./src/view/'+name+'.html',
	filename:name+'.html',
  title:title,
	inject:true,
	hash:true,
	chunks:['common',name]
})
//导出配置
module.exports = {
	//模式
	mode:'development',
	//指定多入口文件
	entry:{
		'common':'./src/pages/common/index.js',  
		'index':'./src/pages/index/index.js',  
    'user-login':'./src/pages/user-login/index.js',
    'user-register':'./src/pages/user-register/index.js',
		'result':'./src/pages/result/index.js'
	},
	/*
	//如果要配置额外 jQuery ，必须在页面中引用 CDN 进行挂载
	externals: {
		jquery: "window.jquery"
	},*/
	//指定多出口
	output:{
		//出口文件名称
		filename:'js/[name].js',
		//出口文件存储路径
		path:path.resolve(__dirname,'dist'),
		publicPath:publicPath,
	},
	resolve: {
		alias: {
			node_modules: path.resolve(__dirname, './node_modules'),
			pages: path.resolve(__dirname, './src/pages/'),
			util: path.resolve(__dirname, './src/util/'),
			common:path.resolve(__dirname, './src/common/'),
			service:path.resolve(__dirname, './src/service')
		}
	},
	//配置loader
  module: {
    rules: [
    	//处理css文档的loader
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
          },
          "css-loader"
        ]
      },
      //处理图片loader
	    {
        test: /\.(png|jpg|gif|ttf|woff2|woff|eot|svg|otf)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
            	limit:100,
            	name: 'resource/[name].[ext]'
            }
          }
        ]
    	},
      {
        test:/\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','es2015','react','stage-3'],
            //antd 按需加载
            plugins: [
              ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] 
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
  	new HtmlWebpackPlugin(getHtmlConfig('result','返回结果')),
  	new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    })
  ],
  devServer: {
    contentBase: './dist',
    port:8090,
    // historyApiFallback:true,
    proxy:{
    	'/user': {
    		target: 'http://localhost:8060',
			  changeOrigin: true
    	}
    }
  }
};