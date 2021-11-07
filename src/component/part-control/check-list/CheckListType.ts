import IFormMakerOptions from "../../form-maker/IFormMakerOptions";
import { IFixValue, IPartCollection, IQuestion, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import itemLayout from "./assets/item-layout.html";
import HttpUtil from "../../../HttpUtil";
import ListBaseType from "../ListBaseType";
import Question from "../../question/Question";

export default class CheckListType extends ListBaseType {
  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
  }

  protected fillUI(values: Array<IFixValue>) {
    values.forEach((item) => {
      const newTemplate = itemLayout
        .replace("@title", item.value)
        .replace("@value", item.id.toString())
        .replace("@checked", this.values?.values.find((x) => x.value == item.id) ? "checked" : "");
      const template = HttpUtil.parse(newTemplate).querySelector("div");
      this.element.querySelector("div").appendChild(template);
    });
  }
}
