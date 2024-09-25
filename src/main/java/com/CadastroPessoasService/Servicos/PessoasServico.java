package com.CadastroPessoasService.Servicos;
import com.CadastroPessoasService.Modelo.Pessoa;
import com.CadastroPessoasService.Repositorio.RepositorioPessoa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PessoasServico {

    @Autowired
    private RepositorioPessoa pessoaRepositorio;

    public Pessoa cadastrarPessoa(Pessoa pessoa) {
        return pessoaRepositorio.save(pessoa);

        }

    public List<Pessoa> listarTodas() {
        return pessoaRepositorio.findAll();
    }

    public Optional<Pessoa> buscarPessoaPorId(Long id) {
        return pessoaRepositorio.findById(id);
    }

    public void deletarPessoa(Long id) {
        pessoaRepositorio.deleteById(id);
    }

    public boolean checkCpfExists(String cpf){
        return pessoaRepositorio.existsByCpf(cpf);
    }

}