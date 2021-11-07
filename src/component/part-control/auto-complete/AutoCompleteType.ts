import { IFixValue, IPartCollection, IPartValue, IQuestionPart } from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import "./assets/style";
import Question from "../../question/Question";

export default class AutoCompleteType extends QuestionBaseAnswerPart {
  protected _value: IPartValue;
  protected readonly label: HTMLLabelElement;
  constructor(part: IQuestionPart, partLayout: string, owner: Question, value: IPartCollection) {
    super(part, partLayout, owner);
    this.label = this.element.querySelector("[data-bc-add-item]");
    this._value = value?.values[0];
    if (this._value) {
      this.label.innerHTML = this._value.title;
    }
  }

  protected setValue(value: IFixValue): boolean {
    const mustChange = this._value?.value !== value.id;
    if (mustChange) {
      this.element.querySelector("label").innerHTML = value.value;
      this._value = {
        title: value.value,
        value: value.id,
      };
    }
    return mustChange;
  }
}
