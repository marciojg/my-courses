<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MoneyMoney</title>
<!-- Colocar o h1 abaixo da barra de menu -->
<style type="text/css">
body {
	padding: 60px 0px;
}
</style>

<!-- Bootstrap -->
<c:url value="/resources/css" var="cssPath" />
<link rel="stylesheet" href="${cssPath}/bootstrap.min.css">
<link rel="stylesheet" href="${cssPath}/bootstrap-theme.min.css">
<!-- <script src="resources/js/bootstrap.min.js"></script> -->
<!-- Retirado o script por ser Java Scrtip q não será usado agora -->

</head>
<body>
	<!-- Codigo NavBar -->
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="
				#navbar"
					aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span> 
						<span class="icon-bar"></span> 
						<span class="icon-bar"></span> 
						<span class="icon-bar"></span> 
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="${spring:mvcUrl('HC#home').build()}">MoneyMoney</a>
			</div>
			<div id="navbar" class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="${spring:mvcUrl('MC#listar').build()}">Lista dos moneys</a></li>
					<li><a href="${spring:mvcUrl('MC#form').build()}">Fazer movimentação</a></li>
					<li><a href="${spring:mvcUrl('CC#form').build()}">Cadastrar Categorias</a></li>
					<li><a href="${spring:mvcUrl('CC#listar').build()}">Listar Categorias</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<!-- Codigo NavBar -->
	<div class="container">

		<h1>Lista de Movimentações</h1>

		<table
			class="table table-condensed  table table-striped table table-hover">
			<tr>
				<th>Nome</th>
				<th>valor</th>
				<th>recorrente?</th>
				<th>Categoria</th>
				<th>Data</th>
				<th>Remover movimentacão?</th>
				<th>Alterar movimentação?</th>
			</tr>
			<c:forEach items="${listaMovimentacoes}" var="movimentacao">
				<tr>
					<th>${movimentacao.nome}</th>
					<th>${movimentacao.valor}</th>
					<th>${movimentacao.recorrente}</th>
					<th>${movimentacao.categoria.nomeCategoria}</th>
					<!-- tentar usar o fmt format pattern -->
					<th><fmt:formatDate value="${movimentacao.data}"
							pattern="dd/MM/yyyy" /></th> <!-- tinha .time -->
					<td><a
						href="financas/removeMovimentacao?id=${movimentacao.id}">Remover(Refresh
							Manual)</a>
					<td><a href="financas/mostraMovimentacao?id=${movimentacao.id}">Alterar</a>
				</tr>
			</c:forEach>

		</table>
	</div>
	<p align="center" style="font-size: 200%"><c:out value="Saldo" /> <c:out value="${saldo}" /></p>
	<br>
	<p align="center" ><c:forEach items="${listaMovimentacoes}" var="movimentacao2">
		<c:out value="${movimentacao2.id}" />
	</c:forEach></p>
</body>
</html>