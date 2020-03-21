import axios from './fetch'
export const refreshToken = () => {
    return new Promise((resolve, reject) => {
        let userToken = JSON.parse(localStorage.getItem("userToken"));
        if (!userToken || userToken == 'null') return;
        if (userToken) {
            axios.fetch("/user/refresh?refreshToken=" + userToken.refresh_token, "", "get").then(data => {
              resolve(data)
            }).catch(error => {
              reject(error);
            });
        }
    })
}
