import HttpUtil from "../../HttpUtil";
import AnswerPart from "../answer-part/AnswerPart";
import AnswerPartFactory from "../part-control/AnswerPartFactory";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import { IQuestion } from "../form-maker/ISchema";
import layout from "./assets/layout.html";
import "./assets/style";
import AddRemoveButton from "../answer-part/add-remove-btn/AddRemoveButton";
import AnswerCollection from "../answer-collection/AnswerCollection";

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
      this.button = new AddRemoveButton(owner, this._element);
    }
  }
}
