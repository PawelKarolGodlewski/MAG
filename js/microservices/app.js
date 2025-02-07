const { exec } = require('child_process');

exec('node list-posts-service.js', (err, stdout, stderr) => {
    if (err) console.error(err);
    console.log(stdout);
});

exec('node add-post-service.js', (err, stdout, stderr) => {
    if (err) console.error(err);
    console.log(stdout);
});

exec('node delete-post-service.js', (err, stdout, stderr) => {
    if (err) console.error(err);
    console.log(stdout);
});

exec('node lb-service.js', (err, stdout, stderr) => {
    if (err) console.error(err);
    console.log(stdout);
});
