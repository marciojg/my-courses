using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilmesAPI.Data;
using FilmesAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace FilmesAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class FilmeController : ControllerBase
	{
		private FilmeContext _context;

		public FilmeController(FilmeContext context)
		{
			_context = context;
		}

		[HttpPost]
		public IActionResult AdicionaFilme([FromBody] Filme filme)
		{
			_context.Add(filme);
			_context.SaveChanges();
			return CreatedAtAction(nameof(RecuperaFilmesPorId), new { Id = filme.Id }, filme);

		}

		[HttpGet]
		public IActionResult RecuperaFilmes()
		{
			return Ok(_context.Filmes);
		}

		[HttpGet("{id}")]
		public IActionResult RecuperaFilmesPorId(int id)
		{
			Filme filme = _context.Filmes.FirstOrDefault(filme => filme.Id == id);

			if (filme != null) {
				return Ok(filme);
			}

			return NotFound();
		}

		[HttpPut("{id}")]
		public IActionResult AtualizaFilme(int id, [FromBody] Filme newFilme) 
		{
			Filme filme = _context.Filmes.FirstOrDefault(filme => filme.Id == id);

			if (filme == null)
			{
				return Ok(filme);
			}

			filme.Titulo = newFilme.Titulo;
			filme.Genero = newFilme.Genero;
			filme.Diretor = newFilme.Diretor;
			filme.Duracao = newFilme.Duracao;
			
			_context.SaveChanges();

			return NoContent();
		}

		[HttpDelete("{id}")]
		public IActionResult RemoveFilme(int id)
		{
			Filme filme = _context.Filmes.FirstOrDefault(filme => filme.Id == id);

			if (filme == null)
			{
				return Ok(filme);
			}

			_context.Remove(filme);
			_context.SaveChanges();

			return NoContent();
		}
	}
}
