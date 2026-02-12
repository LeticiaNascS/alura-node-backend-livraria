import requisicaoIncorreta from "./requisicaoIncorreta.js";

class erroValidacao extends requisicaoIncorreta {
    constructor(erro){
        const mensagensErro = Object.values(erro.errors)
            .map(erro => erro.message)
            .join("; ");
        super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
    }
    }
    export default erroValidacao;