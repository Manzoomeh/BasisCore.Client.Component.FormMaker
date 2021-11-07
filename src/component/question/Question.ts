import HttpUtil from "../../HttpUtil";
import QuestionPart from "../question-part/QuestionPart";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import { IAnswerPart, IQuestion } from "../form-maker/ISchema";
import QuestionPartFactory from "../part-control/QuestionPartFactory";
import QuestionContainer from "../question-container/QuestionContainer";
import layout from "./assets/layout.html";
import "./assets/style.css";

export default class Question {
  readonly question: IQuestion;
  protected readonly container: Element;
  readonly element: Element;
  readonly options: IFormMakerOptions;
  readonly _parts: Array<QuestionPart>;
  readonly button: HTMLButtonElement;
  readonly owner: QuestionContainer;

  private _onAddClick: AddRemoveCallback;
  private readonly _onRemoveClick: AddRemoveCallback;

  constructor(
    question: IQuestion,
    options: IFormMakerOptions,
    owner: QuestionContainer,
    container: Element,
    answer?: IAnswerPart
  ) {
    this.question = question;
    this.container = container;
    this.options = options;
    this.owner = owner;
    const ui = HttpUtil.parse(layout).querySelector("[data-bc-answer]");
    this.element = ui.querySelector("[data-bc-part-container]");
    if (this.question.multi) {
      this.button = ui.querySelector("[data-bc-btn]");
      this.button.setAttribute("data-bc-btn", "add");
      this.button.addEventListener("click", this.onBtnClick.bind(this));
      this._onAddClick = () => {
        this.owner.addAnswer();
        this.setRemovable();
      };
      this._onRemoveClick = () => ui.remove();
    } else {
      ui.querySelector("[data-bc-btn]").remove();
    }
    container.appendChild(ui);

    this._parts = question.parts.map((part) => {
      const value = answer?.parts.find((x) => x.part === part.part);
      return QuestionPartFactory.generate(question, part, this, value);
    });
  }

  public setRemovable() {
    this.button.setAttribute("data-bc-btn", "remove");
  }

  private onBtnClick(e: MouseEvent) {
    e.preventDefault();
    if (this.button.getAttribute("data-bc-btn") === "add") {
      this._onAddClick();
    } else {
      this._onRemoveClick();
    }
  }

  public replaceAddClick(onClick: AddRemoveCallback) {
    this._onAddClick = onClick;
  }
}

declare type AddRemoveCallback = () => void;
