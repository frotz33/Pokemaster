export class Modal {
  modalElement: HTMLDialogElement;
  constructor(modalContent: string) {
    this.modalElement = this.init(modalContent);
  }
  init(innerHTML: string, root: HTMLElement = document.body) {
    const modal = document.createElement('dialog');
    modal.classList.add('game__start-screen');
    modal.setAttribute('data-game-start-dialog', '');
    root.prepend(modal);
    modal.innerHTML = innerHTML;
    return modal;
  }
}
