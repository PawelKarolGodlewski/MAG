import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 3,
    stages: [
        { duration: '1m15s', target: 6 }, 
        { duration: '1m15s', target: 10 }, 
        { duration: '1m15s', target: 6 },
	{ duration: '1m15s', target: 3 },
    ],
    },
},
};

export default function () {
    http.get('http://192.168.2.100:3000/posts');
    sleep(1);
}
