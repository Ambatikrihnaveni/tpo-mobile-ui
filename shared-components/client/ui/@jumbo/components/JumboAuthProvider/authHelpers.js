import {config} from "../../../appLayout/config/main";

export const storeToken = (token) => {
    localStorage.setItem('"accounts:accessToken"', token);
};

export const removeToken = () => {
    localStorage.removeItem('"accounts:accessToken"');
};