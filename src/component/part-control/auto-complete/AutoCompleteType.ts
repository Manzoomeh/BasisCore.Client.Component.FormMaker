import { IFixValue, IPartValue, IQuestionPart } from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import "./assets/style";
import Question from "../../question/Question";
import HttpUtil from "../../../HttpUtil";

export default class AutoCompleteType extends QuestionBaseAnswerPart {
  protected _value: number;
  protected readonly label: HTMLLabelElement;
  constructor(part: IQuestionPart, partLayout: string, owner: Question) {
    super(part, partLayout, owner);
    this.label = this.element.querySelector("[data-bc-add-item]");
  }

  protected async getValueAsync(id: number): Promise<IFixValue> {
    const rooUrl = this.part.link.split("?")[0];
    const url = `${rooUrl}?fixid=${id}`;
    return await HttpUtil.getDataAsync<IFixValue>(url);
  }

  protected setValue(value: IFixValue): boolean {
    const mustChange = this._value !== value.id;
    if (mustChange) {
      this.element.querySelector("label").innerHTML = value.value;
      this._value = value.id;
    }
    return mustChange;
  }
}
