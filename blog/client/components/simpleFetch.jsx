// import * as React from 'react';
class SimpleFetch {
    private static simpleFetch;
    public static getSimpleFetch() {
        if (SimpleFetch.simpleFetch == null) {
            SimpleFetch.simpleFetch = new SimpleFetch();
        }
        return SimpleFetch.simpleFetch;
    }
    public get(url) {
        return fetch(url , {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
            headers: new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain'
            })
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
        }).catch(function(e) {
            console.log(e);
        });
    }
    public post(url, option) {
        return fetch(url , {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => response.json()).then(data => console.log(data)).catch((e) => e);
    }
}
export default SimpleFetch;