package br.com.moneymoney.system.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import org.hibernate.annotations.Cascade;
import org.hibernate.validator.constraints.NotBlank;

@Entity
public class Categoria {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@NotBlank
	private String nomeCategoria;	
	@OneToMany(mappedBy="categoria", cascade = CascadeType.ALL, fetch = FetchType.LAZY )
	//@OneToMany( mappedBy="categoria", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.LAZY )
	@OrderBy("nome ASC")
	private List<Movimentacao> listaMovimentacoes;
		
	public Categoria(){
		listaMovimentacoes = new ArrayList<Movimentacao>();
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNomeCategoria() {
		return nomeCategoria;
	}
	public void setNomeCategoria(String nomeCategoria) {
		this.nomeCategoria = nomeCategoria;
	} 
	/**
	 * Criação da fk de Categoria dentro da table movimentacao
	 */
	public Collection<Movimentacao> getListaMovimentacoes(){
		return listaMovimentacoes;
	} 
	/**
	 * Criação da fk de Categoria dentro da table movimentacao
	 */
		public void addMovimentacao(Movimentacao movimentacao){
		if(!getListaMovimentacoes().contains(movimentacao)){
			getListaMovimentacoes().add(movimentacao);
			if (movimentacao.getCategoria() != null){
				movimentacao.getCategoria().getListaMovimentacoes().remove(movimentacao);
			}
			movimentacao.setCategoria(this);
		}
	} 
}
