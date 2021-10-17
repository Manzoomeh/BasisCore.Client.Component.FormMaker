import HttpUtil from "../../HttpUtil";
import Answer from "../answer/Answer";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import { IQuestion } from "../form-maker/ISchema";
import layout from "./assets/layout.html";
import "./assets/style.css";

export default class AnswerCollection {
  private readonly _question: IQuestion;
  private readonly _element: Element;
  private readonly _options: IFormMakerOptions;
  private readonly _answers: Array<Answer> = new Array<Answer>();
  //readonly _headerContainer

  constructor(question: IQuestion, options: IFormMakerOptions, container: Element) {
    this._question = question;

    this._options = options;
    HttpUtil.Move(HttpUtil.parse(layout).body, container);
    this._element = container.querySelector("[data-bc-answer-collection]");

    const headerContainer = container.querySelector("[data-bc-answer-title-container]");
    if (question.parts.length > 1) {
      const template = document.createElement("div");
      template.setAttribute("data-bc-answer-title", "");
      template.setAttribute("data-bc-part-related-cell", "");
      question.parts.forEach((part) => {
        const cpy = template.cloneNode();
        cpy.appendChild(document.createTextNode(part.caption));
        headerContainer.appendChild(cpy);
      });
    } else {
      headerContainer.remove();
    }
    this.addAnswer();
  }

  addAnswer() {
    this._answers.push(new Answer(this._question, this._options, this, this._element));
  }
}
