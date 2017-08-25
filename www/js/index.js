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
	
	populaDadosPesquisa: function(value){
		html = '';
		
		if(value.ir.rg == null) rg = '' 
		else rg = value.ir.rg;
		html += "<b>RG:</b> " + rg + "<br />";
		
		if(value.ir.cpf == null) {
			cpf = '' 
		} else {
			cpf	= value.ir.cpf.substring(0,3) + '.'
				+ value.ir.cpf.substring(3,6) + '.'
				+ value.ir.cpf.substring(6,9) + '.'
				+ value.ir.cpf.substring(9,11) + '.';
		}
		html += "<b>CPF:</b> " + cpf + "<br />";
		
		if(value.ir.data_nascimento == null) {
			data_nascimento = '';
		} else {
			data_nascimento	= value.ir.data_nascimento.substring(8,10) + '/'
							+ value.ir.data_nascimento.substring(5, 7) + '/'
							+ value.ir.data_nascimento.substring(0, 4)
		}
		html += "<b>Data de Nascimento:</b> " + data_nascimento + "<br />";
		
		if(value.ec.estado_civil == null) estado_civil = '' 
		else estado_civil = value.ec.estado_civil;
		html += "<b>Estado Civil:</b> " + estado_civil + "<br />";
		
		html += "<b>GFCM:</b> " + value.gf.nome;
		
		return html;
	},
	
	editIrmaoSelecionado : function(){
		$("#"+defaultValues.currPage).find("#id").val(this.lista[this.selecionado].ir.id);
		$("#"+defaultValues.currPage).find("#nome").val(this.lista[this.selecionado].ir.nome);
		$("#"+defaultValues.currPage).find("#cpf").val(this.lista[this.selecionado].ir.cpf);
		$("#"+defaultValues.currPage).find("#data_nascimento").val(this.lista[this.selecionado].ir.data_nascimento);
		
		gfcmList.carregaGfcms(function(){
			
			
			esperaAtribuicao = setInterval(function(){
				idSel = irmaos.lista[irmaos.selecionado].gf.id;
				
				htmlIdSel = $("#"+defaultValues.currPage).find("#selGfcm").find('[value="' + idSel + '"]').html()
				if(htmlIdSel === undefined){
					clearInterval(esperaAtribuicao);
				} 
				
				
				$("#"+defaultValues.currPage).find("#selGfcm").val(idSel);//irmaos.lista[irmaos.selecionado].gf.id
				$("#"+defaultValues.currPage).find("#selGfcm").selectmenu('refresh');
				
				if($("#"+defaultValues.currPage).find("#selGfcm").val() === idSel){
					clearInterval(esperaAtribuicao);
				}
			}, 100);
			
			
		});
		
		/*esperaListaGfcm = setInterval(function(){
			if(gfcmList.listaCarregada){
				clearInterval(esperaListaGfcm);
			}
		}, 2000);*/
		
	},
	
	verificaSave: function(data){
		if(data.success){
			showMessage("Os dados foram salvos!");
		} else {
			showMessage("Houve um erro ao tentar salvar os dados. Tente novamente.");
			console.log(data.message);
		}
	},
	
	pesquisaIrmaos:	function(data){
						this.lista = data;
						container = $("#listaIrmaos");
						container.html("");
						
						$.each(data, function(index, value){
							div = $('<div data-role="collapsible">');
							h3 = $('<h3>');
							h3.html(value.ir.nome);
							
							ul = $('<ul data-role="listview" class="ui-listview">');
							li = $('<li class="ui-first-child">');
							a = $('<a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r">');
							a.attr('data-index', index);
							a.css('font-weight', 300);
							
							
							a.append( irmaos.populaDadosPesquisa(value) );
							a.click(function(ev){
								ev.preventDefault();
								irmaos.selecionado = $(this).attr('data-index');
								$(":mobile-pagecontainer").pagecontainer( "change", "index.html#pageEditIrmao" );
							});
							
							li.append(a);
							ul.append(li);
							
							div.append(h3);
							div.append(ul);
							container.append(div);
						});
						
						container.collapsibleset( "refresh" );
					},
}

/* Objeto para obter e guardar localmente a lista de GFCMs
 */
