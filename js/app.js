(function() {

	var display = null;

	// Verifica se palavras são iguais
	function strcmp(str1, str2) {
		var i=0;
		while(i < str1.length && str1[i] === str2[i]) {
			i++;
		}
		if(str1[i] > str2[i]) return 1;
		else if(str1[i] < str2[i]) return -1;
		else {
			if(str1.length > str2.length) return 1;
			else if(str1.length < str2.length) return -1;
			else return 0;
		}
	}

	// Função para verificar se tem como abrir arquivo
	function verificaFile() {
		if (window.File && window.FileReader && window.FileList && window.Blob)
			return true;
		else
			return false;
	}

	/* [INI] Fazer leitura do arquivo */
		var leitorDeCSV = new FileReader()
		window.onload = function init() {
		    leitorDeCSV.onload = leCSV;
		}
		function pegaCSV(inputFile) {
			if(verificaFile()) {
			    var file = inputFile.files[0];
			    leitorDeCSV.readAsText(file);
			}
		}
		function leCSV(evt) {
			var fileArr = evt.target.result.split("\n");
			var box = document.getElementById("box_pesquisa");
				box.className = "box-pesquisa ativo";
			var bt = document.getElementById("mostra_texto");
				bt.className = "btn btn-primary mostrar ativo";
			display = new Texto(fileArr);
		}
		document.getElementById("file").addEventListener("change", function() {
			pegaCSV(this);
		});
	/* [FIM] Fazer leitura do arquivo */


	/* [INI] Estrutura de Dados */
		function Texto(array) {
			this.texto = array;
			
			var pesquisa = document.getElementById("pesquisa");
			var self = this;
			document.getElementById("pesquisar").addEventListener("click", function() {
				var teste = self.busca(pesquisa.value);
				if(teste.indice > 0) {
					var html = '<p>Palava encontradao na linha '+teste.indice+', com '+indice.acessos+' tentativas</p>';
				}
			});
		}
		Texto.prototype.busca = function(palavra) {
			var achou = 0;
			var inicio = 0;
			var metade = this.texto.length / 2;
			var fim = this.texto.length - 1;
			var acessos = 0;
			while(!achou) {
				if((fim - metade / 2) !== metade || (metade = metade - inicio / 2) !== metade) {
					console.log(palavra);
					var result = strcmp(this.texto[metade], palavra);
					if(result === 0) {
						achou = 1;
						break;
					} else if(result > 0) {
						inicio = metade;
						metade = fim - metade / 2;
					} else {
						fim = metade;
						metade = metade - inicio / 2;
					}
					acessos++;
				} else {
					break;
				}
			}
			if(!achou) return 0;
			else {
				var dados = {
					acessos: acessos,
					indice: metade
				};
				return dados;
			}
		};
	/* [FIM] Estrutura de Dados */

}());