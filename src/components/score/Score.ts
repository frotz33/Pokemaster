export class Score {
  score: number;
  constructor() {
    this.score = 0;
  }
  addPoints = (callback: (score: number) => void): void => {
    this.score += 100;
    callback(this.score);
  };
}
