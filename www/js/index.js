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
								alert("Requisição inválida");
							},
						401: function() {
								alert("Não autorizado");
							},
						402: function() {
								alert("Pagamento necessário");
							},
						403: function() {
								alert("Proibido");
							},
						404: function() {
								alert("Não encontrado");
							},
						405: function() {
								alert("Método não permitido");
							},
						406: function() {
								alert("Não Aceitável");
							},
						407: function() {
								alert("Autenticação de proxy necessária");
							},
						408: function() {
								alert("Tempo de requisição esgotou (Timeout)");
							},
						409: function() {
								alert("Conflito");
							},
						410: function() {
								alert("Gone");
							},
						411: function() {
								alert("comprimento necessário");
							},
						412: function() {
								alert("Pré-condição falhou");
							},
						413: function() {
								alert("Entidade de solicitação muito grande");
							},
						414 : function() {
								alert("Pedido-URI Too Long");
							},
						415: function() {
								alert("Tipo de mídia não suportado");
							},
						416: function() {
								alert("Solicitada de Faixa Não Satisfatória");
							},
						417: function() {
								alert("Falha na expectativa");
							},
						418: function() {
								alert("Eu sou um bule de chá");
							},
						422: function() {
								alert("Entidade improcessável (WebDAV)");
							},
						423: function() {
								alert("Fechado (WebDAV)");
							},
						424: function() {
								alert("Falha de Dependência (WebDAV)");
							},
						425: function() {
								alert("coleção não ordenada");
							},
						426: function() {
								alert("Upgrade Obrigatório");
							},
						450: function() {
								alert("bloqueados pelo Controle de Pais do Windows");
							},
						499: function() {
								alert("cliente fechou Pedido (utilizado em ERPs/VPSA)");
							},
						500: function() {
								alert("Erro interno do servidor (Internal Server Error)");
							},
						501: function() {
								alert("Não implementado (Not implemented)");
							},
						502: function() {
								alert("Bad Gateway");
							},
						503: function() {
								alert("Serviço indisponível (Service Unavailable)");
							},
						504: function() {
								alert("Gateway Time-Out");
							},
						505: function() {
								alert("HTTP Version not supported");
							},
						300: function() {
								alert("Múltipla escolha");
							},
						301: function() {
								alert("Movido");
							},
						302: function() {
								alert("Encontrado");
							},
						404: function() {
								alert("");
							},
						304: function() {
								alert("Não modificado");
							},
						305: function() {
								alert("Use Proxy (desde HTTP/1.1)");
							},
						306: function() {
								alert("Proxy Switch");
							},
						307: function() {
								alert("Redirecionamento temporário (desde HTTP/1.1)");
							},
						/*200: function() {
								alert("OK");
							},*/
						201: function() {
								alert("Criado");
							},
						202 : function() {
								alert("Aceito");
							},
						203: function() {
								alert("não-autorizado (desde HTTP/1.1)");
							},
						204: function() {
								alert("Nenhum conteúdo");
							},
						205: function() {
								alert("Reset");
							},
						206: function() {
								alert("Conteúdo parcial");
							},
						207: function() {
								alert("Status Multi (WebDAV)");
							},
						100: function() {
								alert("Continuar");
							},
						101: function() {
								alert("Mudando protocolos");
							},
						102: function() {
								alert("Processamento (WebDAV)");
							},
						122: function() {
								alert("Pedido-URI muito longo");
							}
					};

/* Valores padrão 
 */
var defaultValues = {
	// urlServidor : 'http://127.0.0.1/conferencias',
	urlServidor : 'http://inscricaoconferenciabh.000webhostapp.com',
	// urlServidor : 'http://www.treinasusfacil.mg.gov.br/acompanhamento/relatorio/CRE/CNES_IMP/listagfcms.json',
	timeoutDefault : 10000,
	tryCountDefault : 0,
	retryLimitDefault : 5,
	loadingInProcess : 0,
	currPage : ""
}

/* Objeto para registrar e guardar localmente a sessão da aplicação 
 */
