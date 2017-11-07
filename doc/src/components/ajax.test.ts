// import * as React from 'react';
// import * as enzyme from 'enzyme';
import get from './ajax';

const url: string = 'http://localhost:8080/';
describe('Ajax', () => {
it('ajax test', () => {

    const ajax = get(url + 'career/demo');
    console.log(ajax);
});
});