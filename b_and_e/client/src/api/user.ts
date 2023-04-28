import api from ".";

// const userApi = {
//   login: (info: object) => {
//     return fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
//       method: 'POST',
//       body: JSON.stringify(info),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     })
//   }
// }

const userApi = {
  login: (info: object) => {
    return api.post('/user/login', info);
  },
  getUserInfo: (accessToken: string) => {
    return api.get('/user/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
  }
}

export default userApi;