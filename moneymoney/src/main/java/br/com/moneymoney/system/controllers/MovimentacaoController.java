package br.com.moneymoney.system.controllers;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.moneymoney.system.conf.CategoriaPropertyEditor;
import br.com.moneymoney.system.daos.CategoriaDAO;
import br.com.moneymoney.system.daos.MovimentacaoDAO;
import br.com.moneymoney.system.models.Categoria;
import br.com.moneymoney.system.models.Movimentacao;

@Controller
@Transactional //add pelo livro
@RequestMapping("/financas")
public class MovimentacaoController {

	@Autowired
	private MovimentacaoDAO daoMov;
	
	@Autowired
	private CategoriaDAO daoCat;
	
	
	@InitBinder
	protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) throws Exception{
		binder.registerCustomEditor(Categoria.class, new  CategoriaPropertyEditor(daoCat));
		
	}
	
	@RequestMapping("/form")
    public ModelAndView form(Movimentacao movimentacao) {
		ModelAndView mv = new ModelAndView("financas/form");
		List<Categoria> listaCategoria = daoCat.listar();
		mv.addObject("listaCategoria", listaCategoria);
        return mv;
    }

	@RequestMapping(method=RequestMethod.POST)
	public ModelAndView gravar(@Valid Movimentacao movimentacao, BindingResult result, RedirectAttributes redirectAttributes){
		
		 if (result.hasErrors()){
		 	return form(movimentacao); 
		 		}
		
		daoMov.gravar(movimentacao);
				
		
		redirectAttributes.addFlashAttribute("sucesso", "Movimentação cadastrado com sucesso!");
		return new ModelAndView("redirect:financas"); 
		
	}
	@RequestMapping(method=RequestMethod.GET)
	public ModelAndView listar(){	
		ModelAndView mv = new ModelAndView("financas/lista");
		List<Movimentacao> listaMovimentacoes = daoMov.listar();
		mv.addObject("listaMovimentacoes", listaMovimentacoes);
		
		//gerando saldo no syso e no lista.jsp
		System.out.println(daoMov.saldo());
		Double saldo = daoMov.saldo();
		mv.addObject("saldo",saldo);
		
		return mv;
	}
	
	@RequestMapping("/removeMovimentacao")
	public ModelAndView remove(Movimentacao movimentacao){
		daoMov.remove(movimentacao);			
        return listar(); 
	}
	
	@RequestMapping("/mostraMovimentacao")
	public ModelAndView mostra(int id, Model model){
		model.addAttribute("movimentacao", daoMov.getPeloId(id));
		ModelAndView mv = new ModelAndView("financas/mostra");
		List<Categoria> listaCategoria = daoCat.listar();
		mv.addObject("listaCategoria", listaCategoria);
        return mv;
	}
	
	@RequestMapping("/alteraMovimentacao")
	public ModelAndView altera(Movimentacao movimentacao){
		System.out.println(movimentacao.getId());
		daoMov.altera(movimentacao);
		ModelAndView mv = listar();
		
		return mv;
	}

	
}
