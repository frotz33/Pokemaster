import { PokemasterModel } from './PokemasterModel';
import { PokemasterView } from './PokemasterView';
import { GameTimerController } from '../timer/GameTimerController';
import { Score } from '../score/Score';
import { PokemonFetcher } from '../../utils/Fetchers/PokemonFetcher';

const TIME = {
  MILISECOND: 1000,
};

export class PokemasterController {
  PokemasterModel: PokemasterModel;
  PokemasterView: PokemasterView;

  private constructor(PokemasterModel: PokemasterModel) {
    this.PokemasterModel = PokemasterModel;
    this.PokemasterView = new PokemasterView();

    this.openCustomModal();
  }

  private showCorrectnessOfAnswers = (
    e: Event,
    gameTimerController: GameTimerController,
    score: Score
  ): void => {
    this.PokemasterView.showCorrectnessOfAnswers(
      e,
      () => {
        this.createNewQuestion(gameTimerController);
      },
      () => {
        score.addPoints(this.PokemasterView.updateScore);
      },
      this.PokemasterModel
    );
  };
  private showRightAnswerPicture = (): void => {
    if (!this.PokemasterModel.rightAnswer) throw new Error('There is right answer missing');
    this.PokemasterView.showRightAnswerPicture(this.PokemasterModel.rightAnswer.rightAnswerPicture);
  };

  private showAvailableAnswers = (): void => {
    this.PokemasterView.showAvailableAnswers(this.PokemasterModel.answersInSingleQuestion);
  };

  showWhichIsRightAnswer = (): void => {
    if (!this.PokemasterModel.rightAnswer) throw new Error('There is right answer missing');
    this.PokemasterView.colorAnswers(this.PokemasterModel.rightAnswer);
  };

  private openCustomModal = (): void => {
    this.PokemasterView.openStartModal();
  };
  // create
  private createNewQuestion = (gameTimerController: GameTimerController): void => {
    gameTimerController.resetQuestionTimer();
    this.PokemasterModel.genereteNextQuestion(4);
    this.PokemasterView.restoreOriginalColor();
    this.showAvailableAnswers();
    this.showRightAnswerPicture();
    gameTimerController.startQuestionTimer(() => {
      this.createNewQuestion(gameTimerController);
    });
  };
  addStartListener = (gameTimerController: GameTimerController, score: Score): void => {
    this.PokemasterView.startModal.modalElement.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) return;
      this.PokemasterView.closeStartModal();

      this.startGameTimer(gameTimerController);

      this.createNewQuestion(gameTimerController);

      this.PokemasterView.addListenerOnAnswers((e) => {
        this.showCorrectnessOfAnswers(e, gameTimerController, score);
      });
    });
  };

  private startGameTimer = (gameTimerController: GameTimerController): void => {
    gameTimerController.startGameTimer();
    setTimeout(
      this.PokemasterView.openEndModal,
      gameTimerController.getSetGameTime() * TIME.MILISECOND
    );
  };
  static init = async (): Promise<PokemasterController> => {
    try {
      const pokemonFetcher = new PokemonFetcher();
      const pokemasterModel = await PokemasterModel.init(pokemonFetcher);
      return new PokemasterController(pokemasterModel);
    } catch (e) {
      throw new Error(e as string);
    }
  };
}
