/**
 * Created by MR-Liu on 2017/11/26.
 */
const jwt = require('./../util/jwt');
const signFilter = (req, res, next )=>{
    if(req.originalUrl.indexOf('manage')!==-1){
        if (req.method !== 'OPTIONS'){

            const token = req.headers.token;

            if(jwt.checkToken(token)){
                next();
            }else{
                res.status(401).end();
            }
        }else {
            next();
        }
    }else {
        next();
    }
}
module.exports = signFilter;