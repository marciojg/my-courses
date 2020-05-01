package br.com.moneymoney.system.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	@RequestMapping("/")
	public String home(){
		System.out.println("Entrando no Home");
		return "home";
	}

}
