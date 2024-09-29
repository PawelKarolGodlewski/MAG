set K6_WEB_DASHBOARD=true

set K6_WEB_DASHBOARD_EXPORT=monolit-stress.html
k6 run --iterations=10000 --vus 10000 --duration 1m --summary-trend-stats="med,p(95),p(99.9)" .\monolit\stress.js
::set K6_WEB_DASHBOARD_EXPORT=distrib-stress.html
::k6 run --iterations=10000 --vus 10000 --duration 1m --summary-trend-stats="med,p(95),p(99.9)" .\distrib\stress.js
set K6_WEB_DASHBOARD_EXPORT=microservice-stress.html
k6 run --iterations=10000 --vus 10000 --duration 1m --summary-trend-stats="med,p(95),p(99.9)" .\microservice\stress.js
set K6_WEB_DASHBOARD_EXPORT=loadbalancer-stress.html
k6 run --iterations=10000 --vus 10000 --duration 1m --summary-trend-stats="med,p(95),p(99.9)" .\loadbalancer\stress.js


set K6_WEB_DASHBOARD_EXPORT=monolit-var.html
k6 run --iterations=10000 --vus 10000 --summary-trend-stats="med,p(95),p(99.9)" .\monolit\var.js
::set K6_WEB_DASHBOARD_EXPORT=distrib-var.html
::k6 run --iterations=10000 --vus 10000 --summary-trend-stats="med,p(95),p(99.9)"  .\distrib\var.js
set K6_WEB_DASHBOARD_EXPORT=microservice-var.html
k6 run --iterations=10000 --vus 10000 --summary-trend-stats="med,p(95),p(99.9)" .\microservice\var.js
set K6_WEB_DASHBOARD_EXPORT=loadbalancer-var.html
k6 run --iterations=10000 --vus 10000 --summary-trend-stats="med,p(95),p(99.9)" .\loadbalancer\var.js


set K6_WEB_DASHBOARD_EXPORT=monolit-spike.html
k6 run --iterations=10000 --vus 10000 --summary-trend-stats="med,p(95),p(99.9)" .\monolit\spike.js
::set K6_WEB_DASHBOARD_EXPORT=distrib-spike.html
::k6 run --iterations=10000 --vus 10000 --summary-trend-stats="med,p(95),p(99.9)"  .\distrib\spike.js
set K6_WEB_DASHBOARD_EXPORT=microservice-spike.html
k6 run --iterations=10000 --vus 10000 --summary-trend-stats="med,p(95),p(99.9)" .\microservice\spike.js
set K6_WEB_DASHBOARD_EXPORT=loadbalancer-spike.html
k6 run --iterations=10000 --vus 10000 --summary-trend-stats="med,p(95),p(99.9)" .\loadbalancer\spike.js
