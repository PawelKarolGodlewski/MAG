import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 30,
    stages: [
        { duration: '1m15s', target: 60 }, 
        { duration: '1m15s', target: 100 }, 
        { duration: '1m15s', target: 60 },
	{ duration: '1m15s', target: 30 },
    ],
    },
},
};

export default function () {
    http.get('http://192.168.2.100:3000/posts');
    sleep(1);
}
