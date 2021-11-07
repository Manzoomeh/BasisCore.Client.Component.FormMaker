import { IFixValue, IPartResult, IQuestionPart } from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import "./assets/style";
import Answer from "../../answer/Answer";

export default class AutoCompleteType extends QuestionBaseAnswerPart {
  protected _value: IPartResult;
  protected readonly label: HTMLLabelElement;
  constructor(part: IQuestionPart, partLayout: string, owner: Answer, value: IPartResult) {
    super(part, partLayout, owner);
    this._value = value;
    this.label = this.element.querySelector("[data-bc-add-item]");
    this._value = value;
    if (value) {
      this.label.innerHTML = value.title;
    }
  }

  protected setValue(value: IFixValue): boolean {
    const mustChange = this._value?.value !== value.id;
    if (mustChange) {
      this.element.querySelector("label").innerHTML = value.value;
      this._value = {
        title: value.value,
        value: value.id,
        part: this.part.part,
      };
    }
    return mustChange;
  }
}