var gfcmList = {
	gfcms : {},
	timeoutGfcm : null,
	listaCarregada : false,
	cargaAndamento: false,
	listaExpira: null,
	
	/* Adiciona a lista de GFCMs no campo "select"
	 */
	listaGfcms : function(data){
					this.gfcms = data;
					/*clearTimeout(this.timeoutGfcm);
					this.timeoutGfcm = setTimeout(function(){ 
						this.gfcms = {};
					}, 60000);*/
					
					obj = $("#"+defaultValues.currPage).find("#selGfcm");
					if(obj.length){
						if(obj.find('[value=""]').length > 0){
							vazio = obj.find('[value=""]').clone();
						}
						obj.html("");
						obj.append(vazio);
						obj.append(vazio);
						$.each(data, function (index, value) {
							obj.append('<option value="' + index + '">' + value + '</option>');
						});
					}
					this.listaCarregada = true;
					this.cargaAndamento = false;
					if(this.listaExpira - (new Date()) < 0){
						this.listaExpira = new Date( (new Date).getTime() + 10000 );
					}
				},
	
	/* Faz requisição ao servidor para obter a lista de GFCMs
	 */
	carregaGfcms : function(callback = null){
						this.listaCarregada = false;
						
						
						// Verifica se já existe lista de GFCMs, e se a mesma não está expirada.
						if(Object.keys(gfcmList.gfcms).length > 0){
							if(gfcmList.listaExpira - (new Date()) > 0){
								gfcmList.listaGfcms(gfcmList.gfcms, defaultValues.currPage);
								if(callback !== null){
									callback();
								}
								return;
							} 
						}
						
						if(this.cargaAndamento){
							return;
						}
						this.cargaAndamento = true;
						
						sessao.getAutenticado(function(autenticado){
							if(autenticado == 1){
								pageParam = 'page:' + defaultValues.currPage + '/' 
								$.ajax({
									url			: defaultValues.urlServidor + '/Gfcms/list/' + pageParam,
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
													
													if(callback !== null){
														esperaCarrLista = setInterval(function(){
															if(gfcmList.listaCarregada){
																callback();
																clearInterval(esperaCarrLista);
															}
														}, 200);
													}
													
													
												},
									error		: function(jqXHR, textStatus, errorThrown){
													myJqXHR = jqXHR;
													if(jqXHR.statusText != "success" && jqXHR.statusText != "OK"){
														showMessage("Erro ao carregar lista de GFCMs.");
													} 
												}
								});
							

							}
						});
		
					}

};

function redirecionaAposNovo(){
	$(":mobile-pagecontainer").pagecontainer( "change", "index.html#pageInicio" );
	showMessage("Os dados do irmão foram salvos!");
}
		
$(function(){
	$("form").submit(function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		
		timeoutSessao.inicializa();
		
		dados = $(this).serialize();
		action = $(this).attr("action");
		jsonpCallback = $(this).attr("data-jsonp");
		callback = $(this).attr("data-callback");
		
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
							eval(callback);
						},
			error		: function(jqXHR, strError, txt){
							if(jqXHR.statusText != "success" && jqXHR.statusText != "OK"){
								showMessage("Erro ao enviar dados do formulário.");
							} 
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
		sessao.validaSessao();
	}
	
	if(defaultValues.currPage == 'pageEditIrmao'){
		irmaos.editIrmaoSelecionado();
	}
	
	if( $("#"+defaultValues.currPage).find("#selGfcm").length ){
		gfcmList.carregaGfcms();
		
		/*sessao.getAutenticado(function(autenticado){
			if(autenticado == 1){
				
			}
		});*/
	}
	
	// $('#dataNascimento').datepicker();
	$('.cpf').mask('000.000.000-00', {placeholder: "___.___.___-__"});
	
	if(defaultValues.currPage != 'pageLogin'){
		// posterga a expiração da sessão para mais 10 minutos
		setExpire("PHPSESSID", 10);
	}
	
	pagesSemTempo = ['pageLogin', 'pageTimeout'];
	isPageSemTempo = pagesSemTempo.indexOf( defaultValues.currPage );
	if(isPageSemTempo == -1){
		timeoutSessao.inicializa();
	} else {
		if(defaultValues.currPage != 'pageTimeout'){
			timeoutSessao.finaliza();
		}
	}
});

app.initialize();
