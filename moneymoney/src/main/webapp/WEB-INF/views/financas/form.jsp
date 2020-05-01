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
<script src="resources/js/bootstrap.min.js"></script>



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
	
	

	<spring:hasBindErrors name="movimentacaoErrors">
		<ul>
			<c:forEach var="error" items="${errors.allErrors}">
				<li><spring:message code="${error.code}"
						text="${error.defaultMessage}" /></li>
			</c:forEach>
		</ul>
	</spring:hasBindErrors>

		<h1>Fazer movimentação</h1>
		<form:form action="${spring:mvcUrl('MC#gravar').build()}" method="post" commandName="movimentacao">
			<!-- <form action="/visitorsweb/visitantes" method="POST"> -->
			<div class="form-group">
				<label for="nome">Nome Movimentação: </label> 
				<form:input path="nome" cssClass="form-control"/>
				<form:errors path="nome" />
			</div>
			<div class="checkbox">
				<label> <input type="checkbox" name="recorrente" value=true >Recorrente? </label> 			
				<form:errors path="recorrente" />
			</div>
			<div class="form-group">
				<label for="valor">Valor: </label> 
				<form:input path="valor" cssClass="form-control" />
				<form:errors path="valor" />
			</div>
			<div class="form-group">
				<label for="categoria">Selecionar Categoria</label> 
				<form:select method="get" commandName="categoria" path="categoria" multiple="form-control" cssClass="form-control">
				<!-- Label Manual -->
				<c:forEach items="${listaCategoria}" var="listaCategoria">
					<form:option value="${listaCategoria.id}"><c:out value="${listaCategoria.nomeCategoria}"></c:out> </form:option>
				</c:forEach>
				</form:select>
				<form:errors path="categoria" />
			</div>
			<div class="form-group">
				<label for="data">Data: </label> 
				<form:input type="date" path="data" cssClass="form-control" /> 
			</div>
			
			<form:button type="submit" class="btn btn-primary">MOVIMENTAR MONEY!!</form:button>
			

		</form:form>
		
	</div>
</body>
</html>