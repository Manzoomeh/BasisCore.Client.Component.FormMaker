import HttpUtil from "../../HttpUtil";
import AnswerCollection from "../answer-collection/AnswerCollection";
import AnswerPart from "../answer-part/AnswerPart";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import { IQuestion } from "../form-maker/ISchema";
import AddRemoveButton from "../part-control/add-remove-btn/AddRemoveButton";
import AnswerPartFactory from "../part-control/AnswerPartFactory";
import layout from "./assets/layout.html";
import "./assets/style.css";

export default class Answer {
  protected readonly question: IQuestion;
  protected readonly container: Element;
  private readonly _element: Element;
  readonly _parts: Array<AnswerPart>;
  readonly button: AddRemoveButton;

  constructor(
    question: IQuestion,
    options: IFormMakerOptions,
    owner: AnswerCollection,
    container: Element
  ) {
    this.question = question;
    this.container = container;
    this._element = HttpUtil.parse(layout).querySelector("[data-bc-answer]");
    container.appendChild(this._element);
    this._parts = question.parts.map((part) =>
      AnswerPartFactory.generate(question, part, options, this._element)
    );

    if (this.question.multi) {
      this.button = new AddRemoveButton(
        this._element,
        () => owner.addAnswer(),
        () => this._element.remove()
      );
    }
  }
}
