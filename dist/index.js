import axios from 'axios';
import { createRoot } from 'react-dom/client';
const api = 'http://localhost:9000/api/gws/user/me';
const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    'x-username': 'testuser',
    'x-user-id': '1',
    'x-auth-code': 'eyJraWQiOiI3MjQxMzdhNi03OTZlLTQ5MjQtOWZlNS0wMmEzMThlZTg1MGQiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoidGVzdHVzZXIiLCJleHAiOjE3MDY5NDAzMDQsImlhdCI6MTcwNTk0MDMwNSwic2NvcGUiOlsic2VsZi1yZWFkIiwic2VsZi13cml0ZSIsInNlbGYtdXBkYXRlIiwic2VsZi1kZWxldGUiXX0.ZdPbYIWKkv0O4WcESBfiJKoohWrxrAilMQgzpUNlzxJPz5NQUCSStL1Cviq3Ow4r0QN4W4gw__3-_0VgJ0flOK6U6WVmKd2O-2IGgewf6ZRZAnJguRkHcgsIusrBmoG_DHKYrXcO93ppsmHD92z0XMKm2bwd96zkUksET3f0ZFwNerduRcidSpk0qHUmiTChn4ZtkhTVoam6YuS652z2CAWknVsIQxSlfNWXY1ptntQIi7jJNL62KVkzrA2SKVQsP1TZuIYwd8dyU4rwEdooT9_eLZG-dR1rb9wZvuUy9TUb25Mr_fAxYdTQrnUUHffgn8_gmDrTqq6EQIyKJWlL7kwGuXlt0WdYGbyfWPI_sCN-TpvO7bgXnEVA4COLr5wv21JhBUXtHAz5n4PYY9KWeHgFWuS3NmKhzy-YkKCMzFIkBhj3K0hCyzhTluApAA1QU6z8sczKsDev1yPSoB0J8roYhddbsyijF-KR-d7k8gxxy2Rl3jKGzQ7qv-Q_N4XkT8On7ydR6rMfVFFhCu6aDempJ4ofFkDaoQxYK6Kesp5FFUtOqaL0vXZKsD6Tk9GLUUQsCTV0YnJoyMj8L6gZZL3GoCMgig8ELyWP3Zv-stj60OLeTydgL4oOGgrs0B8j7x2ZXrvKxlT3FpH8Rb_l5KP_JuwxVxp_jMCwssko5sk',
};
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(Hello < /div>
    < /StrictMode>,);
axios
    .get(api, {
    headers,
    withCredentials: false,
})
    .then((response) => {
    const userDetails = response.data;
    console.log('**** response.data: ', response.data);
})
    .catch((error) => {
    console.log('**** error: ', error);
});
// root.render(<div>Hello</div>)
