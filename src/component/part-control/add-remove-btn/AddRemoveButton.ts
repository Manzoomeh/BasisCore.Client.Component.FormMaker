import AnswerPart from "../../answer-part/AnswerPart";
import Answer from "../../answer/Answer";
import { IAnswerResult } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";

export default class AddRemoveButton extends AnswerPart {
  private _button: HTMLButtonElement;
  private _onAddClick: AddRemoveCallback;
  private readonly _onRemoveClick: AddRemoveCallback;

  constructor(container: Element, onClick: AddRemoveCallback, owner: Answer) {
    super(layout, owner);
    this._onAddClick = onClick;
    this._onRemoveClick = onClick;
    this.element.setAttribute("data-part-btn-container", "");
    this._button = this.element.querySelector("[data-bc-btn]");
    this._button.setAttribute("data-bc-btn", "add");
    this._button.addEventListener("click", this.onBtnClick.bind(this));
  }

  private onBtnClick(e: MouseEvent) {
    e.preventDefault();
    if (this._button.getAttribute("data-bc-btn") === "add") {
      this._onAddClick(true);
      this.setRemovable();
    } else {
      this._onRemoveClick(false);
    }
  }

  public replaceAddClick(onClick: AddRemoveCallback) {
    this._onAddClick = onClick;
  }
  public setRemovable() {
    this._button.setAttribute("data-bc-btn", "remove");
  }
}

declare type AddRemoveCallback = (add: boolean) => void;
