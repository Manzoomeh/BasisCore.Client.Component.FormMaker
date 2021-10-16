import HttpUtil from "../../HttpUtil";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import { IQuestion, IQuestionPart } from "../form-maker/ISchema";
import layout from "./assets/layout.html";
import "./assets/style"

export default abstract class AnswerPart {
  protected _container: Element;

  protected readonly element: Element;
  protected readonly question: IQuestion;
  protected readonly part: IQuestionPart;
  protected readonly options: IFormMakerOptions;

  constructor(question: IQuestion, part: IQuestionPart, partLayout: string, options: IFormMakerOptions, container: Element) {
    this._container = container;
    this.question = question;
    this.part = part;
    this.options = options;
    this.element = HttpUtil.parse(layout).querySelector("[data-bc-part]");
    if (question.parts.length == 1) {
      this.element.querySelector("[data-bc-part-title]").remove();
    } else {
      this.element.querySelector("[data-bc-part-title]").innerHTML = part.caption;
    }
    this.element.querySelector("[data-bc-part-ctl]").innerHTML = partLayout;
    this._container.appendChild(this.element);
  }
}
