/**
 * Created by 刘军辉 on 2017/12/15.
 */
import Cookies from 'universal-cookie';
export const setSignIn = (data)=>{
    localStorage.setItem('sign_in',data);
};
export const getSignIn = () => {
    return localStorage.getItem('sign_in');
};
export const setToken = (data) => {
    const cookies = new Cookies();
    cookies.set('token', data, { path: '/' });
};
export const getToken = (data) => {
    const cookies = new Cookies();
    return cookies.get('token');
};