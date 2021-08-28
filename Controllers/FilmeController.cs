﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FilmesAPI.Data;
using FilmesAPI.Data.Dtos;
using FilmesAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace FilmesAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class FilmeController : ControllerBase
	{
		private FilmeContext _context;
		private IMapper _mapper;

		public FilmeController(FilmeContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		[HttpPost]
		public IActionResult AdicionaFilme([FromBody] CreateFilmeDto filmeDto)
		{
			Filme filme = _mapper.Map<Filme>(filmeDto);

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

				ReadFilmeDto filmeDto = _mapper.Map<ReadFilmeDto>(filme);

				return Ok(filmeDto);
			}

			return NotFound();
		}

		[HttpPut("{id}")]
		public IActionResult AtualizaFilme(int id, [FromBody] UpdateFilmeDto filmeDto) 
		{
			Filme filme = _context.Filmes.FirstOrDefault(filme => filme.Id == id);

			if (filme == null)
			{
				return Ok(filme);
			}

			_mapper.Map(filmeDto, filme);
			
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
