// import * as React from 'react';
class SimpleFetch {
    private static simpleFetch: SimpleFetch;
    public static getSimpleFetch(): SimpleFetch {
        if (SimpleFetch.simpleFetch == null) {
            SimpleFetch.simpleFetch = new SimpleFetch();
        }
        return SimpleFetch.simpleFetch;
    }
    public get(url: string): any {
        return fetch(url , {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
            headers: new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain'
            })
        }).then(function(response: any) {
            return response.json();
        }).then(function(data: any) {
            console.log(data);
        }).catch(function(e: any) {
            console.log(e);
        });
    }
    public post(url: string, option: any): any {
        return fetch(url , {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => response.json()).then(data => console.log(data)).catch((e: any) => e);
    }
}
export default SimpleFetch;