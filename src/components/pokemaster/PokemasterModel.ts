import { ICharacterModel, IQuiz, ICompleteAnswer } from '../../types/Interfaces';
import { PokemonFetcher } from '../../utils/Fetchers/PokemonFetcher';

export class PokemasterModel implements IQuiz {
  everyAnswer: ICharacterModel[];
  answersInSingleQuestion: ICharacterModel[];
  rightAnswer: ICompleteAnswer;

  private constructor({ everyAnswer }: IQuiz) {
    this.everyAnswer = everyAnswer;
    this.answersInSingleQuestion = this.getAnswersNeededForNextQuestion(4);
    this.rightAnswer = this.getCompleteRightAnswer();
  }

  private static getEveryAnswer = async (
    pokemonFetcher: PokemonFetcher,
    limit: number
  ): Promise<ICharacterModel[]> => {
    try {
      const everyPokemon = await pokemonFetcher.makeAnswersModel(limit);
      return everyPokemon;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  private getAnswersNeededForNextQuestion = (
    pokemonsInSingleQuestion: number
  ): ICharacterModel[] => {
    const neededPokemons = this.everyAnswer
      .sort(() => 0.5 - Math.random())
      .slice(0, pokemonsInSingleQuestion);
    return neededPokemons;
  };

  private getRightAnswerPokemon = (): ICharacterModel => {
    const pokemons = this.answersInSingleQuestion;
    const rightAnswer = pokemons[Math.floor(Math.random() * pokemons.length)];
    return rightAnswer;
  };
  private getRightAnswerPicture = (pokemon: ICharacterModel): string => {
    const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    return picture;
  };
  private getCompleteRightAnswer = (): ICompleteAnswer => {
    const pokemon = this.getRightAnswerPokemon();
    const completeAnswer = {
      pokemon: pokemon,
      rightAnswerPicture: this.getRightAnswerPicture(pokemon),
    };
    return completeAnswer;
  };

  genereteNextQuestion = (pokemonsInSingleQuestion: number): void => {
    this.answersInSingleQuestion = this.getAnswersNeededForNextQuestion(pokemonsInSingleQuestion);
    this.rightAnswer = this.getCompleteRightAnswer();
  };

  static async init(pokemonFetcher: PokemonFetcher): Promise<PokemasterModel> {
    const everyPokemon = await this.getEveryAnswer(pokemonFetcher, 250);

    return new PokemasterModel({
      everyAnswer: everyPokemon,
    });
  }
}
