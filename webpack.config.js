module.exports={
    entry: {
        example:'./example/example',
    },
    output:{
        path:'./example',
        filename:'[name].min.js'
    },
    module:{
        loaders:[
            {
                test:/\.js[x]?$/,
                loader:'babel',
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                loader:'style!css',
            },
            {
                test:/\.(png|jpg|svg|gif|eot|woff|ttf)$/,
                loader:'url?limit=8192'
            }
        ]
    },
    resolve:{
        extensions:['','.js','.jsx']
    }
}