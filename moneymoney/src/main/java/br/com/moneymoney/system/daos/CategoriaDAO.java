package br.com.moneymoney.system.daos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.From;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.moneymoney.system.models.Categoria;
import br.com.moneymoney.system.models.Movimentacao;


@Repository
@Transactional
public class CategoriaDAO {
	
	@PersistenceContext
	private EntityManager manager;
	
//	private int categoriaIdOriginal;
	private int idCategoria;
	private boolean statusRemove;
	
	public void gravar(Categoria categoria){
		manager.persist(categoria);
	}
	
	/*
	 * Enviando o ID para fazer o many-to-one na classe system.conf.CategoriaProperyEditor
	 */
	public Categoria findByPk(Object id){
		return manager.find(Categoria.class, id);
	}
	
	public Categoria getPeloId(int id){
		return manager.find(Categoria.class, id);
	}

	public List<Categoria> listar() {
		List<Categoria> query = manager.createQuery("select c from Categoria c", Categoria.class).getResultList();
		for (int i=0; i<query.size(); ++i){
			System.out.println("id de cada categoria = " + query.get(i).getId());
			System.out.println("return categoriaID() = " + categoriaID() );
		}		
		return query;
	} 
	
	/*
	 * Verifica quais (se tiver) id Categoria estão sendo usados como fk e devolve uma lista com eles
	 */
	public List<Integer> categoriaID(){
		List<Movimentacao> query = manager.createQuery("select m from Movimentacao m", Movimentacao.class).getResultList();
		List<Integer> listaIdCategoria = new ArrayList<Integer>();
		for (int i=0; i<query.size(); ++i){
			idCategoria = (manager.getReference(Movimentacao.class, query.get(i).getId())).getCategoria().getId();
			listaIdCategoria.add(idCategoria);
		}
		return listaIdCategoria;
	}
	
	/*
	 * Tentando mandar na tela o nome das movimentações que estão usando categorias q ta tentando ser apagada
	 */
/**	public String categoriasUsadas(Categoria categoria){
		if (!categoriaID().contains(categoria.getId())){
			System.out.println("Categoria ID que será removido - " + categoria.getId());
			statusRemove = true;
		}else if(categoriaID().contains(categoria.getId())){
			System.out.println("NÃO FOI REMOVIDO POIS TEM CATEGORIA IGUAL " + categoria.getId());
			statusRemove = false;
		}
		System.out.println(statusRemove);
		return statusRemove;
	} */
	
	/*
	 * Metodo verifica se o id categoria está sendo usado como fk, caso não chama o remove()
	 */
	public boolean verificadorRemove(Categoria categoria){
		if (!categoriaID().contains(categoria.getId())){
			System.out.println("Categoria ID que será removido - " + categoria.getId());
			remove(categoria);
			statusRemove = true;
		}else if(categoriaID().contains(categoria.getId())){
			System.out.println("NÃO FOI REMOVIDO POIS TEM CATEGORIA IGUAL " + categoria.getId());
			statusRemove = false;
		}
		System.out.println(statusRemove);
		return statusRemove;
	}
	
	/*
	 * Metodo pega o resulado do verificadorRemove()
	 */
	public boolean resultadoRemove(){
		return statusRemove;
	}
	
	public void remove(Categoria categoria){
			manager.remove(manager.getReference(Categoria.class, categoria.getId()));
			manager.flush();
	}
	
}
