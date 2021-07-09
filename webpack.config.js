//引入一个包
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    //指定入口文件
    entry:"./src/index.ts",

    //指定打包文件所在的目录
    output: {
        path: path.resolve(__dirname,'dist'),
        //打包后的文件
        filename:"bundle.js",
        //告诉webpack不使用箭头函数

        environment: {
            arrowFunction: false
        }
    },
    mode:`development`,

    // 指定webpack打包时要使用的模块
    module: {
        //指定要加载的规则
        rules: [
            {
                //test指定的是规则生效的文件
                test: /\.ts$/,
                //要使用的loader
                use: [
                    //配置babel
                    {
                        loader:'babel-loader',
                        options:{
                            //设置预定义的环境
                            presets:[
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //要兼容的目标浏览器
                                        targets:{
                                            "chrome":"88",
                                            "ie":"11"
                                        },
                                        //指定corejs的版本
                                        "corejs":"3",
                                        //使用corejs的方式“useage”,按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                //要排除的文件
                exclude:/node-modules/
            },
            //设置less文件的处理
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    //引入"postcss-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browser:"last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"//从下向上执行的
                ]
            }
        ]
    },

    //配置webpack插件
    plugins: [
        new HTMLWebpackPlugin({
            title:'这是一个自定义的title',
            template:"./src/index.html",//以某个html文件为模板
        }),
    ],

    //用来设置引用模块,文件中可以引用哪些类型的文件
    resolve: {
        extensions: ['.ts','.js']
    }

}