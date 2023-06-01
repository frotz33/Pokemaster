export class GameTimerModel {
  gameTime: number;
  questionTime: number;
  setQuestionTime: number;
  setGameTime: number;
  private currentGameTimerId?: NodeJS.Timer;
  private currentQuestionTimerId?: NodeJS.Timer;
  constructor(gameTime: number, questionTime: number) {
    this.gameTime = gameTime;
    this.questionTime = questionTime;
    this.setQuestionTime = questionTime;
    this.setGameTime = gameTime;
    this.currentGameTimerId;
    this.currentQuestionTimerId;
  }

  private gameTimerIntervalHandler = (
    gameTimer: HTMLElement,
    timer: NodeJS.Timer,
    setTimerTextContent: (gameTimer: HTMLElement, time: number) => void
  ) => {
    this.gameTime--;
    setTimerTextContent(gameTimer, this.gameTime);
    if (!this.gameTime) {
      clearInterval(timer);
      this.stopQuestionTimer();
    }
  };

  startGameTimer = (gameTimer: HTMLElement, setTimerTextContent: () => void): void => {
    const timer = setInterval(() => {
      this.gameTimerIntervalHandler(gameTimer, timer, setTimerTextContent);
    }, 1000);
    this.currentGameTimerId = timer;
  };

  private questionTimerIntervalHandler = (
    timer: NodeJS.Timer,
    questionTimer: HTMLElement,
    setTimerTextContent: (questionTimer: HTMLElement, time: number) => void,
    createNewQuestion: () => void
  ): NodeJS.Timer => {
    if (this.questionTime > 0) {
      this.questionTime--;
      setTimerTextContent(questionTimer, this.questionTime);

      return timer;
    }
    this.resetQuestionTimer();
    setTimerTextContent(questionTimer, this.questionTime);
    createNewQuestion();
    return timer;
  };

  startQuestionTimer = (
    questionTimer: HTMLElement,
    setTimerTextContent: () => void,
    createNewQuestion: () => void
  ): void => {
    const timer: NodeJS.Timer = setInterval(() => {
      this.questionTimerIntervalHandler(
        timer,
        questionTimer,
        setTimerTextContent,
        createNewQuestion
      );
    }, 1000);
    this.currentQuestionTimerId = timer;
  };

  resetQuestionTimer = (): void => {
    clearInterval(this.currentQuestionTimerId);
    this.questionTime = this.setQuestionTime;
  };

  private stopQuestionTimer = (): void => {
    clearInterval(this.currentQuestionTimerId);
    this.questionTime = 0;
  };
}
