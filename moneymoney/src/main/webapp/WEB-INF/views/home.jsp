<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
    <%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
    <%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Money Money</title>
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
    <h1>TESTE HOME</h1>
    <p align="center"> https://github.com/marcioJesus/moneymoney </p>
</body>
</html>