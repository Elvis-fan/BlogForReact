import { combineReducers } from 'redux';

// const loginState: {} = {type: 'login', flag: false};
const URLChange = (state = {selected: '5'}, action) => {

    switch (action.type) {
        case 'head_0':
            return Object.assign({}, state, {selected: '0'});
        case 'head_1':
            return Object.assign({}, state, {selected: '1'});
        case 'head_2':
            return Object.assign({}, state, {selected: '2'});
        case 'head_3':
            return Object.assign({}, state, {selected: '3'});
        case 'head_4':
            return Object.assign({}, state, {selected: '4'});
        case 'head_5':
            return Object.assign({}, state, {selected: '5'});
        default:
            return state;
    }
}
// 登录窗口
export const signCtrl = (state = {isSign: true}, action) => {

    switch (action.type) {
        case 'signShow':
            return Object.assign({}, state, {isSign: true});
        case 'signHide':
            return Object.assign({}, state, {isSign: false});
        default:
            return state;
    }
}

const stores = combineReducers({
    signCtrl: signCtrl ,
    URLChange: URLChange

});
export default stores;
