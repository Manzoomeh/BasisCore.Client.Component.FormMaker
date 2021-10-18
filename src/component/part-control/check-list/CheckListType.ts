import IFormMakerOptions from "../../form-maker/IFormMakerOptions";
import { IFixValue, IQuestion, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import itemLayout from "./assets/item-layout.html";
import HttpUtil from "../../../HttpUtil";
import ListBaseType from "../ListBaseType";
import Answer from "../../answer/Answer";

export default class CheckListType extends ListBaseType {
  constructor(part: IQuestionPart, owner: Answer) {
    super(part, layout, owner);
  }

  protected fillUI(values: Array<IFixValue>) {
    values.forEach((item) => {
      const newTemplate = itemLayout
        .replace("@title", item.value)
        .replace("@value", item.id.toString());
      const template = HttpUtil.parse(newTemplate).querySelector("div");
      this.element.querySelector("div").appendChild(template);
    });
  }
}
