set K6_WEB_DASHBOARD=true

set K6_WEB_DASHBOARD_EXPORT=constantloadtest-10.html
k6 run --summary-trend-stats="med,p(95),p(99.9)" .\constantloadtest-10.js
timeout /t 100

set K6_WEB_DASHBOARD_EXPORT=spiketest-10.html
k6 run --summary-trend-stats="med,p(95),p(99.9)" .\spiketest-10.js
timeout /t 100

set K6_WEB_DASHBOARD_EXPORT=variableloadtest-10.html
k6 run --summary-trend-stats="med,p(95),p(99.9)" .\variableloadtest-10.js
timeout /t 100