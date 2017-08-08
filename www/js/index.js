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
								$("#statusCodeMessages").find("#mensagem").html("Requisição inválida");
								$("#statusCodeMessages").popup("open");
							},
						401: function() {
								$("#statusCodeMessages").find("#mensagem").html("Não autorizado");
								$("#statusCodeMessages").popup("open");
							},
						402: function() {
								$("#statusCodeMessages").find("#mensagem").html("Pagamento necessário");
								$("#statusCodeMessages").popup("open");
							},
						403: function() {
								$("#statusCodeMessages").find("#mensagem").html("Proibido");
								$("#statusCodeMessages").popup("open");
							},
						404: function() {
								$("#statusCodeMessages").find("#mensagem").html("Não encontrado");
								$("#statusCodeMessages").popup("open");
							},
						405: function() {
								$("#statusCodeMessages").find("#mensagem").html("Método não permitido");
								$("#statusCodeMessages").popup("open");
							},
						406: function() {
								$("#statusCodeMessages").find("#mensagem").html("Não Aceitável");
								$("#statusCodeMessages").popup("open");
							},
						407: function() {
								$("#statusCodeMessages").find("#mensagem").html("Autenticação de proxy necessária");
								$("#statusCodeMessages").popup("open");
							},
						408: function() {
								$("#statusCodeMessages").find("#mensagem").html("Tempo de requisição esgotou (Timeout)");
								$("#statusCodeMessages").popup("open");
							},
						409: function() {
								$("#statusCodeMessages").find("#mensagem").html("Conflito");
								$("#statusCodeMessages").popup("open");
							},
						410: function() {
								$("#statusCodeMessages").find("#mensagem").html("Gone");
								$("#statusCodeMessages").popup("open");
							},
						411: function() {
								$("#statusCodeMessages").find("#mensagem").html("comprimento necessário");
								$("#statusCodeMessages").popup("open");
							},
						412: function() {
								$("#statusCodeMessages").find("#mensagem").html("Pré-condição falhou");
								$("#statusCodeMessages").popup("open");
							},
						413: function() {
								$("#statusCodeMessages").find("#mensagem").html("Entidade de solicitação muito grande");
								$("#statusCodeMessages").popup("open");
							},
						414 : function() {
								$("#statusCodeMessages").find("#mensagem").html("Pedido-URI Too Long");
								$("#statusCodeMessages").popup("open");
							},
						415: function() {
								$("#statusCodeMessages").find("#mensagem").html("Tipo de mídia não suportado");
								$("#statusCodeMessages").popup("open");
							},
						416: function() {
								$("#statusCodeMessages").find("#mensagem").html("Solicitada de Faixa Não Satisfatória");
								$("#statusCodeMessages").popup("open");
							},
						417: function() {
								$("#statusCodeMessages").find("#mensagem").html("Falha na expectativa");
								$("#statusCodeMessages").popup("open");
							},
						418: function() {
								$("#statusCodeMessages").find("#mensagem").html("Eu sou um bule de chá");
								$("#statusCodeMessages").popup("open");
							},
						422: function() {
								$("#statusCodeMessages").find("#mensagem").html("Entidade improcessável (WebDAV)");
								$("#statusCodeMessages").popup("open");
							},
						423: function() {
								$("#statusCodeMessages").find("#mensagem").html("Fechado (WebDAV)");
								$("#statusCodeMessages").popup("open");
							},
						424: function() {
								$("#statusCodeMessages").find("#mensagem").html("Falha de Dependência (WebDAV)");
								$("#statusCodeMessages").popup("open");
							},
						425: function() {
								$("#statusCodeMessages").find("#mensagem").html("coleção não ordenada");
								$("#statusCodeMessages").popup("open");
							},
						426: function() {
								$("#statusCodeMessages").find("#mensagem").html("Upgrade Obrigatório");
								$("#statusCodeMessages").popup("open");
							},
						450: function() {
								$("#statusCodeMessages").find("#mensagem").html("bloqueados pelo Controle de Pais do Windows");
								$("#statusCodeMessages").popup("open");
							},
						499: function() {
								$("#statusCodeMessages").find("#mensagem").html("cliente fechou Pedido (utilizado em ERPs/VPSA)");
								$("#statusCodeMessages").popup("open");
							},
						500: function() {
								$("#statusCodeMessages").find("#mensagem").html("Erro interno do servidor (Internal Server Error)");
								$("#statusCodeMessages").popup("open");
							},
						501: function() {
								$("#statusCodeMessages").find("#mensagem").html("Não implementado (Not implemented)");
								$("#statusCodeMessages").popup("open");
							},
						502: function() {
								$("#statusCodeMessages").find("#mensagem").html("Bad Gateway");
								$("#statusCodeMessages").popup("open");
							},
						503: function() {
								$("#statusCodeMessages").find("#mensagem").html("Serviço indisponível (Service Unavailable)");
								$("#statusCodeMessages").popup("open");
							},
						504: function() {
								$("#statusCodeMessages").find("#mensagem").html("Gateway Time-Out");
								$("#statusCodeMessages").popup("open");
							},
						505: function() {
								$("#statusCodeMessages").find("#mensagem").html("HTTP Version not supported");
								$("#statusCodeMessages").popup("open");
							},
						300: function() {
								$("#statusCodeMessages").find("#mensagem").html("Múltipla escolha");
								$("#statusCodeMessages").popup("open");
							},
						301: function() {
								$("#statusCodeMessages").find("#mensagem").html("Movido");
								$("#statusCodeMessages").popup("open");
							},
						302: function() {
								$("#statusCodeMessages").find("#mensagem").html("Encontrado");
								$("#statusCodeMessages").popup("open");
							},
						404: function() {
								$("#statusCodeMessages").find("#mensagem").html("");
								$("#statusCodeMessages").popup("open");
							},
						304: function() {
								$("#statusCodeMessages").find("#mensagem").html("Não modificado");
								$("#statusCodeMessages").popup("open");
							},
						305: function() {
								$("#statusCodeMessages").find("#mensagem").html("Use Proxy (desde HTTP/1.1)");
								$("#statusCodeMessages").popup("open");
							},
						306: function() {
								$("#statusCodeMessages").find("#mensagem").html("Proxy Switch");
								$("#statusCodeMessages").popup("open");
							},
						307: function() {
								$("#statusCodeMessages").find("#mensagem").html("Redirecionamento temporário (desde HTTP/1.1)");
								$("#statusCodeMessages").popup("open");
							},
						/*200: function() {
								$("#statusCodeMessages").find("#mensagem").html("OK");
								$("#statusCodeMessages").popup("open");
							},*/
						201: function() {
								$("#statusCodeMessages").find("#mensagem").html("Criado");
								$("#statusCodeMessages").popup("open");
							},
						202 : function() {
								$("#statusCodeMessages").find("#mensagem").html("Aceito");
								$("#statusCodeMessages").popup("open");
							},
						203: function() {
								$("#statusCodeMessages").find("#mensagem").html("não-autorizado (desde HTTP/1.1)");
								$("#statusCodeMessages").popup("open");
							},
						204: function() {
								$("#statusCodeMessages").find("#mensagem").html("Nenhum conteúdo");
								$("#statusCodeMessages").popup("open");
							},
						205: function() {
								$("#statusCodeMessages").find("#mensagem").html("Reset");
								$("#statusCodeMessages").popup("open");
							},
						206: function() {
								$("#statusCodeMessages").find("#mensagem").html("Conteúdo parcial");
								$("#statusCodeMessages").popup("open");
							},
						207: function() {
								$("#statusCodeMessages").find("#mensagem").html("Status Multi (WebDAV)");
								$("#statusCodeMessages").popup("open");
							},
						100: function() {
								$("#statusCodeMessages").find("#mensagem").html("Continuar");
								$("#statusCodeMessages").popup("open");
							},
						101: function() {
								$("#statusCodeMessages").find("#mensagem").html("Mudando protocolos");
								$("#statusCodeMessages").popup("open");
							},
						102: function() {
								$("#statusCodeMessages").find("#mensagem").html("Processamento (WebDAV)");
								$("#statusCodeMessages").popup("open");
							},
						122: function() {
								$("#statusCodeMessages").find("#mensagem").html("Pedido-URI muito longo");
								$("#statusCodeMessages").popup("open");
							}
					};

