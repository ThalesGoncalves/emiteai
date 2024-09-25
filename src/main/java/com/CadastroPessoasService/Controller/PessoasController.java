package com.CadastroPessoasService.Controller;

import com.CadastroPessoasService.DTO.PessoaDto.PessoaDTO;
import com.CadastroPessoasService.Modelo.Pessoa;
import com.CadastroPessoasService.Servicos.PessoasServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/pessoas")
public class PessoasController {

    @Autowired
    private PessoasServico servico;

    @GetMapping
    public ResponseEntity<List<Pessoa>> getAll() {
        List<Pessoa> listPessoas = servico.listarTodas();
        return ResponseEntity.status(HttpStatus.OK).body(listPessoas);
    }

    @PostMapping
    public ResponseEntity<Pessoa> cadastrarPessoa(@RequestBody PessoaDTO pessoaDTO) {
        try {
            // Converter PessoaDTO para Pessoa
            Pessoa novaPessoa = new Pessoa();
            novaPessoa.setNome(pessoaDTO.getNome());
            novaPessoa.setTelefone(pessoaDTO.getTelefone());
            novaPessoa.setCpf(pessoaDTO.getCpf());
            novaPessoa.setEndereco(pessoaDTO.getEndereco());

            //verificação do CPF
            if(servico.checkCpfExists(pessoaDTO.getCpf())){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            Pessoa pessoaSalva = servico.cadastrarPessoa(novaPessoa);
            return ResponseEntity.status(HttpStatus.CREATED).body(pessoaSalva);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<Map<String, Boolean>> checkCpfExists(@PathVariable String cpf) {
        boolean exists = servico.checkCpfExists(cpf);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }
}
