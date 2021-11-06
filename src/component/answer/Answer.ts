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
  readonly button: HTMLButtonElement;
  readonly owner: AnswerCollection;

  private _onAddClick: AddRemoveCallback;
  private readonly _onRemoveClick: AddRemoveCallback;

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
    const ui = HttpUtil.parse(layout).querySelector("[data-bc-answer]");
    this.element = ui.querySelector("[data-bc-part-container]");
    if (this.question.multi) {
      this.button = ui.querySelector("[data-bc-btn]");
      this.button.setAttribute("data-bc-btn", "add");
      this.button.addEventListener("click", this.onBtnClick.bind(this));
      this._onAddClick = () => this.owner.addAnswer();
      this._onRemoveClick = () => ui.remove();
    } else {
      ui.querySelector("[data-bc-btn]").remove();
    }
    container.appendChild(ui);

    this._parts = question.parts.map((part) => {
      const value = data?.parts.find((x) => x.part === part.part);
      return AnswerPartFactory.generate(question, part, this, value);
    });

    // if (this.question.multi) {
    //   this.button = new AddRemoveButton(
    //     this.element,
    //     (isAdd) => (isAdd ? this.owner.addAnswer() : this.element.remove()),
    //     this
    //   );
    // }
  }

  public setRemovable() {
    this.button.setAttribute("data-bc-btn", "remove");
  }

  // public setRemovable() {
  //   this.button.setRemovable();
  // }

  private onBtnClick(e: MouseEvent) {
    e.preventDefault();
    if (this.button.getAttribute("data-bc-btn") === "add") {
      this._onAddClick();
      this.setRemovable();
    } else {
      this._onRemoveClick();
    }
  }

  public replaceAddClick(onClick: AddRemoveCallback) {
    this._onAddClick = onClick;
  }
}

declare type AddRemoveCallback = () => void;
