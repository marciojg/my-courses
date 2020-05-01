# my-courses
Repositório destinado a guardar os códigos fontes produzidos nos cursos que fiz. Separado por branch

# Para adicionar mais um siga esta sequencia de exemplo

```
git checkout -b nome-da-linguagem-mais-complemento

git remote add -f alurabank ~/Desktop/projects/curso-ts/alurabank/

git merge alurabank/master --allow-unrelated-histories

echo "Comentário sobre o código do curso" > README.md

git add .

git commit -m "Adicionado curso xxxxx"

git push --set-upstream origin nome-da-linguagem-mais-complemento
```

# Sequencia para editar o README.md da master

```
git checkout master

echo 'blabla' >> README.md

git add .

git commit --amend --no-edit

git push --force
```
