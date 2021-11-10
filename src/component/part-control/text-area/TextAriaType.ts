import Question from "../../question/Question";
import { IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import QuestionPart from "../../question-part/QuestionPart";
import { IUserActionPart } from "../../form-maker/IUserActionResult";

export default class TextAriaType extends QuestionPart {
  private _textArea: HTMLTextAreaElement;

  public get changed(): boolean {
    return this._textArea.value != (this.answer?.values[0].value ?? "");
  }

  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
    this._textArea = this.element.getElementsByTagName("textarea")[0];
    if (answer) {
      this._textArea.value = answer.values[0].value;
    }
  }

  public getAddedPart(): IUserActionPart {
    let retVal = null;
    if (!this.answer) {
      retVal = {
        part: this.part.part,
        values: [
          {
            value: this._textArea.value,
          },
        ],
      };
    }
    return retVal;
  }

  public getUserEditActionPart(): IUserActionPart {
    return {
      part: this.part.part,
      values: [
        {
          id: this.answer?.values[0].id,
          value: this._textArea.value,
        },
      ],
    };
  }
}
