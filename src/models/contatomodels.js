const mongoose = require('mongoose');



const ContatoSchema = new mongoose.Schema({

    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default:''},
    email: {type: String, required: false, default:''},
    telefone: {type: String, required: false, default:''},
    CriadoEm:{type:Date, default:Date.now}


});



const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {

constructor (body){
this.body = body;
this.errors = [];
this.contato = null;
}
 

async buscaId(id){
    if(typeof id !== 'string') return;
const user = await ContatoModel.findById(id);

return user;

}




async register(){
this.valida();
if(this.errors.length > 0) return;


this.contato = await ContatoModel.create(this.body);


}




valida(){
    this.cleanUp();
    
   
     if(!this.body.nome) {this.errors.push('Nome é obrigatório.')}
     
     if(!this.body.email && !this.body.telefone){
        this.errors.push('É necessário um email ou telefone como forma de contato.');
       }
    }





cleanUp() {

    for(const key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key]='';
        }
    }
    
    this.body = {
    
        nome: this.body.nome,
        sobrenome :this.body.sobrenome,
        email: this.body.email,
    telefone :this.body.telefone,
    };
    }


async editar(id){
    if(typeof id !== 'string') return;
this.valida();

if(this.errors.lengh > 0) return;
this.contato = await ContatoModel.findByIdAndUpdate(id, this.body,{new : true});

}
    
}




Contato.exibirContato = async function () {

    const contato = await ContatoModel.find()
    .sort({ CriadoEm: -1});
    return contato;
    
    }
    
    
Contato.delete = async function (id){

const contato =  await ContatoModel.findByIdAndDelete({_id: id});

return contato;

}


module.exports = Contato;