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