import { IPokemonDTO, IPokemon, ICharacterModel, IAnswers } from '../../types/Interfaces';
import { Fetcher } from './Fetcher';

export class PokemonFetcher {
  private fetcher: Fetcher<IPokemonDTO>;
  private idRegexp: RegExp;

  constructor() {
    this.fetcher = new Fetcher<IPokemonDTO>('https://pokeapi.co/api/v2/pokemon');
    this.idRegexp = /^https?:\/\/pokeapi\.co\/api\/v2\/pokemon\/(\d+)\/.*/i;
  }

  getPokemons = async (limit: number): Promise<IPokemon[]> => {
    try {
      const pokemons = await this.fetcher.get(`/?limit=${limit}`);
      return pokemons.results;
    } catch (err) {
      throw new Error(err as string);
    }
  };
  getIdFromUrl = (currentPokemon: IAnswers) => {
    const isMatching = this.idRegexp.exec(currentPokemon.url);
    if (!isMatching) throw new Error('One or more of the answers are unavailable');
    const [, answerId] = isMatching;
    const answerModel = { name: currentPokemon.name, id: parseInt(answerId) };
    return answerModel;
  };
  makeAnswersModel = async (limit: number): Promise<ICharacterModel[]> => {
    const pokemons = await this.getPokemons(limit);
    const answersModel = pokemons.reduce((acc, currentValue) => {
      const answerModel = this.getIdFromUrl(currentValue);
      acc.push(answerModel);
      return acc;
    }, [] as ICharacterModel[]);
    return answersModel;
  };
}
