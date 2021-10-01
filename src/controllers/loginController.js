const express = require('express');
const Login = require('../models/loginmodels.js');


exports.login = (req, res) => {
    console.log(req.session.user);
    res.render('login')



}


exports.register =  async function (req,res)  {

try{
    const login = new Login(req.body);
    await login.registerUser();
    
    if(login.errors.length > 0){
    
        req.flash('errors', login.errors)
        req.session.save( function(){
           return res.redirect('back');
    })
return;
    
} 


req.flash('success', 'Seu usuário foi criado com sucesso.')
req.session.save(function() {

return res.redirect('back');


});

}catch(e){
console.log(e);
return res.render('404');

}
}

exports.loginUser =  async function (req,res)  {

    try{
        const login = new Login(req.body);
        await login.logar();
        
        if(login.errors.length > 0){
        
            req.flash('errors', login.errors)
            req.session.save( function(){
               return res.redirect('back');
        })
    return;
        
    } 
    
    
    req.session.user = login.user;
    req.session.save(function() {
    res.redirect('/');
   
    
    
    });
    
    }catch(e){
    console.log(e);
    return res.render('404');
    
    }
    }

    exports.loginOut = (req,res) =>{

req.session.destroy();
res.redirect('/');

  }
    