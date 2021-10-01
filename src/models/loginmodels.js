const mongoose = require('mongoose');
const {check}= require('express-validator');
const bcryptjs = require('bcryptjs');


const LoginSchema = new mongoose.Schema({

    email: {type: String, required: true},
    password: {type: String, required: true}

});



const LoginModel = mongoose.model('Login', LoginSchema);

class Login {

constructor (body){
this.body = body;
this.errors = [];
this.user = null;
}


async logar(){

    this.valida();

this.user = await LoginModel.findOne({email: this.body.email})
if(!this.user) {
    this.errors.push('Usuário não existe')
return;
}

if(this.errors.length > 0) return;

if(!bcryptjs.compareSync(this.body.password, this.user.password)){
    this.errors.push('Senha inválida')
    return;
   }


}


async registerUser() {
   this.valida();
  

   await this.userExist();

if(this.errors.length > 0) return;

   const salt = bcryptjs.genSaltSync();
   this.body.password = bcryptjs.hashSync(this.body.password, salt);
   

     this.user = await LoginModel.create(this.body);

}

async userExist() {

    
 const user = await LoginModel.findOne({email: this.body.email});
if(user) return this.errors.push('Usuário já existe.');


}


valida(){
this.cleanUp();

if(this.body.password.length < 3 || this.body.password.length >= 15)
{this.errors.push('A senha precisa ter de 3 à 15 caracteres');

}
}
cleanUp(){

for(const key in this.body){
    if(typeof this.body[key] !== 'string'){
        this.body[key]='';
    }
}

this.body = {

    email: this.body.email,
    password :this.body.password
};
}

}


module.exports = Login;