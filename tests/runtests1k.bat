set K6_WEB_DASHBOARD=true

set K6_WEB_DASHBOARD_EXPORT=constantloadtest-1k.html
k6 run --summary-trend-stats="med,p(95),p(99.9)" .\constantloadtest-1k.js
timeout /t 100

set K6_WEB_DASHBOARD_EXPORT=spiketest-1k.html
k6 run --summary-trend-stats="med,p(95),p(99.9)" .\spiketest-1k.js
timeout /t 100

set K6_WEB_DASHBOARD_EXPORT=variableloadtest-1k.html
k6 run --summary-trend-stats="med,p(95),p(99.9)" .\variableloadtest-1k.js
timeout /t 100