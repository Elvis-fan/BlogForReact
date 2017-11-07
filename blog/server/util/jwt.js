/**
 * Created by 刘军辉 on 2017/12/14.
 */
const jwt = require('jwt-simple');
const secret = 'xdcftyv790./。gbhnji3oe、uqw，euqsada';
const encode=(userName)=>{
    return jwt.encode({name:userName, time:new Date().getTime()}, secret);
};
const decode=(token)=>{
    return jwt.decode(token, secret);
};
const checkToken=(token)=>{
    if(!token) return false;
    const info = decode(token);
    const nowTime = new Date().getTime();
    if(nowTime-info.time>1296000000){
        return false;
    }
    return true;
}
module.exports={
    encode:encode,
    decode:decode,
    checkToken:checkToken
}