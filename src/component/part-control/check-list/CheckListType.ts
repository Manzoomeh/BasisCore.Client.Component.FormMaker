import { IFixValue, IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import itemLayout from "./assets/item-layout.html";
import HttpUtil from "../../../HttpUtil";
import ListBaseType from "../ListBaseType";
import Question from "../../question/Question";
import { IUserActionPart } from "../../form-maker/IUserActionResult";

export default class CheckListType extends ListBaseType {
  public get changed(): boolean {
    return false;
  }
  public getUserActionPart(): IUserActionPart {
    return null;
  }

  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
  }

  private getCheckedItem() {
    this.element.querySelectorAll("");
  }
  protected fillUI(values: Array<IFixValue>) {
    values.forEach((item) => {
      const newTemplate = itemLayout
        .replace("@title", item.value)
        .replace("@value", item.id.toString())
        .replace("@checked", this.answer?.values.find((x) => x.value == item.id) ? "checked" : "");
      const template = HttpUtil.parse(newTemplate).querySelector("div");
      this.element.querySelector("div").appendChild(template);
    });
  }
}
