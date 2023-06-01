import { ICharacterModel } from '../../types/Interfaces';
import { ElementGetter } from '../../utils/ElementGetter';
import { Modal } from '../../utils/Modal/Modal';
import { PokemasterModel } from './PokemasterModel';

const COLORS = {
  ORIGINAL_ANSWER: 'white',
  CORRECT_ANSWER: 'green',
  WRONG_ANSWER: 'red',
};

export class PokemasterView {
  picturePlace: HTMLElement;
  rightPokemonImage: HTMLElement;
  answerButtons: HTMLAnchorElement[];
  answersContainer: HTMLElement;
  scorePlace: HTMLElement;
  startModal: Modal;
  endModal: Modal;
  constructor() {
    this.answerButtons = [...document.querySelectorAll<HTMLAnchorElement>('[data-game-answer]')];
    this.answersContainer = ElementGetter.get('[data-game-answers]');
    this.picturePlace = ElementGetter.get('[data-picture-container]');
    this.rightPokemonImage = ElementGetter.get('[data-game-picture]');
    this.scorePlace = ElementGetter.get('[data-game-score-span]');
    this.startModal = this.getStartModal();
    this.endModal = this.getEndModal();
  }

  addListenerOnAnswers = (callback: (e: Event) => void): void => {
    this.answersContainer.addEventListener('click', callback);
  };

  private getStartModal = (): Modal => {
    const modalContent = `<button class="game__start-screen-btn" data-start-btn="">Start</button>`;
    const startDialog = new Modal(modalContent);
    return startDialog;
  };

  private getEndModal = (): Modal => {
    const modalContent = `<h2 class="game__end-screen-heading" data-end-heading="">To play again refresh the website :)</h2>`;
    const endModal = new Modal(modalContent);
    return endModal;
  };

  openStartModal = (): void => {
    this.startModal.modalElement.showModal();
  };
  openEndModal = (): void => {
    this.endModal.modalElement.showModal();
  };

  closeStartModal = (): void => {
    this.startModal.modalElement.close();
  };

  hideStartScreen = (startScreen: HTMLDialogElement): void => {
    startScreen.close();
  };

  showRightAnswerPicture = (pictureUrl: string): void => {
    const image = this.rightPokemonImage as HTMLImageElement;
    image.src = '';
    image.src = pictureUrl;
  };
  showAvailableAnswers = (answersInSingleQuestion: ICharacterModel[]): void => {
    this.answerButtons.forEach((place, index) => {
      place.textContent = answersInSingleQuestion[index].name;
    });
  };

  colorAnswers = (rightAnswer: { pokemon: ICharacterModel; rightAnswerPicture: string }): void => {
    this.answerButtons.forEach((place) => {
      const isCorrectAnswerClicked = place.textContent === rightAnswer.pokemon.name;
      if (isCorrectAnswerClicked) {
        place.style.color = COLORS.CORRECT_ANSWER;
        return;
      }
      place.style.color = COLORS.WRONG_ANSWER;
    });
  };
  restoreOriginalColor = (): void => {
    this.answerButtons.forEach((place) => {
      place.style.color = COLORS.ORIGINAL_ANSWER;
    });
  };
  createTimer = (root: HTMLElement, className: string): HTMLSpanElement => {
    console.log(this, 'tutaj');
    const timer = document.createElement('span');
    timer.classList.add(className);
    root.appendChild(timer);
    return timer;
  };

  private isCorrectButtonClicked = (e: Event, pokemasterModel: PokemasterModel): boolean => {
    const answerBtn = e.target as HTMLElement;
    const nextSibling = answerBtn.nextElementSibling;
    return (nextSibling && nextSibling.textContent === pokemasterModel.rightAnswer?.pokemon.name)!;
  };

  showCorrectnessOfAnswers = (
    e: Event,
    createNewQuestion: () => void,
    updateScore: () => void,
    pokemasterModel: PokemasterModel
  ): void => {
    if (e.target === e.currentTarget) return;

    this.colorAnswers(pokemasterModel.rightAnswer);
    const isCorrectButton = this.isCorrectButtonClicked(e, pokemasterModel);
    if (isCorrectButton) {
      updateScore();
    }
    window.setTimeout(createNewQuestion, 500);
  };

  updateScore = (score: number): void => {
    this.scorePlace.textContent = score.toString();
  };
}
