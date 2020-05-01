package br.com.moneymoney.system.conf;

import java.beans.PropertyEditorSupport;

import br.com.moneymoney.system.daos.CategoriaDAO;
import br.com.moneymoney.system.models.Categoria;


public class CategoriaPropertyEditor extends PropertyEditorSupport{
	 private CategoriaDAO dao;
	 public CategoriaPropertyEditor(CategoriaDAO dao){
		 this.dao = dao;
	 }
	 
	 /*
	  * (non-Javadoc)
	  * @see java.beans.PropertyEditorSupport#setAsText(java.lang.String)
	  * Fazendo a interligação com a FK do categoria quando faz a movimentação
	  */
	 @Override
	public void setAsText(String text) throws IllegalArgumentException {
		//transforma a String com o id em um long
		int id = new Integer(text);
		//recupera no db o perfil do id referido
		Categoria categoria = dao.findByPk(id);
		//add o objeto perfil encontrado no objeto user no controller através do método setValue da super-classe.
		super.setValue(categoria);
	}
}
