set K6_WEB_DASHBOARD=true

set K6_WEB_DASHBOARD_EXPORT=constantloadtest-100.html
k6 run --summary-trend-stats="med,p(95),p(99.9)" .\constantloadtest-100.js
timeout /t 100

set K6_WEB_DASHBOARD_EXPORT=spiketest-100.html
k6 run --summary-trend-stats="med,p(95),p(99.9)" .\spiketest-100.js
timeout /t 100

set K6_WEB_DASHBOARD_EXPORT=variableloadtest-100.html
k6 run --summary-trend-stats="med,p(95),p(99.9)" .\variableloadtest-100.js
timeout /t 100