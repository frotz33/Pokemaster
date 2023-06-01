import { IGameRules } from '../../types/Interfaces';
import { PokemasterController } from '../pokemaster/PokemasterController';
import { Score } from '../score/Score';
import { GameTimerController } from '../timer/GameTimerController';

export class GameRules {
  private pokemasterController: PokemasterController;
  private gameTimerController: GameTimerController;

  score: Score;
  private constructor({ pokemasterController, gameTime, answerTime }: IGameRules) {
    this.pokemasterController = pokemasterController;
    this.gameTimerController = new GameTimerController(gameTime, answerTime);
    this.score = new Score();
    this.addStartListener();
  }
  addStartListener = () => {
    this.pokemasterController.addStartListener(this.gameTimerController, this.score);
  };

  static init = async ({
    gameTime,
    answerTime,
  }: {
    gameTime: number;
    answerTime: number;
  }): Promise<GameRules> => {
    const pokemasterController = await PokemasterController.init();
    return new GameRules({
      pokemasterController: pokemasterController,
      gameTime: gameTime,
      answerTime: answerTime,
    });
  };
}
