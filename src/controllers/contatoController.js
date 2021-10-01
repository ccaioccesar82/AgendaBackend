const express = require('express');
const Contato = require('../models/contatomodels');


exports.contatoCadastro = (req,res) => {

res.render('contato', {
contato:{}

});


}

exports.contatoRegister = async function (req,res) {
    try{
const contato = new Contato(req.body);
await contato.register();


if(contato.errors.length > 0) {

    req.flash('errors', cadastro.errors);
    req.session.save(function() {
    
    res.redirect('back');
    return;    
    });
    

return;
    

} 

req.flash('success', 'Contato cadastrado');
req.session.save(function() {

    return res.redirect(`/contato/cadastro/${contato.contato._id}`);
    
});

}catch(e){

console.log(e);
res.render('404');

}

}


exports.registerEdit = async function(req, res){

    if(!req.params.id) return res.render('404');

 const contato1 = new Contato (req.body);
const contato = await contato1.buscaId(req.params.id);

 res.render('contato', {contato});

}


exports.edit = async function (req, res){

    try{
    if(!req.params.id) return res.render('404');
   const contato = new Contato(req.body);
   await contato.editar(req.params.id)


   if(contato.errors.length > 0) {

    req.flash('errors', cadastro.errors);
    req.session.save(function() {
    
    res.redirect('back');
    return;    
    });
    

return;
    

} 

req.flash('success', 'Contato editado');
req.session.save(function() {

    return res.redirect('back');
    
});

}catch(e){

console.log(e);
res.render('404');

}
}

exports.contatoDelete = async function(req,res) {


const contato = await Contato.delete(req.params.id);


    req.flash('success', 'Contato apagado');
    req.session.save(function() {
    
        return res.redirect('back');
        

})
}