function showMessage(msg){
	selector	= '<div data-role="popup" id="formMessage" class="formMessage">'
				+ '<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" '
				+ 'class="ui-btn-right ui-link ui-btn ui-btn-a ui-icon-delete ui-btn-icon-notext ui-shadow ui-corner-all" role="button">'
				+ 'Close</a><p id="mensagem">'
				+ msg
				+ '</p></div>';
	elem = $(selector);
	elem.popup();
	elem.popup("open");
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
	myJqXHR: null,
	
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
								console.log('redireciona pageInicio');
								//window.location.href="index.html#pageInicio";
								$(":mobile-pagecontainer").pagecontainer( "change", "index.html#pageInicio", { role: "dialog" } );
							} else {
								this.autenticado = 0;
								console.log('open 1');
								console.log(defaultValues.currPage);
								//$("#verificaAutenticacao").popup("open");
								showMessage("Usuário e senha incorretos.");
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
							//window.location.href="index.html#pageLogin";
							$(":mobile-pagecontainer").pagecontainer( "change", "index.html#pageLogin", { role: "dialog" } );
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
										sessao.myJqXHR = jqXHR;
										if(jqXHR.statusText != "success" && jqXHR.statusText != "OK"){
											console.log('open 2');
											console.log(defaultValues.currPage);
											//$("#validaSessao").popup("open");
											showMessage("Erro ao validar sessão.");
										} 
										this.verificacaoEmAndamento = 0;
									}
					});
				},
	
	sair: function (){
				this.autenticado = 0;
				//window.location.href="index.html#pageLogin";
				$(":mobile-pagecontainer").pagecontainer( "change", "index.html#pageLogin", { role: "dialog" } );
			}
};

