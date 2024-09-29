import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://192.168.2.104:3000/a');
  sleep(1);
}