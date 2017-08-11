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
			data		: dados, 
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
									//$("#msgSaida").popup("open");
									showMessage("Erro ao registrar saída. Por favor, tente novamente.");
								} 
							}
			});
		});
	});
	
});

	
$(document).on('pagechange',function(){
	defaultValues.currPage = $.mobile.activePage.attr("id");
	
	if(defaultValues.currPage != 'pageLogin'){
		//debugger;
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
	
	if(defaultValues.currPage != 'pageLogin'){
		// posterga a expiração da sessão para mais 10 minutos
		setExpire("PHPSESSID", 10);
	}
	
	if($.mobile.activePage.attr('id') != 'pageLogin'){
		timeoutSessao.inicializa();
	} else {
		timeoutSessao.finaliza();
	}
});


app.initialize();
