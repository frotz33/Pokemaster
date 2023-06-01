import { GameTimerModel } from './GameTimerModel';
import { GameTimerView } from './GameTimerView';

export class GameTimerController {
  private gameTimerModel: GameTimerModel;
  private gameTimerView: GameTimerView;
  constructor(gameTime: number, questionTime: number) {
    this.gameTimerModel = new GameTimerModel(gameTime, questionTime);
    this.gameTimerView = new GameTimerView();
  }
  getSetGameTime = (): number => {
    return this.gameTimerModel.setGameTime;
  };
  startGameTimer = (): void => {
    this.gameTimerModel.startGameTimer(this.gameTimerView.gameTimer, () => {
      this.gameTimerView.setTimerTextContent(
        this.gameTimerView.gameTimer,
        this.gameTimerModel.gameTime
      );
    });
  };
  startQuestionTimer = (createNewQuestion: () => void): void => {
    this.gameTimerModel.startQuestionTimer(
      this.gameTimerView.questionTimer,
      () => {
        this.gameTimerView.setTimerTextContent(
          this.gameTimerView.questionTimer,
          this.gameTimerModel.questionTime
        );
      },
      createNewQuestion
    );
  };
  resetQuestionTimer = (): void => {
    this.gameTimerModel.resetQuestionTimer();
  };
}

//handleNextQuestion, giveNextQueston, zmiana nazw
//metody daj na private te co nie sa upubliczniane
