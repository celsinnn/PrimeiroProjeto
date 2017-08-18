/* Objeto para registrar e guardar localmente a sess�o da aplica��o 
 */
sessao = {
	autenticado: 0,
	verificacaoEmAndamento: 0, // define se h� "verificaSessao" ( =1 enquanto requisi��o n�o terminar)
	myJqXHR: null,
	
	/* Obt�m o valor de "autenticado", considerando que h� "verificacaoEmAndamento"; Executa "callback" ap�s a verifica��o.
	 */
	getAutenticado: function(callback = function(){}){
		sessao.validaSessao(function(){
			callback(sessao.autenticado);
		});
	},
	
	/* Se o usu�rio e senha digitado na tela de login est�o corretos, registra a sess�o localmente
	 */
	verificaAutenticacao: function(data){
							if(data.success == 1){
								this.autenticado = 1;
								$(":mobile-pagecontainer").pagecontainer( "change", "index.html#pageInicio" );
							} else {
								this.autenticado = 0;
								showMessage("Usu&aacute;rio e senha incorretos.");
							}
						},
	
	/* Chamada ap�s o "validaSessao", para verificar se o usu�rio est� autenticado
	 */
	verificaSessao: function (data){
						if(data.success == 1){
							this.autenticado = 1;
						} else {
							this.autenticado = 0;
							this.sair();
						}
					},
	
	/* Faz requisi��o ao servidor para verificar se o usu�rio est� autenticado
	 */
	validaSessao: function (callback = function(){}){
					if(sessao.verificacaoEmAndamento){
						intervVerifica = setInterval(function(){
							if( ! sessao.verificacaoEmAndamento){
								callback();
								clearInterval(intervVerifica);
							}
						}, 300);
					}
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
										sessao.verificacaoEmAndamento = 0;
										callback();
									},
						error		: function(jqXHR, textStatus, errorThrown){
										sessao.myJqXHR = jqXHR;
										if(jqXHR.statusText != "success" && jqXHR.statusText != "OK"){
											showMessage("Erro ao validar sess&atilde;o.");
										} 
									}
					});
				},
	
	sair: function (){
				this.autenticado = 0;
				activePage = $.mobile.activePage;
				$(":mobile-pagecontainer").pagecontainer( "change", "index.html#pageLogin", {
					role: "dialog",
					changeHash: false
				} );
			}
};

timeoutSessao = {
	intervSessao	: null,
	intervAviso		: null,
	minutos			: null,
	timeout			: 600,
	minAviso		: 120,
	
	finaliza		: function(){
						clearInterval(this.intervSessao);
						clearInterval(timeoutSessao.intervAviso);
						this.minutos = this.timeout;
					},
	
	inicializa		: function(){
						this.finaliza();
						
						if($.mobile.activePage.attr('id') != 'pageTimeout'){
							this.intervSessao = setInterval(function(){
								timeoutSessao.minutos--;
								if(timeoutSessao.minutos == timeoutSessao.minAviso){
									timeoutSessao.showMessageTimeout();
									clearInterval(timeoutSessao.intervSessao);
								}
							}, 1000);
							
						}
						
					},
	
	encerrar		: function(){
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
													sessao.sair();
												} 
											}
							});
						},
						
	showMessageTimeout	: function(){
								$(":mobile-pagecontainer").pagecontainer( "change", "index.html#pageTimeout", { role: "dialog" } );
								
								/*min = this.minAviso;
								seg = 0;*/
								min = 0;
								seg = this.minAviso;
								
								this.intervAviso = setInterval(function(){
									if(seg == 0 && min == 0){
										timeoutSessao.encerrar();
										clearInterval(timeoutSessao.intervAviso);
									}

									if(seg < 10){
										tempo = min + ":0" + seg;
									} else {
										tempo = min + ":" + seg;
									}
									$("#contSessao").html(tempo);

									if(seg == 0){
										min--;
										seg = 59;
									} else {
										seg--;
									}
								}, 1000);
								
								$("#pageTimeout").find("#btnSair").click(function(ev){
									ev.preventDefault();
									timeoutSessao.encerrar();
								});
								
								$("#pageTimeout").find("#btnContinuar").click(function(ev){
									timeoutSessao.inicializa();
									return true;
								});
							},
	
	
};
