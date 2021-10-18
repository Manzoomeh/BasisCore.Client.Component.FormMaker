import HttpUtil from "../../HttpUtil";
import Answer from "../answer/Answer";
import layout from "./assets/layout.html";
import "./assets/style";

export default abstract class AnswerPart {
  protected readonly element: Element;
  protected readonly owner: Answer;

  constructor(partLayout: string, owner: Answer) {
    this.owner = owner;
    this.element = HttpUtil.parse(layout).querySelector("[data-bc-part]");
    this.element.innerHTML = partLayout;
    this.owner.element.appendChild(this.element);
  }
}
