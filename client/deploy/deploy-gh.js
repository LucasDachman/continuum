const ghPages = require('gh-pages');

const branch = 'master';
const dir = 'build';

ghPages.publish(dir, {
  branch,
}, error => {
  if (error) {
    console.group();
    console.error('Error deploying gh-pages');
    console.error(error);
    console.groupEnd();
  } else {
    console.log(`Success pushing directory ${dir} to branch ${branch}`);
  }
});