function pageNotFound(req,res,next){
    res.render('404');
    next();
}

function genericErrorHandler(err,req,res,next){
    res.status(err.status).json({
        message:err.message,
    })
}

module.exports = {pageNotFound,genericErrorHandler}