sessao = {
	autenticado: 0,
	verificacaoEmAndamento: 0, // define se há "verificaSessao" ( =1 enquanto requisição não terminar)
	
	/* Obtém o valor de "autenticado", considerando que há "verificacaoEmAndamento"; Executa "callback" após a verificação.
	 */
	getAutenticado: function(callback){
		var intervalo = setInterval(function(){
			if(sessao.verificacaoEmAndamento == 0){
				clearInterval(intervalo);
				callback(sessao.autenticado);
			}
		}, 200);
	},
	
	/* Se o usuário e senha digitado na tela de login estão corretos, registra a sessão localmente
	 */
	verificaAutenticacao: function(data){
							if(data.success == 1){
								this.autenticado = 1;
								window.location.href="index.html";
							} else {
								this.autenticado = 0;
								alert("Usuário e senha não conferem.");
							}
						},
	
	/* Chamada após o "validaSessao", para verificar se o usuário está autenticado
	 */
	verificaSessao: function (data){
						this.verificacaoEmAndamento = 0;
						if(data.success == 1){
							this.autenticado = 1;
						} else {
							this.autenticado = 0;
							window.location.href="index.html#pageLogin";
						}
					},
	
	/* Faz requisição ao servidor para verificar se o usuário está autenticado
	 */
	validaSessao: function (){
					this.verificacaoEmAndamento = 1;
					$.ajax({
						url			: defaultValues.urlServidor + '/app/isLogged/',
						dataType	: 'jsonp',
						success		: function(response){},
						timeout		: defaultValues.timeoutDefault,
						cache		: false,
						statusCode	: statusCodeMessages,
						jsonp		: 'verificaSessao',
						tryCount	: defaultValues.tryCountDefault,
						retryLimit	: defaultValues.retryLimitDefault,
						beforeSend	: function(jqXHR, settings){
										jsonpCallback = settings.jsonpCallback;
										settings.url = settings.url.replace(jsonpCallback, settings.jsonp)
										urlArr = settings.url.split("?");
										urlArr[1] = urlArr[1].replace(new RegExp('&', 'g'), '/').replace(new RegExp('=', 'g'), ':');
										settings.url = urlArr[0] + urlArr[1];
										
										defaultValues.loadingInProcess++;
										$.mobile.loading('show');
									},
						complete	: function(){
										defaultValues.loadingInProcess--;
										if(defaultValues.loadingInProcess == 0){
											$.mobile.loading('hide');
										}
										this.verificacaoEmAndamento = 0;
									},
						error		: function(jqXHR, textStatus, errorThrown){
										if(jqXHR.statusText != "success"){
											alert("Erro ao validar autenticação de usuário.");
										} 
										this.verificacaoEmAndamento = 0;
									}
					});
				},
	
	sair: function (){
				this.autenticado = 0;
				window.location.href="index.html#pageLogin";
			}
};

dataTeste = {};
function pesquisaIrmaos(data){
	dataTeste = data;
	
	$("#resultadoPesquisa").html("");
	inicioLista = $('<ul data-role="listview" class="ui-listview">');
	$("#resultadoPesquisa").append(inicioLista);
	
	$.each(data, function(index, value){
		itemStr	 = '<li><a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r">';
		itemStr	+= value.ir.nome
		itemStr	+= '</a></li>';
		item = $(itemStr);
		
		if(index == 1){
			item.addClass("ui-first-child");
		}
		if(index == data.length){
			item.addClass("ui-last-child");
		}
		
		inicioLista.append(item);
	});
	
	//fimLista = $('</ul>');
	$("#resultadoPesquisa").append(fimLista);
}

/* Objeto para obter e guardar localmente a lista de GFCMs
 */
var gfcmList = {
	gfcms : {},
	timeoutGfcm : null,
	
	/* Adiciona a lista de GFCMs no campo "select"
	 */
	listaGfcms : function(data, page = ''){
					this.gfcms = data;
					
					clearTimeout(this.timeoutGfcm);
					this.timeoutGfcm = setTimeout(function(){ 
						this.gfcms = {};
					}, 60000);
					
					if(page == ''){
						obj = $("#selGfcm");
					} else {
						obj = $("#"+page).find("#selGfcm");
					}
					if(obj.length){
						obj.html("");
						$.each(data, function (index, value) {
							obj.append('<option value="' + index + '">' + value + '</option>');
						});
					}
				},
	
	/* Faz requisição ao servidor para obter a lista de GFCMs
	 */
	carregaGfcms : function(page = ''){
						if(Object.keys(this.gfcms).length > 0){
							gfcmList.listaGfcms(this.gfcms, page);
							return;
						}
						
						if(page != '') { page = 'page:' + page + '/' };
						
						$.ajax({
							url			: defaultValues.urlServidor + '/Gfcms/list/' + page,
							// url			: 'http://www.treinasusfacil.mg.gov.br/acompanhamento/relatorio/CRE/CNES_IMP/listagfcms.json',
							// url			: 'http://www.fasfsadfsfsafas.mg.gov.br',
							dataType	: 'jsonp',
							success		: function(response){},
							timeout		: defaultValues.timeoutDefault,
							cache		: true,
							statusCode	: statusCodeMessages,
							jsonp		: 'listaGfcms',
							tryCount	: defaultValues.tryCountDefault,
							retryLimit	: defaultValues.retryLimitDefault,
							beforeSend	: function(jqXHR, settings){
											jsonpCallback = settings.jsonpCallback;
											/*p1 = jqXHR;
											p2 = settings;
											jsonpCallback = getParameterByName(settings.jsonp, settings.url);
											console.log('jsonpCallback: '+jsonpCallback)
											settings.url = settings.url.replace(settings.jsonpCallback, settings.jsonp)
											*/
											settings.url = settings.url.replace(jsonpCallback, settings.jsonp)
											urlArr = settings.url.split("?");
											/* urlArr[1] = urlArr[1].replace("&", "/").replace("=", ":");
											 eval("settings."+jsonpCallback+"=false;");
											*/
											urlArr[1] = urlArr[1].replace(new RegExp('&', 'g'), '/').replace(new RegExp('=', 'g'), ':');
											settings.url = urlArr[0] + urlArr[1];
											
											defaultValues.loadingInProcess++;
											$.mobile.loading('show');
										},
							complete	: function(){
											defaultValues.loadingInProcess--;
											if(defaultValues.loadingInProcess == 0){
												$.mobile.loading('hide');
											}
										},
							error		: function(jqXHR, textStatus, errorThrown){
											myJqXHR = jqXHR;
											if(jqXHR.statusText != "success"){
												alert("Erro ao carregar a lista de GFCMs");
											} 
										}
						});
					}

};
					
