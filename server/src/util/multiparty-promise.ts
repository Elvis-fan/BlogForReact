/**
 * Created by MR-Liu on 2018/3/5.
 */
import {Form} from 'multiparty';
export default(ctx,option  ) => {
    return new Promise(( resolve, reject ) => {
        const form = new Form(option);
        form.parse(ctx.req, (err, fields, files) => {
            let filesTmp = JSON.stringify(files,null,2);
            if(err){
                reject( err );
            } else {
                resolve( {fields,files} );
            }
        });
    })
}