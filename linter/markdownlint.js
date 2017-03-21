var markdownlint = require('markdownlint');
var Glob = require('glob')

// Get all .md files
var filelist = Glob.sync(
    '**/*.md',
    {
        'ignore': 'node_modules/**'
    });

var options = {
    'files': filelist,
    'config': require('./markdownlint.json')
};
var results = markdownlint.sync(options);
console.log(results.toString(true));

if (results.toString(true)) {
    process.exit(1);
} else {
    console.log('There are no linter errors.');
}
