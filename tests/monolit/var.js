import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 1000 },
    { duration: '15s', target: 5000 },
    { duration: '15s', target: 10000 },
    { duration: '15s', target: 5000 },
    { duration: '15s', target: 1000 },
  ],
};

export default function () {
  const res = http.get('http://192.168.2.101:3000/a');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}