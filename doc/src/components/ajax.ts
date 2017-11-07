
const get = (url: string): any => {

    return new Promise( (resolve: any, reject: any) => {
        let req: XMLHttpRequest ;

        // 针对FireFox，Mozillar，Opera，Safari，IE7，IE8
        req = new XMLHttpRequest();
        // 针对某些特定版本的mozillar浏览器的BUG进行修正
        if (req.overrideMimeType) {
            req.overrideMimeType( 'text/xml' );
        }

        if ( req ) {
            req.open('GET', url, true);
            req.responseType = 'json';
            req.onreadystatechange = function(){
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        resolve(req);
                    }else {
                        reject(req);
                    }
                }
            }
            req.send(null);
        }
    });

}
export default get;