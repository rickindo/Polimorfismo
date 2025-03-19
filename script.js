// Classe Veiculo (Classe Pai)
class Veiculo {
    constructor(modelo, cor) {
        this.modelo = modelo;
        this.cor = cor;
        this.ligado = false;
        this.velocidade = 0;
    }

    ligar() {
        this.ligado = true;
        return "Veículo ligado!";
    }

    desligar() {
        this.ligado = false;
        this.velocidade = 0;
        return "Veículo desligado!";
    }

    acelerar(incremento) {
        if (this.ligado) {
            this.velocidade += incremento;
            return `Acelerando para ${this.velocidade} km/h`;
        } else {
            return "Ligue o veículo primeiro!";
        }
    }

    buzinar() {
        return "Beep beep!";
    }

    exibirInformacoes() {
        return `Modelo: ${this.modelo}, Cor: ${this.cor}, Ligado: ${this.ligado}, Velocidade: ${this.velocidade}`;
    }
}

// Classe Carro (Herda de Veiculo)
class Carro extends Veiculo {
    constructor(modelo, cor, numeroPortas) {
        super(modelo, cor);
        this.numeroPortas = numeroPortas;
    }

    exibirInformacoes() {
        return `${super.exibirInformacoes()}, Número de Portas: ${this.numeroPortas}`;
    }
}

// Classe CarroEsportivo (Herda de Carro)
class CarroEsportivo extends Carro {
    constructor(modelo, cor, numeroPortas) {
        super(modelo, cor, numeroPortas);
        this.turboAtivado = false;
    }

    ativarTurbo() {
        this.turboAtivado = true;
        return "Turbo ativado!";
    }

    desativarTurbo() {
        this.turboAtivado = false;
        return "Turbo desativado!";
    }

    exibirInformacoes() {
        return `${super.exibirInformacoes()}, Turbo: ${this.turboAtivado ? "Ativado" : "Desativado"}`;
    }
}

// Classe Caminhao (Herda de Veiculo)
class Caminhao extends Veiculo {
    constructor(modelo, cor, capacidadeCarga) {
        super(modelo, cor);
        this.capacidadeCarga = capacidadeCarga;
        this.cargaAtual = 0;
    }

    carregar(quantidade) {
        if (this.cargaAtual + quantidade <= this.capacidadeCarga) {
            this.cargaAtual += quantidade;
            return `Caminhão carregado. Carga atual: ${this.cargaAtual}`;
        } else {
            return "Capacidade de carga excedida!";
        }
    }

    descarregar(quantidade) {
        if (this.cargaAtual - quantidade >= 0) {
            this.cargaAtual -= quantidade;
            return `Caminhão descarregado. Carga atual: ${this.cargaAtual}`;
        } else {
            return "Não há carga suficiente para descarregar.";
        }
    }

    exibirInformacoes() {
        return `${super.exibirInformacoes()}, Capacidade de Carga: ${this.capacidadeCarga}, Carga Atual: ${this.cargaAtual}`;
    }
}

// Instâncias dos Objetos
const meuCarro = new Carro("Sedan", "Prata", 4);
const meuCarroEsportivo = new CarroEsportivo("Roadster", "Vermelho", 2);
const meuCaminhao = new Caminhao("Truck", "Azul", 5000);

// Variável para rastrear o veículo selecionado
let veiculoSelecionado = null;

// Função interagir (Polimorfismo em Ação)
function interagir(veiculo, acao) {
    if (!veiculo) {
        return "Selecione um veículo primeiro!";
    }

    switch (acao) {
        case "ligar":
            return veiculo.ligar();
        case "desligar":
            return veiculo.desligar();
        case "acelerar":
            return veiculo.acelerar(10);
        case "buzinar":
            return veiculo.buzinar();
        case "ativarTurbo":
            if (veiculo instanceof CarroEsportivo) {
                return veiculo.ativarTurbo();
            } else {
                return "Esta ação não é aplicável a este veículo.";
            }
        case "carregar":
            if (veiculo instanceof Caminhao) {
                return veiculo.carregar(1000);
            } else {
                return "Esta ação não é aplicável a este veículo.";
            }
        case "descarregar":
            if(veiculo instanceof Caminhao){
                return veiculo.descarregar(500);
            } else {
                return "Esta ação não é aplicável a este veículo."
            }
        default:
            return "Ação inválida.";
    }
}

// Função para exibir informações do veículo no HTML
function exibirInformacoesVeiculo() {
    const informacoesVeiculoDiv = document.getElementById("informacoesVeiculo");
    if (veiculoSelecionado) {
        informacoesVeiculoDiv.textContent = veiculoSelecionado.exibirInformacoes();
    } else {
        informacoesVeiculoDiv.textContent = "Nenhum veículo selecionado.";
    }
}

// Event Listeners para os botões de seleção de veículo
document.getElementById("btnMeuCarro").addEventListener("click", function() {
    veiculoSelecionado = meuCarro;
    exibirInformacoesVeiculo();
});

document.getElementById("btnMeuCarroEsportivo").addEventListener("click", function() {
    veiculoSelecionado = meuCarroEsportivo;
    exibirInformacoesVeiculo();
});

document.getElementById("btnMeuCaminhao").addEventListener("click", function() {
    veiculoSelecionado = meuCaminhao;
    exibirInformacoesVeiculo();
});

// Event Listeners para os botões de ação
document.getElementById("btnLigar").addEventListener("click", function() {
    const resultado = interagir(veiculoSelecionado, "ligar");
    alert(resultado);
    exibirInformacoesVeiculo();
});

document.getElementById("btnDesligar").addEventListener("click", function() {
    const resultado = interagir(veiculoSelecionado, "desligar");
    alert(resultado);
    exibirInformacoesVeiculo();
});

document.getElementById("btnAcelerar").addEventListener("click", function() {
    const resultado = interagir(veiculoSelecionado, "acelerar");
    alert(resultado);
    exibirInformacoesVeiculo();
});

document.getElementById("btnBuzinar").addEventListener("click", function() {
    const resultado = interagir(veiculoSelecionado, "buzinar");
    alert(resultado);
    exibirInformacoesVeiculo();
});

document.getElementById("btnAtivarTurbo").addEventListener("click", function() {
    const resultado = interagir(veiculoSelecionado, "ativarTurbo");
    alert(resultado);
    exibirInformacoesVeiculo();
});

document.getElementById("btnCarregar").addEventListener("click", function() {
    const resultado = interagir(veiculoSelecionado, "carregar");
    alert(resultado);
    exibirInformacoesVeiculo();
});