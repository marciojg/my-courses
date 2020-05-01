package br.com.moneymoney.system.daos;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.moneymoney.system.models.Movimentacao;
import br.com.moneymoney.system.models.Categoria;


@Repository
@Transactional
public class MovimentacaoDAO {
	
	
	@PersistenceContext
	private EntityManager manager;
	
	public int idCategoria;
	
	
	public void gravar(Movimentacao movimentacao){
		System.out.println("syso do gravar: " + movimentacao.getData());
		manager.persist(movimentacao);
		manager.flush();
		manager.close();


	}

	public List<Movimentacao> listar() {
		List<Movimentacao> query = manager.createQuery("select m from Movimentacao m", Movimentacao.class).getResultList();
		for (int i=0; i<query.size(); ++i){
			System.out.println("ENTROU" + query.get(i).getId());	
			System.out.println((manager.getReference(Movimentacao.class, query.get(i).getId())).getCategoria().getNomeCategoria());
			idCategoria = (manager.getReference(Movimentacao.class, query.get(i).getId())).getCategoria().getId();
			System.out.println("ID Categoria" + idCategoria);
			movimentacaoPostLoad(manager.getReference(Movimentacao.class, query.get(i).getId()));
		}

		return query;

	} 
	
	//gera saldo
	public Double saldo(){
		Query query = manager.createQuery("select sum(valor) from Movimentacao");
		Double soma = (Double) query.getSingleResult();
		return soma;
	}
	
	public void remove(Movimentacao movimentacao) {		
		manager.remove(manager.getReference(Movimentacao.class, movimentacao.getId()));
		manager.flush();
	}
	
	public Movimentacao getPeloId(int id){
		return manager.find(Movimentacao.class, id);
	}

	public void altera(Movimentacao movimentacao) {
		manager.merge(movimentacao);
		manager.flush();
	}
	
	
	public void movimentacaoPostLoad(Movimentacao movimentacao){
		if (movimentacao.isRecorrente() == true && movimentacao.isRecorrenteFeito() == false){
			System.out.println("POST LOAD == " + movimentacao.getId());
	     		//quando entrar aqui precisa pegar a data setada e agendar para daqui a 30 dias persistir novamente com a data atual
				Date dataGet = (Date) movimentacao.getData(); //pega data persistida
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(movimentacao.getData());
				calendar.add(Calendar.DAY_OF_MONTH, 30); //usando calendar.getTime() pega data persistida + 1 mes
				System.out.println("DataGet + 1 Mes: " + calendar.getTime());
				Date dataOnline = new Date(); //pega data online do pc
				SimpleDateFormat ft = new SimpleDateFormat("dd.MM.yyyy");
				System.out.println("ANTES DO IF (dataOnline): - " + ft.format(dataOnline));
				System.out.println("ANTES DO IF (dataGet): - " + ft.format(dataGet));
				System.out.println("ANTES DO IF (dataGet+1Month): - " + ft.format(calendar.getTime())); //data setada + 1 mes
					if (ft.format(calendar.getTime()).equals(ft.format(dataOnline))){
						System.out.println("IRMÃO ENTROU NO IF");
						System.out.println("DEPOIS DO IF (dataOnline): - " + ft.format(dataOnline));
						System.out.println("DEPOIS DO IF (dataGet): - " + ft.format(dataGet));
						System.out.println("DEPOIS DO IF (dataGet+1Month): - " + ft.format(calendar.getTime()));
						Movimentacao movimentacao2 = new Movimentacao();
						System.out.println("Vem ate aqui - ");
						System.out.println("ID GET> " + movimentacao2.getId());
						movimentacao2.setNome(movimentacao.getNome());
					    System.out.println("Vem ate aqui - " + movimentacao2.getNome());
					    movimentacao2.setRecorrente(movimentacao.isRecorrente());
					    System.out.println("Vem ate aqui - " + movimentacao2.isRecorrente());
					    movimentacao2.setValor(movimentacao.getValor());
					    System.out.println("Vem ate aqui - " + movimentacao2.getValor());
					    movimentacao2.setCategoria(movimentacao.getCategoria());
					    System.out.println("Vem ate aqui - " + movimentacao2.getCategoria().getId());
					    movimentacao2.setData(calendar.getTime());
					    System.out.println("Vem ate aqui - " + movimentacao2.getData());
					    manager.persist(movimentacao2);
					    movimentacao.setRecorrenteFeito(true);
						altera(movimentacao);
					}		
				
			} else {
			System.out.println("nao eh recorrente ou não é mais para ser recorrente " + movimentacao.getId());
			}
	}
	
}
