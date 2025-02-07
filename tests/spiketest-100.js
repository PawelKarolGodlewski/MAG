import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
    stages: [ 
        { duration: '1m', target: 100 }, 
        { duration: '4m', target: 0 },     
    ],
gracefulRampDown: '0s',
    },
},
};

export default function () {
    http.get('http://192.168.2.100:3000/posts');
    sleep(1);
}
