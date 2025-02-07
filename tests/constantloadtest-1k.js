import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1000, // Virtual Users
    duration: '5m', // Duration of the test
};

export default function () {
    http.get('http://192.168.2.100:3000/posts');
    sleep(1);
}
