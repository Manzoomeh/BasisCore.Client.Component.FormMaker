import HttpUtil from "../../HttpUtil";
import AnswerCollection from "../answer-collection/AnswerCollection";
import AnswerPart from "../answer-part/AnswerPart";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import { IAnswerResult, IQuestion } from "../form-maker/ISchema";
import AddRemoveButton from "../part-control/add-remove-btn/AddRemoveButton";
import AnswerPartFactory from "../part-control/AnswerPartFactory";
import layout from "./assets/layout.html";
import "./assets/style.css";

export default class Answer {
  readonly question: IQuestion;
  protected readonly container: Element;
  readonly element: Element;
  readonly options: IFormMakerOptions;
  readonly _parts: Array<AnswerPart>;
  readonly button: AddRemoveButton;
  readonly owner: AnswerCollection;

  constructor(
    question: IQuestion,
    options: IFormMakerOptions,
    owner: AnswerCollection,
    container: Element,
    data?: IAnswerResult
  ) {
    this.question = question;
    this.container = container;
    this.options = options;
    this.owner = owner;
    this.element = HttpUtil.parse(layout).querySelector("[data-bc-answer]");
    container.appendChild(this.element);
    this._parts = question.parts.map((part) => {
      const value = data?.parts.find((x) => x.part === part.part);
      return AnswerPartFactory.generate(part, this, value);
    });

    if (this.question.multi) {
      this.button = new AddRemoveButton(
        this.element,
        (data) => this.owner.addAnswer(data),
        () => this.element.remove(),
        this
      );
    }
  }

  public setRemovable() {
    this.button.setRemovable();
  }
}
