var getList= (typeId) => {

    return (err,conn)=>{
        conn.query('SELECT * FROM classes WHERE parent_id= ?',[ typeId ], (err, result) => {

            if(err){
                return err;
            }else{

                return result;
            }
        });
    }
}

module.exports={
    getList:getList
};