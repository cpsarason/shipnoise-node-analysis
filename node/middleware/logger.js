
function log(req,res,next) {
    console.log('Logging new stuff....');
    next();
};

module.exports = log;