$(function(){
	$("form").submit(function(ev){
		ev.preventDefault();
		dados = $(this).serialize();
		action = $(this).attr("action");
		jsonpCallback = $(this).attr("data-jsonp");
		
		$.ajax({
			type		: 'POST',
			data		: dados, // { "login" : "admin", "senha" : "conferencias" },
			url			: defaultValues.urlServidor + action, 
			dataType	: 'jsonp',
			success		: function(response){},
			timeout		: defaultValues.timeoutDefault,
			cache		: false,
			statusCode	: statusCodeMessages,
			jsonp		: jsonpCallback,
			tryCount	: defaultValues.tryCountDefault,
			retryLimit	: defaultValues.retryLimitDefault,
			beforeSend	: function(){
							defaultValues.loadingInProcess++;
							$.mobile.loading('show');
						},
			complete	: function(){
							defaultValues.loadingInProcess--;
							if(defaultValues.loadingInProcess == 0){
								$.mobile.loading('hide');
							}
						},
			error		: function(jqXHR, strError, txt){
							
							// $("#teste").append("\n<br>jqXHR: "+jqXHR);
							// $("#teste").append("\n<br>jqXHR.statusText: "+jqXHR.statusText);
							// $("#teste").append("\n<br>strError: "+strError);
							// $("#teste").append("\n<br>txt: "+txt);
							
							if(jqXHR.statusText != "success"){
								alert("Erro de autenticacao");
							} 
							// {
							//	$("#teste").append("\n<br>Erro na autenticação com retorno success");
							// }
						}
		
		});
		
		
		
		
	});
	
	$(".btnSair").each(function(){
		$(this).on("click", function(){
			$.ajax({
				url			: defaultValues.urlServidor + '/app/logout',
				dataType	: 'jsonp',
				success		: function(response){},
				timeout		: defaultValues.timeoutDefault,
				cache		: false,
				statusCode	: statusCodeMessages,
				jsonp		: 'sair',
				tryCount	: defaultValues.tryCountDefault,
				retryLimit	: defaultValues.retryLimitDefault,
				beforeSend	: function(){
								defaultValues.loadingInProcess++;
								$.mobile.loading('show');
							},
				complete	: function(){
								defaultValues.loadingInProcess--;
								if(defaultValues.loadingInProcess == 0){
									$.mobile.loading('hide');
								}
							},
				error		: function(jqXHR, textStatus, errorThrown){
								if(jqXHR.statusText != "success"){
									alert("Erro ao encerrar a sessão.");
								} 
							}
			});
		});
	});
	
});
	
$(document).on('pageshow',function(){
	defaultValues.currPage = $.mobile.activePage.attr("id");
	
	if(defaultValues.currPage != 'pageLogin'){
		sessao.validaSessao();
	}
	
	if($('div.ui-content').find("#selGfcm").length){
		sessao.getAutenticado(function(autenticado){
			if(autenticado == 1){
				gfcmList.carregaGfcms(defaultValues.currPage);
			}
		});
	}
	
	// $('#dataNascimento').datepicker();
	$('.cpf').mask('000.000.000-00', {placeholder: "___.___.___-__"});
});

app.initialize();