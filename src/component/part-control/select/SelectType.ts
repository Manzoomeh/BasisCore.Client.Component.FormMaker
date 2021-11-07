import Question from "../../question/Question";
import { IFixValue, IPartCollection, IPartValue, IQuestionPart } from "../../form-maker/ISchema";
import ListBaseType from "../ListBaseType";
import layout from "./assets/layout.html";

export default class SelectType extends ListBaseType {
  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
  }

  protected fillUI(values: Array<IFixValue>) {
    const select = this.element.querySelector("select");
    const value = this.values?.values[0];
    values.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id.toString();
      option.text = item.value;
      option.selected = value?.value == item.id;
      select.options.add(option);
    });
  }
}
