import AnswerPart from "../../answer-part/AnswerPart";
import Answer from "../../answer/Answer";
import { IAnswerResult } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";

export default class AddRemoveButton extends AnswerPart {
  private _button: HTMLButtonElement;
  private readonly _onAdd: SimpleCallback;
  private readonly _onRemove: SimpleCallback;

  constructor(
    container: Element,
    onAdd: SimpleCallback,
    onRemove: SimpleCallback,
    owner: Answer
  ) {
    super(layout, owner);
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
    if (this._button.getAttribute("data-bc-btn") === "add") {
      this._onAdd();
      this.setRemovable();
      //this._button.setAttribute("data-bc-btn", "remove");
      // this._button.innerHTML = "remove";
    } else {
      this._onRemove();
    }
  }

  public setRemovable() {
    this._button.setAttribute("data-bc-btn", "remove");
  }
}

declare type SimpleCallback = (data?: IAnswerResult) => void;
