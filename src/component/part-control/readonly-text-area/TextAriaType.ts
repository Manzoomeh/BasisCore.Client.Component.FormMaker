import Question from "../../question/Question";
import { IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import { IUserActionPart } from "../../form-maker/IUserActionResult";
import QuestionPart from "../../question-part/QuestionPart";

export default class ReadOnlyTextAriaType extends QuestionPart {
  private readonly _label: HTMLLabelElement;
  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
    this._label = this.element.querySelector<any>("[data-bc-text-input]");
    this._label.innerHTML = answer?.values[0].value;
  }

  public getAddedParts(): IUserActionPart {
    throw new Error("Method not implemented.");
  }
  public getEditedParts(): IUserActionPart {
    throw new Error("Method not implemented.");
  }
  public getDeletedParts(): IUserActionPart {
    throw new Error("Method not implemented.");
  }
}
