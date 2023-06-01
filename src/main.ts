import { GameRules } from './components/game-rules/GameRules';

const answerTime = 15;
const gameTime = 120;

const initializePokemaster = async () => {
  GameRules.init({ gameTime: gameTime, answerTime: answerTime });
};
initializePokemaster();
