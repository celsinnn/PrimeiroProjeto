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



//$(function() {
$(document).on('pageshow',function(){
	//$('#dataNascimento').datepicker();
	$('.cpf').mask('000.000.000-00', {placeholder: "___.___.___-__"});
	
	$("#teste").html("Atualizando a lista de GFCMs utilizando o servidor " + urlServidor);
	
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
		type		: 'GET',
		//url			: urlServidor + '/Gfcms/list',
		url			: urlServidor,
		
		jsonp		: 'listaGfcms',
		dataType	: 'jsonp',
		beforeSend	: function(){$.mobile.loading('show');},
		complete	: function(){$.mobile.loading('hide');},
		success		: function(response){
						$("#teste").append("\n Lista de GFCMs atualizada!");
					},
		error		: function(jqXHR, strError){
						if(jqXHR.statusText != "success"){
							$( "#mensagens" ).find( "#mensagem" ).html("Erro ao carregar a lista de GFCMs");
							$( "#mensagens" ).popup();
							$( "#mensagens" ).popup( "open" );
						} else {
							$("#teste").append("\n<br>Lista de GFCMs atualizada!");
						}
					}
	});
});

app.initialize();