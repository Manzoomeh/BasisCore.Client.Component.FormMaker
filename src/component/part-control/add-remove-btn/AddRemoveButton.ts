import AnswerCollection from "../../answer-collection/AnswerCollection";
import AnswerPart from "../AnswerPart";
import layout from "./assets/layout.html";

export default class AddRemoveButton extends AnswerPart {
  private _button: HTMLButtonElement;
  private isAdd: boolean = true;
  private _owner: AnswerCollection;
  constructor(owner: AnswerCollection, container: Element) {
    super(layout, container); //, "&nbsp;");
    this._owner = owner;
    this.element.setAttribute("data-part-btn-container", "");
    this._button = this.element.querySelector("[data-bc-btn]");
    this._button.innerHTML = "add";
    this._button.addEventListener("click", this.onBtnClick.bind(this));
  }

  private onBtnClick(e: MouseEvent) {
    e.preventDefault();
    this._owner.addAnswer();
    console.log(this.isAdd);
  }
}
