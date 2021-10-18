import AnswerPart from "../../answer-part/AnswerPart";
import layout from "./assets/layout.html";

export default class AddRemoveButton extends AnswerPart {
  private _button: HTMLButtonElement;
  private isAdd: boolean = true;
  private readonly _onAdd: SimpleCallback;
  private readonly _onRemove: SimpleCallback;
  constructor(container: Element, onAdd: SimpleCallback, onRemove: SimpleCallback) {
    super(layout, container);
    this._onAdd = onAdd;
    this._onRemove = onRemove;
    this.element.setAttribute("data-part-btn-container", "");
    this._button = this.element.querySelector("[data-bc-btn]");
    this._button.setAttribute("data-bc-btn", "add");
    // this._button.innerHTML = "add";
    this._button.addEventListener("click", this.onBtnClick.bind(this));
  }

  private onBtnClick(e: MouseEvent) {
    e.preventDefault();
    if (this.isAdd) {
      this._onAdd();
      this.isAdd = false;
      this._button.setAttribute("data-bc-btn", "remove");
      // this._button.innerHTML = "remove";
    } else {
      this._onRemove();
    }
  }
}

declare type SimpleCallback = () => void;
