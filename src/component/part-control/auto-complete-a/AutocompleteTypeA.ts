import {
  IAnswerResult,
  IFixValue,
  IPartResult,
  IQuestionPart,
} from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import layout from "./assets/layout.html";
import SearchPopup from "../auto-complete/SearchPopup";
import Answer from "../../answer/Answer";
import "./assets/style.css";

export default class AutocompleteTypeA extends QuestionBaseAnswerPart {
  private _value: any;

  constructor(part: IQuestionPart, data: IPartResult, owner: Answer) {
    super(part, layout, owner);
    const btn = this.element.querySelector("[data-bc-auto-complete-btn]");
    btn.addEventListener("click", this.onShowPopUpBtnClick.bind(this));
    if (data) {
      this.setValue(data.value, data.title);
    }
  }

  private onShowPopUpBtnClick(e: MouseEvent) {
    e.preventDefault();
    const t = new SearchPopup(
      this.part.link,
      this.addValue.bind(this),
      this.owner.question.multi
    );
  }

  public setValue(value: any, title: string) {
    this._value = value;
    const btn = this.element.querySelector("[data-bc-auto-complete-btn]");
    btn.innerHTML = title;
  }

  private addValue(value: IFixValue): boolean {
    let retVal = false;
    if (this._value) {
      this.setValue(value.id, value.value);
    } else {
      var p: IAnswerResult = {
        parts: [
          {
            part: this.part.part,
            title: value.value,
            value: value.id,
          },
        ],
      };
      this.owner.owner.addAnswer(p);
    }
    //if (!this._value.find((x) => x.id === value.id)) {
    // const ul = this.element.querySelector("ul");
    // const li = HttpUtil.parse(itemLayout).querySelector("li");
    // li.querySelector("[data-bc-title]").innerHTML = value.value;
    // li.setAttribute("data-bc-id", value.id.toString());
    // li.setAttribute("data-bc-value", value.value);
    // const btn = li.querySelector("[data-bc-btn-remove]");
    // btn.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   li.remove();
    // });
    // ul.appendChild(li);
    // this._values.push(value);
    retVal = true;
    //}
    return retVal;
  }
}
