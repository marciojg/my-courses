package br.com.moneymoney.system.controllers;


import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.moneymoney.system.daos.CategoriaDAO;
import br.com.moneymoney.system.daos.MovimentacaoDAO;
import br.com.moneymoney.system.models.Categoria;
import br.com.moneymoney.system.models.Movimentacao;

@Controller
@Transactional //add pelo livro
@RequestMapping("/categorias")
@ControllerAdvice
public class CategoriaController {

	@Autowired
	private CategoriaDAO daoCat;
	@Autowired
	private MovimentacaoDAO daoMov;
	@Autowired
	private MovimentacaoController mvcrl;
	
	private boolean verificador;
	

	@RequestMapping("/form")
    public ModelAndView form(Categoria categoria) {
		ModelAndView mv = new ModelAndView("categorias/form");
        return mv;
    }

	@RequestMapping(method=RequestMethod.POST)
	public ModelAndView gravar(@Valid Categoria categoria, BindingResult result, RedirectAttributes redirectAttributes){
		if (result.hasErrors()){
		 	return form(categoria); 
		 		}
		
		daoCat.gravar(categoria);
		redirectAttributes.addFlashAttribute("sucesso", "Categoria cadastrado com sucesso!");
		return new ModelAndView("redirect:categorias");
		
	}
	/*
	 * Este método recebe o get da pagina depois do metodo gravar, direcionando para a lista de movimentações
	 */
	@RequestMapping(method=RequestMethod.GET)
	public ModelAndView listar(){	
		ModelAndView mv = new ModelAndView("categorias/lista");
		List<Categoria> listaCategorias = daoCat.listar();
		mv.addObject("listaCategorias", listaCategorias);
				
		return mv;
	}
	
	public ModelAndView listarComErro(Model model){	
		ModelAndView mv = new ModelAndView("categorias/lista");
		List<Categoria> listaCategorias = daoCat.listar();
		//model.addAttribute("msgErro", "Esta categoria está sendo usada, favor excluir a movimentação vinculada " + " ID de categorias sendo usadas " + daoCat.categoriaID());
		model.addAttribute("msgErro", "Esta categoria está sendo usada, favor excluir a movimentação vinculada");
		mv.addObject("listaCategorias", listaCategorias);
				
		return mv;
	}
			
	@RequestMapping("/removeCategoria")
	public ModelAndView remove(Categoria categoria, Model model){	
		ModelAndView mv = null;
		daoCat.verificadorRemove(categoria);
		if(daoCat.resultadoRemove() == false){
			mv = listarComErro(model);
		} else if (daoCat.resultadoRemove() == true) {
			mv = listar();
		}			
	return mv;
	}
	
	/**	
	@RequestMapping("/removeCategoria")
	public ModelAndView remove(Categoria categoria){
		daoCat.verificador(categoria);
		return listar();
	}
	*/
	
			/**
		@RequestMapping("/removeCategoria")
	public ModelAndView remove(Categoria categoria){
		daoCat.remove(categoria);
		
        return listar(); 
	}
 */
}
