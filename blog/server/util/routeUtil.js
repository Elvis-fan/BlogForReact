let fs = require('fs'),extend = require('extend'),path = require('path'),router = require('express').Router();
const os = require('os');

let config={
    "class-route-path":false,//是否启动js级路径
    "scan-path":"routes",//route存放路径
    "route-property":"autowired",//自动注入依赖的module属性名
    "interceptor":{
        "Interceptor":"manage"
    }
}
//获取项目根路径
let getRootPath=(temPath)=>{
    while (true){
        let file= fs.readdirSync(temPath);
        for(let i=0;i<file.length;i++){
            if(file[i]==='route.json'){
                return temPath;
            }
        }
        if(temPath===path.dirname(temPath)) return undefined;
        else temPath=path.dirname(temPath);
    }
}

let loadFile = (filePath, path)=> {
    let routeObj = require(filePath),jsPath='';
    let jsList=fs.readFileSync(filePath).toString().split(os.EOL);


    if(config["class-route-path"]) jsPath='/'+path.match(/\w*/).toString();

    if (routeObj[config["route-property"]]) {
        for (let method in routeObj[config["route-property"]]) {
            let routeList = routeObj[config["route-property"]][method];
            if (!routeList) break ;
            for(let routeRule in routeList) {
                let func = routeList[routeRule];
                let interceptorURL = '';
                for(let i=0;i< jsList.length;i++){
                    if(jsList[i].indexOf(routeRule)!==-1){
                        for(let j =i-1; j>0; j--){
                            if(jsList[j].indexOf('//')===-1){
                                break;
                            }else{
                                for(let q in config.interceptor){
                                    if(jsList[j].indexOf(`//@${q}`)!==-1){
                                        interceptorURL = '/'+config.interceptor[q];
                                    }
                                }
                            }
                        }
                    }
                }
                router[method](interceptorURL+jsPath+routeRule, func);
            }
        }
    }
}

let rootPath=getRootPath(path.normalize(path.dirname(require.main.filename)));
let routesPath =rootPath+'/'+config["scan-path"];

fs.readFileSync(rootPath + '/route.json');
extend(true,config,JSON.parse(fs.readFileSync(rootPath + '/route.json')));

fs.readdir(routesPath, (err, file)=>{
    if(err){
        return;
    }
    file.map((path) => {
        let filepath=routesPath+'/'+path;
        fs.stat(filepath, (err, stats)=> {
            if (err) return ;
            if (stats.isFile()) {
                loadFile(filepath, path);
            }
        })
    });
});

module.exports = router;