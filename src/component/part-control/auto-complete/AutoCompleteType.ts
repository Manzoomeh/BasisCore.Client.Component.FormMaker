import HttpUtil from "../../../HttpUtil";
import IFormMakerOptions from "../../form-maker/IFormMakerOptions";
import { IFixValue, IQuestion, IQuestionPart } from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import layout from "./assets/layout.html";
import "./assets/style";
import itemLayout from "./assets/item-layout.html";
import SearchPopup from "./SearchPopup";

export default class AutocompleteType extends QuestionBaseAnswerPart {
  private _ctl: HTMLInputElement;
  constructor(
    question: IQuestion,
    part: IQuestionPart,
    options: IFormMakerOptions,
    container: Element
  ) {
    super(question, part, layout, options, container);
    const btn = this.element.querySelector("[data-bc-show-search-popup-btn]");
    btn.addEventListener("click", this.onShowPopUpBtnClick.bind(this));
  }

  private onShowPopUpBtnClick(e: MouseEvent) {
    e.preventDefault();
    const t = new SearchPopup(this.part.link, this.addValue.bind(this));
  }

  private addValue(value: IFixValue): void {
    const ul = this.element.querySelector("ul");
    const li = HttpUtil.parse(itemLayout).querySelector("li");
    li.querySelector("[data-bc-title]").innerHTML = value.value;
    li.setAttribute("data-bc-id", value.id.toString());
    li.setAttribute("data-bc-value", value.value);
    const btn = li.querySelector("[data-bc-btn-remove]");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      li.remove();
    });
    ul.appendChild(li);
  }
}
