/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function listaGfcms(data){
	$("#selGfcm").html("");
	$.each(data, function (index, value) {
		$("#selGfcm").append('<option value="' + index + '">' + value + '</option>');
	});
	$("#teste").append("\n<br>Lista de GFCMs atualizada!");
	$("#teste").append("\n<br>"+data);
}

autenticado = 0;
function verificaAutenticacao(data){
	if(data.success == 1){
		autenticado = 1;
	}
}

//urlServidor = 'http://127.0.0.1/conferencias';
//urlServidor = 'http://inscricaoconferenciabh.000webhostapp.com';
urlServidor = 'http://www.treinasusfacil.mg.gov.br/acompanhamento/relatorio/CRE/CNES_IMP/listagfcms.json';
myJqXHR = 0;
myStrError = 0;
myTxt = 0;

	
var xhr = $.ajaxSettings.xhr();
xhr.upload.addEventListener( function( event ) {
	$("#teste").append("\n<br>Event Listener do XHR");
}, false );

function xhrProvider() {
	return xhr;
}

//$(function() {
$(document).on('pageshow',function(){
	//$('#dataNascimento').datepicker();
	$('.cpf').mask('000.000.000-00', {placeholder: "___.___.___-__"});
	
	$("#teste").html("Atualizando lista de GFCMs utilizando o servidor " + urlServidor);
	
	/*autenticado = 0;
	if( ! autenticado){
		$.ajax({
			type		: 'POST',
			url			: urlServidor + '/app/login', 
			
			jsonp		: 'verificaAutenticacao',
			dataType	: 'jsonp',
			
			data		: { "login" : "admin", "senha" : "conferencias" },
			
			success		: function(response){
							console.log(response);
						},
			
			beforeSend	: function(){$.mobile.loading('show');},
			complete	: function(){$.mobile.loading('hide');},
			error		: function(jqXHR, strError){
							if(jqXHR.statusText != "success"){
								$( "#mensagens" ).find( "#mensagem" ).html("Erro de autenticacao");
								$( "#mensagens" ).popup();
								$( "#mensagens" ).popup( "open" );
							}
						}
		});
	}*/
	
	$.ajax({
		//type		: 'GET',
		//url			: urlServidor + '/Gfcms/list',
		url			: urlServidor,
		dataType	: 'jsonp',
		
		success		: function(response){
						listaGfcms(response);
					},
		
		timeout		: 3000,
		cache		: false,
		xhr			: xhrProvider,
		statusCode	: {
						400: function() {
							  $("#teste").append("\n<br>Requisição inválida");
							},
						401: function() {
							  $("#teste").append("\n<br>Não autorizado");
							},
						402: function() {
							  $("#teste").append("\n<br>Pagamento necessário");
							},
						403: function() {
							  $("#teste").append("\n<br>Proibido");
							},
						404: function() {
							  $("#teste").append("\n<br>Não encontrado");
							},
						405: function() {
							  $("#teste").append("\n<br>Método não permitido");
							},
						406: function() {
							  $("#teste").append("\n<br>Não Aceitável");
							},
						407: function() {
							  $("#teste").append("\n<br>Autenticação de proxy necessária");
							},
						408: function() {
							  $("#teste").append("\n<br>Tempo de requisição esgotou (Timeout)");
							},
						409: function() {
							  $("#teste").append("\n<br>Conflito");
							},
						410: function() {
							  $("#teste").append("\n<br>Gone");
							},
						411: function() {
							  $("#teste").append("\n<br>comprimento necessário");
							},
						412: function() {
							  $("#teste").append("\n<br>Pré-condição falhou");
							},
						413: function() {
							  $("#teste").append("\n<br>Entidade de solicitação muito grande");
							},
						414 : function() {
							  $("#teste").append("\n<br>Pedido-URI Too Long");
							},
						415: function() {
							  $("#teste").append("\n<br>Tipo de mídia não suportado");
							},
						416: function() {
							  $("#teste").append("\n<br>Solicitada de Faixa Não Satisfatória");
							},
						417: function() {
							  $("#teste").append("\n<br>Falha na expectativa");
							},
						418: function() {
							  $("#teste").append("\n<br>Eu sou um bule de chá");
							},
						422: function() {
							  $("#teste").append("\n<br>Entidade improcessável (WebDAV)");
							},
						423: function() {
							  $("#teste").append("\n<br>Fechado (WebDAV)");
							},
						424: function() {
							  $("#teste").append("\n<br>Falha de Dependência (WebDAV)");
							},
						425: function() {
							  $("#teste").append("\n<br>coleção não ordenada");
							},
						426: function() {
							  $("#teste").append("\n<br>Upgrade Obrigatório");
							},
						450: function() {
							  $("#teste").append("\n<br>bloqueados pelo Controle de Pais do Windows");
							},
						499: function() {
							  $("#teste").append("\n<br>cliente fechou Pedido (utilizado em ERPs/VPSA)");
							},
						500: function() {
							  $("#teste").append("\n<br>Erro interno do servidor (Internal Server Error)");
							},
						501: function() {
							  $("#teste").append("\n<br>Não implementado (Not implemented)");
							},
						502: function() {
							  $("#teste").append("\n<br>Bad Gateway");
							},
						503: function() {
							  $("#teste").append("\n<br>Serviço indisponível (Service Unavailable)");
							},
						504: function() {
							  $("#teste").append("\n<br>Gateway Time-Out");
							},
						505: function() {
							  $("#teste").append("\n<br>HTTP Version not supported");
							},
						300: function() {
							  $("#teste").append("\n<br>Múltipla escolha");
							},
						301: function() {
							  $("#teste").append("\n<br>Movido");
							},
						302: function() {
							  $("#teste").append("\n<br>Encontrado");
							},
						404: function() {
							  $("#teste").append("\n<br>");
							},
						304: function() {
							  $("#teste").append("\n<br>Não modificado");
							},
						305: function() {
							  $("#teste").append("\n<br>Use Proxy (desde HTTP/1.1)");
							},
						306: function() {
							  $("#teste").append("\n<br>Proxy Switch");
							},
						307: function() {
							  $("#teste").append("\n<br>Redirecionamento temporário (desde HTTP/1.1)");
							},
						200: function() {
							  $("#teste").append("\n<br>OK");
							},
						201: function() {
							  $("#teste").append("\n<br>Criado");
							},
						202 : function() {
							  $("#teste").append("\n<br>Aceito");
							},
						203: function() {
							  $("#teste").append("\n<br>não-autorizado (desde HTTP/1.1)");
							},
						204: function() {
							  $("#teste").append("\n<br>Nenhum conteúdo");
							},
						205: function() {
							  $("#teste").append("\n<br>Reset");
							},
						206: function() {
							  $("#teste").append("\n<br>Conteúdo parcial");
							},
						207: function() {
							  $("#teste").append("\n<br>Status Multi (WebDAV)");
							},
						100: function() {
							  $("#teste").append("\n<br>Continuar");
							},
						101: function() {
							  $("#teste").append("\n<br>Mudando protocolos");
							},
						102: function() {
							  $("#teste").append("\n<br>Processamento (WebDAV)");
							},
						122: function() {
							  $("#teste").append("\n<br>Pedido-URI muito longo");
							}
					},
		
		jsonp		: 'listaGfcms',
		beforeSend	: function(){$.mobile.loading('show');},
		complete	: function(){$.mobile.loading('hide');},
		error		: function(jqXHR, strError, txt){
						myJqXHR = jqXHR;
						myStrError = strError;
						myTxt = txt;
						
						$("#teste").append("\n<br>myJqXHR: "+myJqXHR);
						$("#teste").append("\n<br>myJqXHR.statusText: "+myJqXHR.statusText);
						$("#teste").append("\n<br>myStrError: "+myStrError);
						$("#teste").append("\n<br>myTxt: "+myTxt);
						
						if(jqXHR.statusText != "success"){
							$( "#mensagens" ).find( "#mensagem" ).html("Erro ao carregar a lista de GFCMs");
							$( "#mensagens" ).popup();
							$( "#mensagens" ).popup( "open" );
						} else {
							$("#teste").append("\n<br>Lista de GFCMs atualizada!");
						}
					}
	}).then(function(){
		$("#teste").append("\n<br>Then done");
	}).then(function(){
		$("#teste").append("\n<br>Then fail");
	});
});

app.initialize();