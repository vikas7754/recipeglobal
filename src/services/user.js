import axios from "axios";
axios.defaults.withCredentials = true;
const URL = "/api/user";
const URL2 = "/api/notification";
const URL3 = "/api/user";

export const sendOtpForSignup = (data) => {
  return axios.post(URL + "/send-otp", data);
};

export const signup = (data) => {
  return axios.post(URL + "/signup", data);
};

export const login = (data) => {
  return axios.post(URL + "/login", data);
};

export const logout = () => {
  return axios.post(URL + "/logout");
};

export const forgotPasswordRequest = (email) => {
  return axios.post(URL + "/forgotPasswordRequest", email);
};

export const forgotPassword = (password) => {
  return axios.post(URL + "/forgotPassword", password);
};

export const updateAvatar = (data) => {
  return axios.post(URL + "/update-avatar", data);
};

export const updateBasicUserDetails = (data) => {
  return axios.post(URL + "/update-basic", data);
};

export const sendOtpForEmailChange = (email) => {
  return axios.post(URL + `/send-otp-for-email-change/${email}`);
};

export const updateUserEmail = (data) => {
  return axios.post(URL + "/update-email", data);
};

export const updateUserBio = (data) => {
  return axios.post(URL + "/update-bio", data);
};

export const updateUserSocialLinks = (data) => {
  return axios.post(URL + "/update-social", data);
};

export const googleLogin = (data) => {
  return axios.post(URL3 + "/google-login", data);
};

export const sendNotification = (data) => {
  return axios.post(URL2 + "/send", data);
};

export const readNotifications = () => {
  return axios.post(URL2 + "/read");
};
