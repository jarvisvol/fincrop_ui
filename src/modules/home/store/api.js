import HTTP from '../../../Utils/Http/Http'
import store from '../../../Utils/store/store';
import {
    userRegisterSuccess,
    userRegisterFail,
    userLoginSuccess,
    userLoginFail,
    verifyOTPSuccess,
    verifyOTPFailure,
    resendOtpSuccess,
    resendOtpFailure,
    userDetailSuccess,
    userDetailFailure,
} from './action'


export const registerUser = async(payload) => {
    try {
        const result = await HTTP.post('/user/register', payload);
        store.dispatch(userRegisterSuccess(result.data));
    } catch (error) {
        store.dispatch(userRegisterFail(error.response.data))
    }
}

export const userLogin  = async(payload) => {
    try {
        const respo = await HTTP.post('auth/login', payload);
        store.dispatch(userLoginSuccess(respo));
    } catch (error) {
        store.dispatch(userLoginFail(error.response.data))
    }
}

export const otpVerify = async(payload) => {
    try {
        const result = await HTTP.post('user/check-otp', payload);
        store.dispatch(verifyOTPSuccess(result));
    } catch (error) {
        store.dispatch(verifyOTPFailure(error.response.data))
    }

}

export const resendOtp = async(payload) => {
    try {
        const result = await HTTP.post('user/resend-otp', payload);
        store.dispatch(resendOtpSuccess(result));
    } catch (error) {
        store.dispatch(resendOtpFailure(error.response.data));
    }

}

export const getUserDetails = async() => {
    try {
        const result = await HTTP.get('user/user-detail');
        store.dispatch(userDetailSuccess(result));
    } catch (error) {
        store.dispatch(userDetailFailure(error.response.data));
    }

}