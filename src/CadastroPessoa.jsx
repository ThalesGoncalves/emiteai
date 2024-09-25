import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const CadastroPessoa = () => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [estado, setEstado] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleCepChange = async (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        setCep(value);

        if (value.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
                if (response.data && !response.data.erro) {
                    const { logradouro, bairro, localidade, uf } = response.data;
                    setEndereco(logradouro);
                    setBairro(bairro);
                    setMunicipio(localidade);
                    setEstado(uf);
                } else {
                    clearAddressFields();
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
                clearAddressFields();
            }
        } else if (value.length < 8) {
            clearAddressFields();
        }
    };

    const clearAddressFields = () => {
        setEndereco('');
        setBairro('');
        setMunicipio('');
        setEstado('');
    };

    const checkCpfExists = async (cpf) => {
        try {
            const response = await axios.get(`http://localhost:8080/pessoas/cpf/${cpf}`);
            return response.data.exists;
        } catch (error) {
            console.error('Erro ao verificar CPF:', error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cpfExists = await checkCpfExists(cpf);
        if (cpfExists) {
            setMessage('CPF já cadastrado!Tente novamente');
            setIsError(true);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                clearForm();
            }, 2000);
            return;
        }

        const pessoa = { 
            nome, 
            cpf, 
            telefone, 
            endereco: {
                rua: endereco,
                numero,
                complemento,
                cep,
                bairro,
                estado,
                municipio
            }
        };

        try {
            await axios.post('http://localhost:8080/pessoas', pessoa);
            setMessage('Cadastro realizado com sucesso!');
            setIsError(false);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                clearForm();
            }, 2800);
        } catch (error) {
            console.error('Erro ao cadastrar pessoa:', error);
            setMessage('Falha ao cadastrar a pessoa.');
            setIsError(true);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                clearForm();
            }, 2800);
        }
    };

    const clearForm = () => {
        setNome('');
        setTelefone('');
        setCpf('');
        setNumero('');
        setComplemento('');
        setCep('');
        clearAddressFields();
    };

    const handleTelefoneChange = (e) => {
        let value = e.target.value;
    
        // Remove tudo que não é número
        value = value.replace(/\D/g, '');
    
        // Verifica se o valor já tem o formato completo (11 dígitos)
        if (value.length > 11) {
            value = value.substring(0, 11); // Limita a 11 dígitos
        }
    
        // Formatação do telefone
        if (value.length === 11) {
            value = value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4'); // Formato (xx) x xxxx-xxxx
        } else if (value.length >= 7) {
            value = value.replace(/^(\d{2})(\d{1})(\d{0,4})$/, '($1) $2 $3'); // Formato (xx) x xxxx
        } else if (value.length >= 3) {
            value = value.replace(/^(\d{2})(\d{0,1})$/, '($1) $2'); // Formato (xx)
        }
    
        setTelefone(value); // Atualiza o estado com o valor formatado
    };
    
    
    
    
    
    const handleCpfChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    
        if (value.length === 0) {
            setCpf(''); // Se o valor for vazio, limpa o campo
            return;
        }
    
        if (value.length > 9) {
            // Formatação para XXX.XXX.XXX-XX
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            // Formatação para XXX.XXX.XXX
            value = value.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
        } else if (value.length > 3) {
            // Formatação para XXX.XXX
            value = value.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
        }
    
        setCpf(value);
    };

    return (
        <div className="cadastro-container">
            <h1 className="titulo-cadastro">Cadastro de Pessoa Física</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={handleTelefoneChange} // Apenas números
                    maxLenght="15"
                    required
                />
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={handleCpfChange} // Apenas números
                    required
                />
                <input
                    type="text"
                    placeholder="Endereço"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value.replace(/\D/g, ''))} // Apenas números
                    required
                />
                <input
                    type="text"
                    placeholder="Complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="CEP"
                    value={cep}
                    onChange={handleCepChange} // Apenas números
                    required
                />
                <input type="text" placeholder="Bairro" value={bairro} readOnly />
                <input type="text" placeholder="Município" value={municipio} readOnly />
                <input type="text" placeholder="Estado" value={estado} readOnly />
                <button type="submit">Cadastrar</button>
            </form>

            {/* Caixa de Mensagem */}
            {showMessage && (
                <div className={`message-box ${isError ? 'error' : 'success'}`}>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default CadastroPessoa;
