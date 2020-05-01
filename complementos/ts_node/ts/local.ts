import { writeFile } from 'fs';
writeFile('teste.txt', 'Gravei no arquivo', err => {
    if(err) {
        return console.log('Não foi possível criar o arquivo');
    }
    console.log('arquivo criado com sucesso');
});