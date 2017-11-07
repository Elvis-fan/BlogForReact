const multiparty = require('multiparty');
const util = require('util');
const fs = require('fs');
exports.autowired = {
    'get' : {
        '/getArticles/:type/:page/:size' : (req, res, next)=>{
            let type = parseInt(req.params.type),page = parseInt(req.params.page), size = parseInt(req.params.size);
            let sql = 'WHERE type=? ORDER BY date DESC LIMIT ?,?',param = [type,  page, size];
            console.log(typeof type);
            if(type === 0){
                sql = 'ORDER BY date DESC LIMIT ?,?';
                param = [page, size];
            }
            req.getConnection((err, conn) => {
                conn.query(`SELECT id,title,type,briefing,date_format(date,"%c.%d.%Y") as date FROM article ${sql}`,
                    param, (err, result) => {
                        if(err){
                            res.json(err);
                        }else{
                            console.log(result)
                            res.json(result);
                        }
                    });
            })
        },
        '/getArticle/:id' : (req, res, next) => {
            let id = req.params.id;
            req.getConnection((err, conn) => {
                conn.query('SELECT id,title,type,date_format(date,"%c.%d.%Y") as date,content FROM article WHERE id=?',[id], (err, result) => {
                    if(err){
                        res.json(err);
                    }else{
                        console.log(result)
                        res.json(result);
                    }
                });
            });
        }
    },
    'post' : {
        //@Interceptor
        '/test': (req, res, next) => {
            //生成multiparty对象，并配置上传目标路径
            let form = new multiparty.Form({uploadDir: './server/static/image'});
            //上传完成后处理
             form.parse(req, function(err, fields, files) {
                 let filesTmp = JSON.stringify(files,null,2);
                 if(err){
                     console.log('parse error: ' + err);
                 } else {
                     console.log('parse files: ' + filesTmp);
                     let inputFile = files.image[0];
                     let uploadedPath = inputFile.path;
                     let dstPath = './server/static/image/' + inputFile.originalFilename;
                     //重命名为真实文件名
                     fs.rename(uploadedPath, dstPath, function(err) {
                         if(err){
                             console.log('rename error: ' + err);
                         } else {
                             console.log('rename ok');
                         }
                     });
                 }

                 res.json({ data: { link: 'http://106.14.150.87/static/image/1.jpg'}});
             });
        },
        @Interceptor
        '/update': (req, res, next) =>{
            console.log(123);
            req.on("data",(chunk)=>{
                let article = JSON.parse(chunk+"");
                let briefing = article.content.replace(/<(?:.|\s)*?>/g,'');
                if(briefing.length>100){
                    briefing = briefing.substring(0,100);
                }
                let sql,params;
                if(article.id){
                    sql = 'UPDATE article SET title=?,type=?,date=?,briefing=?,content=? WHERE id=?';
                    params = [article.title, article.type, new Date(article.date), briefing, article.content, article.id];
                }else{
                    sql = 'INSERT INTO article (title,type,date,briefing,content) VALUES (?,?,?,?,?)';
                    params = [article.title, article.type, new Date(article.date), briefing, article.content];
                }
                req.getConnection((err, conn) => {
                    conn.query(sql, params, (err, result) => {
                        if(err){
                            console.log(err)
                            res.json(err);
                        }else{
                            console.log(result)
                            res.json(result);
                        }
                    });
                });

            });



        }
    }
};
function Interceptor() {
    
}