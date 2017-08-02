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
							
//statusCodeMessages = {};
statusCodeMessages = {
						400: function() {
								showMessage("Requisição inválida", 2000);
							},
						401: function() {
								showMessage("Não autorizado", 2000);
							},
						402: function() {
								showMessage("Pagamento necessário", 2000);
							},
						403: function() {
								showMessage("Proibido", 2000);
							},
						404: function() {
								showMessage("Não encontrado", 2000);
							},
						405: function() {
								showMessage("Método não permitido", 2000);
							},
						406: function() {
								showMessage("Não Aceitável", 2000);
							},
						407: function() {
								showMessage("Autenticação de proxy necessária", 2000);
							},
						408: function() {
								showMessage("Tempo de requisição esgotou (Timeout)", 2000);
							},
						409: function() {
								showMessage("Conflito", 2000);
							},
						410: function() {
								showMessage("Gone", 2000);
							},
						411: function() {
								showMessage("comprimento necessário", 2000);
							},
						412: function() {
								showMessage("Pré-condição falhou", 2000);
							},
						413: function() {
								showMessage("Entidade de solicitação muito grande", 2000);
							},
						414 : function() {
								showMessage("Pedido-URI Too Long", 2000);
							},
						415: function() {
								showMessage("Tipo de mídia não suportado", 2000);
							},
						416: function() {
								showMessage("Solicitada de Faixa Não Satisfatória", 2000);
							},
						417: function() {
								showMessage("Falha na expectativa", 2000);
							},
						418: function() {
								showMessage("Eu sou um bule de chá", 2000);
							},
						422: function() {
								showMessage("Entidade improcessável (WebDAV)", 2000);
							},
						423: function() {
								showMessage("Fechado (WebDAV)", 2000);
							},
						424: function() {
								showMessage("Falha de Dependência (WebDAV)", 2000);
							},
						425: function() {
								showMessage("coleção não ordenada", 2000);
							},
						426: function() {
								showMessage("Upgrade Obrigatório", 2000);
							},
						450: function() {
								showMessage("bloqueados pelo Controle de Pais do Windows", 2000);
							},
						499: function() {
								showMessage("cliente fechou Pedido (utilizado em ERPs/VPSA)", 2000);
							},
						500: function() {
								showMessage("Erro interno do servidor (Internal Server Error)", 2000);
							},
						501: function() {
								showMessage("Não implementado (Not implemented)", 2000);
							},
						502: function() {
								showMessage("Bad Gateway", 2000);
							},
						503: function() {
								showMessage("Serviço indisponível (Service Unavailable)", 2000);
							},
						504: function() {
								showMessage("Gateway Time-Out", 2000);
							},
						505: function() {
								showMessage("HTTP Version not supported", 2000);
							},
						300: function() {
								showMessage("Múltipla escolha", 2000);
							},
						301: function() {
								showMessage("Movido", 2000);
							},
						302: function() {
								showMessage("Encontrado", 2000);
							},
						404: function() {
								showMessage("", 2000);
							},
						304: function() {
								showMessage("Não modificado", 2000);
							},
						305: function() {
								showMessage("Use Proxy (desde HTTP/1.1)", 2000);
							},
						306: function() {
								showMessage("Proxy Switch", 2000);
							},
						307: function() {
								showMessage("Redirecionamento temporário (desde HTTP/1.1)", 2000);
							},
						/*200: function() {
								showMessage("OK", 2000);
							},*/
						201: function() {
								showMessage("Criado", 2000);
							},
						202 : function() {
								showMessage("Aceito", 2000);
							},
						203: function() {
								showMessage("não-autorizado (desde HTTP/1.1)", 2000);
							},
						204: function() {
								showMessage("Nenhum conteúdo", 2000);
							},
						205: function() {
								showMessage("Reset", 2000);
							},
						206: function() {
								showMessage("Conteúdo parcial", 2000);
							},
						207: function() {
								showMessage("Status Multi (WebDAV)", 2000);
							},
						100: function() {
								showMessage("Continuar", 2000);
							},
						101: function() {
								showMessage("Mudando protocolos", 2000);
							},
						102: function() {
								showMessage("Processamento (WebDAV)", 2000);
							},
						122: function() {
								showMessage("Pedido-URI muito longo", 2000);
							}
					};
	
//urlServidor = 'http://127.0.0.1/conferencias';
urlServidor = 'http://inscricaoconferenciabh.000webhostapp.com';
//urlServidor = 'http://www.treinasusfacil.mg.gov.br/acompanhamento/relatorio/CRE/CNES_IMP/listagfcms.json';
timeoutDefault = 2000;
tryCountDefault = 0;
retryLimitDefault = 2;
loadingInProcess = 0;
currPage = "";

//myJqXHR = "";
//myTextStatus = "";
//myErrorThrown = "";

countMsg = 0;
function showMessage(mensagem, timeout = 0){ 
	console.log(mensagem);
	
	modelo = $("#"+currPage).find("#mensagens").parent();
	if( ! modelo.length){
		modelo = $("#pageInicio"+currPage).find("#mensagens").parent();
	}
	
	clone = modelo.clone();
	clone.attr("id",  clone.attr("id")+(++countMsg));
	popup = clone.find(".mensagens");
	popup.attr("id",  popup.attr("id")+(countMsg));
	
	console.log(clone.attr("id"));
	console.log(popup.attr("id"));
	
	
	$("#"+currPage).find('[data-role="content"]').append(clone);
	$("#"+currPage).find('[data-role="content"]').append('teste');
	
	
	if(timeout > 0){
		window.setTimeout(function() {
			popup.find("#mensagem").html(mensagem);
			popup.popup();
			popup.popup( "open" );
		}, 10);
	}
	
	
	if(timeout > 0){
		window.setTimeout(function() {
			//popup.popup( "close" );
			//clone.remove();
		}, timeout+10);
	}
}
	
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
		window.location.href="index.html";
	} else {
		autenticado = 0;
		showMessage("Usuário e senha não conferem.");
	}
}

