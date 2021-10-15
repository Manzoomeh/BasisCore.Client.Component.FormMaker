import HttpUtil from "../../HttpUtil";
import { AnswerPart } from "../answer-part/AnswerPart";
import AnswerPartFactory from "../answer-part/AnswerPartFactory";
import { IQuestion } from "../form-maker/ISchema";
import layout from "./assets/layout.html";

export default class Answer {
  protected readonly question: IQuestion;
  protected readonly container: Element;
  private readonly _element: Element;
  readonly _parts: Array<AnswerPart>;

  constructor(question: IQuestion, container: Element) {
    this.question = question;
    this.container = container;
    this._element = HttpUtil.parse(layout).querySelector("[data-bc-part-container]");
    if (!this.question.multi) {
      this._element.querySelector("[data-bc-btn-container]").remove();
    }
    //const partContainer = this._element.querySelector("[data-bc-part-container]");

    container.appendChild(this._element);
    this._parts = question.parts.map((part) =>
      AnswerPartFactory.generate(question, part, this._element)
    );
  }
}
