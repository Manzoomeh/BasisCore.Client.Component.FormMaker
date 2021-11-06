import Answer from "../../answer/Answer";
import { IFixValue, IQuestionPart } from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import layout from "./assets/auto-complete-single-type.html";
import SearchPopup from "./SearchPopup";
import "./assets/style";

export default class AutoCompleteSingleType extends QuestionBaseAnswerPart {
  private _value: IFixValue;
  private _btn: HTMLButtonElement;
  constructor(part: IQuestionPart, owner: Answer) {
    super(part, layout, owner);
    this._btn = this.element.querySelector("[data-bc-btn]");
    this._btn.addEventListener("click", this.onShowPopUpBtnClick.bind(this));
  }

  private onShowPopUpBtnClick(e: MouseEvent) {
    e.preventDefault();
    if (this._btn.getAttribute("data-bc-btn") === "add") {
      const t = new SearchPopup(
        this.part.link,
        this.addValue.bind(this),
        false
      );
    } else {
      this._value = null;
      this.element.querySelector("label").innerHTML = "";
      this._btn.setAttribute("data-bc-btn", "add");
    }
  }

  private addValue(value: IFixValue): boolean {
    if (this._value?.id !== value.id) {
      this.element.querySelector("label").innerHTML = value.value;
      this._value = value;
      this._btn.setAttribute("data-bc-btn", "remove");
    }
    return true;
  }
}
