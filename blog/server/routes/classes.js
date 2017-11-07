let classesService = require('./../service/classesService');
exports.autowired = {
    'get' : {
        '/getClasses/:id' : (req, res, next)=>{

            req.getConnection((err,conn)=>{
                conn.query('SELECT id,name,has_child FROM classes WHERE parent_id= ?',[ req.params.id ], (err, result) => {
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

    }
};