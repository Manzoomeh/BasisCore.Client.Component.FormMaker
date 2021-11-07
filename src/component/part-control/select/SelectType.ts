import Question from "../../question/Question";
import IFormMakerOptions from "../../form-maker/IFormMakerOptions";
import { IFixValue, IQuestion, IQuestionPart } from "../../form-maker/ISchema";
import ListBaseType from "../ListBaseType";
import layout from "./assets/layout.html";

export default class SelectType extends ListBaseType {
  constructor(part: IQuestionPart, owner: Question) {
    super(part, layout, owner);
  }

  protected fillUI(values: Array<IFixValue>) {
    const select = this.element.querySelector("select");
    values.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id.toString();
      option.text = item.value;
      select.options.add(option);
    });
  }
}
