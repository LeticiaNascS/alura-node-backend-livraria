import erroBase from './errosBase.js';

class requisicaoIncorreta extends erroBase {
    constructor(mensagem = "Um ou mais dados fornecidos estão incorrertos"){
        super(mensagem, 400);
    }
}
export default requisicaoIncorreta;
