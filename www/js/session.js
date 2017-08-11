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
								//setCookie()
								//window.location.href="index.html#pageInicio";
								$(":mobile-pagecontainer").pagecontainer( "change", "index.html#pageInicio" );
							} else {
								this.autenticado = 0;
								//$("#verificaAutenticacao").popup("open");
								showMessage("Usuário e senha incorretos.");
							}
						},
	
	/* Chamada após o "validaSessao", para verificar se o usuário está autenticado
	 */
	verificaSessao: function (data){
						if(data.success == 1){
							this.autenticado = 1;
						} else {
							this.autenticado = 0;
							//window.location.href="index.html#pageLogin";
							/*pageContainer = $(":mobile-pagecontainer");
							pageContainer.pagecontainer( "change", "index.html#pageLogin", { role: "dialog" } );*/
							this.sair();
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
									},
						error		: function(jqXHR, textStatus, errorThrown){
										sessao.myJqXHR = jqXHR;
										if(jqXHR.statusText != "success" && jqXHR.statusText != "OK"){
											//$("#validaSessao").popup("open");
											showMessage("Erro ao validar sessão.");
										} 
									}
					});
				},
	
	sair: function (){
				this.autenticado = 0;
				//window.location.href="index.html#pageLogin";
				activePage = $.mobile.activePage;
				//$(":mobile-pagecontainer").pagecontainer( "change", "index.html#pageLogin" );
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
	//segundos		: null,
	timeout			: 10,
	minAviso		: 2,
	//inicializado	: false,
	
	finaliza		: function(){
						clearInterval(this.intervSessao);
						clearInterval(timeoutSessao.intervAviso);
						this.minutos = this.timeout;
						//this.segundos= this.timeout*60;
					},
	
	inicializa		: function(){
						this.finaliza();
						
						if($.mobile.activePage.attr('id') != 'pageTimeout'){
							this.intervSessao = setInterval(function(){
								/*timeoutSessao.segundos--;
								if(timeoutSessao.segundos%60 == 59){
									timeoutSessao.minutos--;
								}*/
								timeoutSessao.minutos--;
								if(timeoutSessao.minutos == timeoutSessao.minAviso/* && timeoutSessao.segundos%60 == 0*/){
									timeoutSessao.showMessageTimeout();
									clearInterval(timeoutSessao.intervSessao);
									clearInterval(this);
								}
							}, 60000);
							
						}
						
					},
	
	encerrar		: function(){
							clearInterval(timeoutSessao.intervSessao);
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
						
							//this.inicializado = false;
						},
						
	showMessageTimeout	: function(){
								$(":mobile-pagecontainer").pagecontainer( "change", "index.html#pageTimeout", { role: "dialog" } );
								
								min=this.minAviso;
								seg=0;
								this.intervAviso = setInterval(function(){
									if(seg == 0 && min == 0){
										timeoutSessao.encerrar();
										clearInterval(timeoutSessao.intervAviso);
										clearInterval(this);
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
