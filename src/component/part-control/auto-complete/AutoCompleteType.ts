import HttpUtil from "../../../HttpUtil";
import { IFixValue, IQuestionPart } from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import layout from "./assets/layout.html";
import "./assets/style";
import itemLayout from "./assets/item-layout.html";
import SearchPopup from "./SearchPopup";
import Answer from "../../answer/Answer";

export default class AutocompleteType extends QuestionBaseAnswerPart {
  private readonly _values: Array<IFixValue> = new Array<IFixValue>();

  constructor(part: IQuestionPart, owner: Answer) {
    super(part, layout, owner);
    const btn = this.element.querySelector("[data-bc-show-search-popup-btn]");
    btn.addEventListener("click", this.onShowPopUpBtnClick.bind(this));
  }

  private onShowPopUpBtnClick(e: MouseEvent) {
    e.preventDefault();
    const t = new SearchPopup(
      this.part.link,
      this.addValue.bind(this),
      this.owner.question.multi
    );
  }

  private addValue(value: IFixValue): boolean {
    let retVal = false;
    if (!this._values.find((x) => x.id === value.id)) {
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
      this._values.push(value);
      retVal = true;
    }
    return retVal;
  }
}
