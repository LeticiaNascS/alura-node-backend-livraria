import mongoose from "mongoose";
import erroBase from "../erros/errosBase.js";
import erroValidacao from "../erros/erroValidacao.js";
import requisicaoIncorreta from "../erros/requisicaoIncorreta.js";

function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new requisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new erroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof erroBase) {
    erro.enviarResposta(res);
  } else {
    new erroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
