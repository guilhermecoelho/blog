var request = require('request');

var info = new Object();

info.url = 'https://api.telegram.org/bot';
info.token = '165559212:AAEjOZsONlREVUR2s843Q2KgAQsLHgItaYQ';
info.comandoUpdate = '/getUpdates';
info.comandoSendMessage = '/sendMessage';
info.comandoOffset = '?offset=';
info.offset = '';
info.update_id = '';

setInterval(function (){
	verificaUpdate(info, enviaMensagem)
}, 5000);

//verifica se houve atualizacoes
function verificaUpdate(info, callback){

	request(info.url+ info.token + info.comandoUpdate, function (error, response, body) {
  		if (!error && response.statusCode == 200) {

  			var b = JSON.parse(body);

  			if(b.result.length !== 0) {
  				var len = b.result.length;

  				for( var i = 0; i < len ; i++){

  					info.chat_id = b.result[i].message.chat.id;
  					info.update_id = b.result[i].update_id + 1;

  					info.mensagem = 'voce escreveu: '+ b.result[i].message.text;
  					callback(info, offset);
  				}
  			} 
  		}

  		else {
  			console.log(error)
  		}
	});
}

//envia mensagem
function enviaMensagem(info, callback){
	var options = {
		method: 'POST',
    	url: info.url+ info.token + info.comandoSendMessage,
    	headers: {
        'Content-Type': 'multipart/form-data',
    	},
    	formData: {
    		text: info.mensagem,
    		chat_id: info.chat_id
    	}
	};

	request(options, function(error, response, body){
		//console.log(body);
		if(!error){
			callback(info);
		}
	});
}

//limpa os registros 
function offset(info){
	request(info.url+ info.token + info.comandoUpdate+ info.comandoOffset + info.update_id, function (error, response, body) {

	});
}