/* Objeto para registrar e guardar localmente a lista de irmãos pesquisados
 */
irmaos = {
	lista: {},
	selecionado: null,
	
	pesquisaIrmaos:	function(data){
						this.lista = data;
						container = $("#listaIrmaos");
						container.html("");
						
						$.each(data, function(index, value){
							div = $('<div data-role="collapsible">');
							h3 = $('<h3>');
							p = $('<p>');
							
							h3.html(value.ir.nome);
							p.append("<b>RG:</b> " + value.ir.rg + " / ");
							p.append("<b>CPF:</b> " + value.ir.cpf + " / ");
							p.append("<b>Data de Nascimento:</b> " + value.ir.data_nascimento + "<br />");
							p.append("<b>Estado Civil:</b> " + value.ec.estado_civil + " / ");
							p.append("<b>GFCM:</b> " + value.gf.nome);
							
							div.append(h3);
							div.append(p);
							container.append(div);
						});
						
						container.collapsibleset( "refresh" );
						//this.addEvento();
					},
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
						if(obj.find('[value=""]').length > 0){
							vazio = obj.find('[value=""]').clone();
						}
						obj.html("");
						obj.append(vazio);
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
											if(jqXHR.statusText != "success" && jqXHR.statusText != "OK"){
												console.log('open 3');
												console.log(defaultValues.currPage);
												//$("#carregaGfcms").popup("open");
												showMessage("Erro ao carregar lista de GFCMs.");
											} 
										}
						});
					}

};
				
$(function(){
	$("form").submit(function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		
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
							
							if(jqXHR.statusText != "success" && jqXHR.statusText != "OK"){
								console.log('open 4');
								console.log(defaultValues.currPage);
								//$("#formMessage").popup("open");
								showMessage("Erro ao enviar dados do formulário.");
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
								if(jqXHR.statusText != "success" && jqXHR.statusText != "OK"){
									console.log('open 5');
									console.log(defaultValues.currPage);
									console.log(defaultValues.currPage);
									//$("#msgSaida").popup("open");
									showMessage("Erro ao registrar saída. Por favor, tente novamente.");
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
