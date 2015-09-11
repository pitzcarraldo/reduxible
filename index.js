require('babel/register')({
    stage: 0,
    plugins: ['typecheck']
});

var Reduxible = require('./lib/Reduxible');

module.exports = Reduxible;
