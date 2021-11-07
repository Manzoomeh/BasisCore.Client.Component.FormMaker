import HttpUtil from "../../HttpUtil";
import Question from "../question/Question";
import layout from "./assets/layout.html";
import "./assets/style";

export default abstract class QuestionPart {
  protected readonly element: Element;
  protected readonly owner: Question;

  constructor(partLayout: string, owner: Question) {
    this.owner = owner;
    this.element = HttpUtil.parse(layout).querySelector("[data-bc-part]");
    this.element.innerHTML = partLayout;
    this.owner.element.appendChild(this.element);
  }
}
