<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
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
<c:url value="/resources/css" var="cssPath"/>
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
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="
				#navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="${spring:mvcUrl('HC#home').build()}">Money Money</a>
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
	
	

	<spring:hasBindErrors name="CategoriaErrors">
		<ul>
			<c:forEach var="error" items="${errors.allErrors}">
				<li><spring:message code="${error.code}"
						text="${error.defaultMessage}" /></li>
			</c:forEach>
		</ul>
	</spring:hasBindErrors>

		<h1>Categoria</h1>
		<form:form action="${spring:mvcUrl('CC#gravar').build()}" method="post" commandName="categoria">
			<div class="form-group">
				<label for="nomeCategoria">Nome Categoria: </label> 
				<form:input path="nomeCategoria" cssClass="form-control"/>
				<form:errors path="nomeCategoria" />
			</div>			
			<form:button type="submit" class="btn btn-primary">Cadatrar Categoria!!</form:button>
		</form:form>		
	</div>
</body>
</html>