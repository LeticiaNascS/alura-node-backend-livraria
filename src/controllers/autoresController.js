import mongoose from "mongoose";
import { autores } from "../models/index.js";
import naoEncontrado from "../erros/naoEncontrado.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find();
      req.resultado = autoresResultado;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findById(id);
      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new naoEncontrado("Id do autor não encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndUpdate(id, {
        $set: req.body,
      }); // await para esperar a resposta do banco de dados, findByIdAndUpdate para encontrar o autor pelo id e atualizar os dados, $set para definir os novos dados do autor
      if (autorResultado !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        next(new naoEncontrado("Id do autor não encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndDelete(id);
      if (autorResultado !== null) {
        res.status(200).send({ message: "Autor removido com sucesso" });
      } else {
        next(new naoEncontrado("Id do autor não encontrado")); // next para enviar o erro para o manipulador de erros, new para criar uma nova instância do erro, naoEncontrado para indicar que o autor não foi encontrado, mensagem personalizada para o erro
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;
