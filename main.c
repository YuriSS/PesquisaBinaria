#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <math.h>
#include <string.h>

int PB(char lista[29858][200], char palavra[200], int inicio, int fim, int* times) {
	if(inicio < fim) {
		float calc = (fim + inicio) / 2;
		int centro = (int)calc;
		if(strcmp(palavra, lista[centro]) == 0) {
			return centro + 1;
		} else if(strcmp(palavra, lista[centro]) < 0) {
			times++;
			fim = centro;
			return PB(lista, palavra, inicio, fim, times);
		} else {
			times++;
			inicio = centro + 1;
			return PB(lista, palavra, inicio, fim, times);
		}
	} else {
		return 0;
	}
}

void toUpperCase(char string[200]) {
	int i = 0;
	char ch;
	while(string[i]) {
		ch = toupper(string[i]);
		string[i] = ch;
		i++;
	}
}

int main() {

	char texto[29858][200];
	char palavra[200];
	int i = 0;
	int times = 0;
	FILE* file = fopen("palavras.txt", "r");
	while(fscanf(file, "%s", texto[i]) != EOF) {
		i++;
	}
	fclose(file);

	printf("Escreva uma palavra para ser encontrada no texto:\n> ");
	scanf("%s", palavra);

	toUpperCase(palavra);

	i--;
	int busca = PB(texto, palavra, 0, i, &times);

	if(busca > 0)
		printf("\nPalavra (%s) encontrada na linha %d com %d tentativas\n\n", palavra, busca, times);
	else
		printf("\nPalavra (%s) nao encontrada...\n\n", palavra);

	return 0;

}
