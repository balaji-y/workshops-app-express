function dateLogger(req,res,next){
    console.log(`Request came to ${req.url} at `,new Date().toDateString());
    next();
    console.log(`Response generated to ${req.url} at `,new Date().toDateString())
}
module.exports = {dateLogger};