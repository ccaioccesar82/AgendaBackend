const HomeModel = require('../models/homemodels');
const express = require('express');
const Contato = require('../models/contatomodels');

exports.index = async function (req,res) {

const contatos = await Contato.exibirContato();

res.render('index', {contatos});


}

exports.login = (req, res) => {



    res.render('login')

}



