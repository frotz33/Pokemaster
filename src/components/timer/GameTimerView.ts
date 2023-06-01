import { ElementGetter } from '../../utils/ElementGetter';

export class GameTimerView {
  gameTimer: HTMLElement;
  questionTimer: HTMLElement;
  constructor() {
    this.gameTimer = ElementGetter.get('.game__game-timer-span');
    this.questionTimer = ElementGetter.get('.game__answer-timer-span');
  }

  setTimerTextContent = (questionTimer: HTMLElement, time: number): void => {
    questionTimer.textContent = time.toString();
  };
}
