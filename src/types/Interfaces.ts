import { PokemasterController } from '../components/pokemaster/PokemasterController';

export interface IQuiz {
  everyAnswer: ICharacterModel[];
}

export interface IAnswers {
  name: string;
  url: string;
}
export interface IPokemonDTO {
  results: { name: string; url: string }[];
}

export interface IPokemasterModel {
  pokemasterModel: IQuiz;
  gameTime: number;
  answerTime: number;
}
export interface ICharacterModel {
  name: string;
  id: number;
}

export interface IGameRules {
  pokemasterController: PokemasterController;
  gameTime: number;
  answerTime: number;
}

export interface IPokemon {
  name: string;
  url: string;
}
export interface ICompleteAnswer {
  pokemon: ICharacterModel;
  rightAnswerPicture: string;
}
