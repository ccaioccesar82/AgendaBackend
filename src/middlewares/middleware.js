
exports.checkErr = (err, req, res,next) =>{

if(err) {

res.render('404');

}
};

exports.csrfMiddleware = (req, res, next) => {


res.locals.csrfToken = req.csrfToken();

next();
}

exports.middlewareGlobal = (req,res,next) =>{ 
res.locals.errors = req.flash('errors');
res.locals.success = req.flash('success');
res.locals.user = req.session.user;
next();
}