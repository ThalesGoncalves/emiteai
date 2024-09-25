package com.CadastroPessoasService.DTO.PessoaDto;

import com.CadastroPessoasService.Modelo.Pessoa;
import jakarta.validation.constraints.NotBlank;

import com.CadastroPessoasService.Modelo.Endereco;

public class PessoaDTO {

    @NotBlank(message = "Nome não pode ser vazio")
    private String nome;

    @NotBlank(message = "Telefone não pode ser vazio")
    private String telefone;

    @NotBlank(message = "CPF não pode ser vazio")
    private String cpf;

    Endereco getEndereco;

    public PessoaDTO() {
    }


    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Endereco getEndereco() {
        return getEndereco;
    }

    public void setEndereco(Endereco endereco){

        this.getEndereco = endereco;
    }
}
