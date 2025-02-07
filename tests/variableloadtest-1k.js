import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 300,
    stages: [
        { duration: '1m15s', target: 600 }, 
        { duration: '1m15s', target: 1000 }, 
        { duration: '1m15s', target: 600 },
	{ duration: '1m15s', target: 300 },
    ],
    },
},
};

export default function () {
    http.get('http://192.168.2.100:3000/posts');
    sleep(1);
}
