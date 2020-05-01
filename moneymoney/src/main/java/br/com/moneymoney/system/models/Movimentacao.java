package br.com.moneymoney.system.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
//@EntityListeners(MovimentacaoDAO.class) não usado mais.. nao conseguia persistir com @Post...
public class Movimentacao {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@NotBlank
	private String nome;
	@NotNull
	private Double valor; //colocar melhor tipo depois
	@Column(name="recorrente", nullable=false)
	private boolean recorrente; 
	@ManyToOne
	@JoinColumn(name="categoria_id")
	private Categoria categoria;
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	@Temporal(TemporalType.DATE)
	private Date data;
	@Column(name="recorrenteFeito", nullable=false)
	private boolean recorrenteFeito;
	public Movimentacao() {

	}
	
	public Movimentacao(int id, String nome, Double valor, boolean recorrente,
			Categoria categoria, Date data, boolean recorrenteFeito) {
		super();
		this.id = id;
		this.nome = nome;
		this.valor = valor;
		this.recorrente = recorrente;
		this.categoria = categoria;
		this.data = data;
		this.recorrenteFeito = recorrenteFeito;


	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public Double getValor() {
		return valor;
	}
	public void setValor(Double valor) {
		this.valor = valor;
	}
	public boolean isRecorrente() {
		return recorrente;
	}
	public void setRecorrente(boolean recorrente) {
		this.recorrente = recorrente;
	}
	public Categoria getCategoria() {
		return categoria;
	}
	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}
	
	public boolean isRecorrenteFeito() {
		return recorrenteFeito;
	}

	public void setRecorrenteFeito(boolean recorrenteFeito) {
		this.recorrenteFeito = recorrenteFeito;
	}
	
	@Override
	public String toString() {
		return "Movimentacao [id=" + id + ", nome=" + nome + ", valor=" + valor
				+ ", recorrente=" + recorrente + ", categoria=" + categoria
				+ ", data=" + data + ", recorrenteFeito=" + recorrenteFeito
				+ "]";
	}

	
}
