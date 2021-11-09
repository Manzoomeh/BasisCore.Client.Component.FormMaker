import { IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import Question from "../../question/Question";
import QuestionPart from "../../question-part/QuestionPart";
import { IUserActionPart } from "../../form-maker/IUserActionResult";

export default class TextType extends QuestionPart {
  public get changed(): boolean {
    return this._ctl.value != (this.answer?.values[0].value ?? "");
  }

  private _ctl: HTMLInputElement;
  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
    this._ctl = this.element.getElementsByTagName("input")[0];
    if (answer) {
      this._ctl.value = answer.values[0].value;
    }
  }

  public getUserActionPart(): IUserActionPart {
    return {
      part: this.part.part,
      values: [
        {
          ...(this.answer && { id: this.answer.values[0].id }),
          value: this._ctl.value,
        },
      ],
    };
  }
}
