import HttpUtil from "../../HttpUtil";
import { IQuestion, IQuestionPart } from "../form-maker/ISchema";
import layout from "./assets/layout.html";

export abstract class AnswerPart {
  protected _container: Element;

  protected readonly element: Element;
  protected readonly question: IQuestion;
  protected readonly part: IQuestionPart;

  constructor(question: IQuestion, part: IQuestionPart, container: Element) {
    this._container = container;
    this.question = question;
    this.part = part;
    this.element = HttpUtil.parse(layout).querySelector("[data-bc-part]");
    if (question.parts.length == 1) {
      this.element.querySelector("[data-bc-part-title]").remove();
    } else {
      this.element.querySelector("[data-bc-part-title]").innerHTML = part.caption;
    }
    this._container.prepend(this.element);
  }
}
