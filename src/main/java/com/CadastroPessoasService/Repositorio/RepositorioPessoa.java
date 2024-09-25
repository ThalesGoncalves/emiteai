package com.CadastroPessoasService.Repositorio;

import com.CadastroPessoasService.Modelo.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepositorioPessoa extends JpaRepository<Pessoa, Long> {
    Optional<Pessoa> findByCpf(String cpf);
    boolean existsByCpf(String cpf);
}
