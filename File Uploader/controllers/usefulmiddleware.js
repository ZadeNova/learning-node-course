async function isAuth(req,res,next){
    if (req.isAuthenticated()){
        res.locals.login_status = true;
        res.locals.user = req.session.passport.user;

        next()
    }
    else{
        console.log('Not authenticated');

        res.locals.login_status = false;
        res.redirect('/index-public');
    }
}

function checkConfirmPassword(req,res,next){
    const {Email, Firstname , Lastname , confirmPassword , password} = req.body
    if(password === confirmPassword){
        next()
    }
    else{
        messages = {
            Email: Email,
            Firstname: Firstname,
            Lastname: Lastname,
            error: "Password is not matching!"
        }
        // req.flash('error', 'Passwords do not match');
        // req.flash('Email',Email);
        // req.flash('Firstname',Firstname);
        // req.flash('Lastname',Lastname);
        
        res.render('../views/user/signup.ejs',{title:"Sign up",messages: messages});
    }
}


module.exports = {
    isAuth,
    checkConfirmPassword,
}