function verificaSessao(data){
	if(data.success == 1){
		autenticado = 1;
	} else {
		autenticado = 0;
		showMessage("Você não está autenticado, por favor efetue login.", 2500);
		window.setTimeout(function() {
			window.location.href="index.html#pageLogin";
		}, 2500);
	}
}

function sair(){
	autenticado = 0;
	window.location.href="index.html#pageLogin";
}

$(function(){
	
	if(autenticado == 1){
		$.ajax({
			url			: urlServidor + '/Gfcms/list',
			//url			: 'http://www.treinasusfacil.mg.gov.br/acompanhamento/relatorio/CRE/CNES_IMP/listagfcms.json',
			//url			: 'http://www.fasfsadfsfsafas.mg.gov.br',
			dataType	: 'jsonp',
			success		: function(response){},
			timeout		: timeoutDefault,
			cache		: false,
			statusCode	: statusCodeMessages,
			jsonp		: 'listaGfcms',
			tryCount	: tryCountDefault,
			retryLimit	: retryLimitDefault,
			beforeSend	: function(){
							loadingInProcess++;
							$.mobile.loading('show');
						},
			complete	: function(){
							loadingInProcess--;
							if(loadingInProcess == 0){
								$.mobile.loading('hide');
							}
						},
			error		: function(jqXHR, textStatus, errorThrown){
				
							//myJqXHR = jqXHR;
							//myTextStatus = textStatus;
							//myErrorThrown = errorThrown;
							
							//$("#teste").append("\n<br>jqXHR: "+jqXHR);
							//$("#teste").append("\n<br>jqXHR.statusText: "+jqXHR.statusText);
							//$("#teste").append("\n<br>textStatus: "+textStatus);
							//$("#teste").append("\n<br>errorThrown: "+errorThrown);
							
							if(jqXHR.statusText != "success"){
								showMessage("Erro ao carregar a lista de GFCMs", 2000);
							} 
							//else {
							//	$("#teste").append("\n<br>Lista de GFCMs atualizada!");
							//}
						}
		});
	}
	$("form").submit(function(ev){
		ev.preventDefault();
		
		dados = $(this).serialize();
		action = $(this).attr("action");
		jsonpCallback = $(this).attr("data-jsonp");
		
		$.ajax({
			type		: 'POST',
			data		: dados,//{ "login" : "admin", "senha" : "conferencias" },
			url			: urlServidor + action, 
			dataType	: 'jsonp',
			success		: function(response){},
			timeout		: timeoutDefault,
			cache		: false,
			statusCode	: statusCodeMessages,
			jsonp		: jsonpCallback,
			tryCount	: tryCountDefault,
			retryLimit	: retryLimitDefault,
			beforeSend	: function(){
							loadingInProcess++;
							$.mobile.loading('show');
						},
			complete	: function(){
							loadingInProcess--;
							if(loadingInProcess == 0){
								$.mobile.loading('hide');
							}
						},
			error		: function(jqXHR, strError, txt){
							
							//$("#teste").append("\n<br>jqXHR: "+jqXHR);
							//$("#teste").append("\n<br>jqXHR.statusText: "+jqXHR.statusText);
							//$("#teste").append("\n<br>strError: "+strError);
							//$("#teste").append("\n<br>txt: "+txt);
							
							if(jqXHR.statusText != "success"){
								showMessage("Erro de autenticacao", 2000);
							} 
							//{
							//	$("#teste").append("\n<br>Erro na autenticação com retorno success");
							//}
						}
		});

	});
	
	$(".btnSair").each(function(){
		$(this).on("click", function(){
			$.ajax({
				url			: urlServidor + '/app/logout',
				dataType	: 'jsonp',
				success		: function(response){},
				timeout		: timeoutDefault,
				cache		: false,
				statusCode	: statusCodeMessages,
				jsonp		: 'sair',
				tryCount	: tryCountDefault,
				retryLimit	: retryLimitDefault,
				beforeSend	: function(){
								loadingInProcess++;
								$.mobile.loading('show');
							},
				complete	: function(){
								loadingInProcess--;
								if(loadingInProcess == 0){
									$.mobile.loading('hide');
								}
							},
				error		: function(jqXHR, textStatus, errorThrown){
								if(jqXHR.statusText != "success"){
									showMessage("Erro ao encerrar a sessão.", 2000);
								} 
							}
			});
		});
	});
	
});
	
	
$(document).on('pageshow',function(){
	currPage = $.mobile.activePage.attr("id");

	if(currPage != 'pageLogin'){
		$.ajax({
			url			: urlServidor + '/app/isLogged',
			dataType	: 'jsonp',
			success		: function(response){},
			timeout		: timeoutDefault,
			cache		: false,
			statusCode	: statusCodeMessages,
			jsonp		: 'verificaSessao',
			tryCount	: tryCountDefault,
			retryLimit	: retryLimitDefault,
			beforeSend	: function(){
							loadingInProcess++;
							$.mobile.loading('show');
						},
			complete	: function(){
							loadingInProcess--;
							if(loadingInProcess == 0){
								$.mobile.loading('hide');
							}
						},
			error		: function(jqXHR, textStatus, errorThrown){
							if(jqXHR.statusText != "success"){
								showMessage("Erro ao validar autenticação de usuário.", 2000);
							} 
						}
		});
	}
	
	if(currPage == 'pageNovoIrmao'){
		//$('#dataNascimento').datepicker();
		$('.cpf').mask('000.000.000-00', {placeholder: "___.___.___-__"});
	}
});

app.initialize();