import { IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import Question from "../../question/Question";
import QuestionPart from "../../question-part/QuestionPart";
import { IUserActionPart } from "../../form-maker/IUserActionResult";

export default class TextType extends QuestionPart {
  public get changed(): boolean {
    return this._input.value != (this.answer?.values[0].value ?? "");
  }

  private _input: HTMLInputElement;
  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
    this._input = this.element.getElementsByTagName("input")[0];
    if (answer) {
      this._input.value = answer.values[0].value;
    }
  }

  public getAddedPart(): IUserActionPart {
    let retVal = null;
    if (!this.answer) {
      retVal = {
        part: this.part.part,
        values: [
          {
            value: this._input.value,
          },
        ],
      };
    }
    return retVal;
  }
  // public getEditedPart(): IUserActionPart {
  //   let retVal = null;
  //   if (this.answer) {
  //   return {
  //     part: this.part.part,
  //     values: [
  //       {
  //         ...(this.answer && { id: this.answer.values[0].id }),
  //         value: this._input.value,
  //       },
  //     ],
  //   };
  // }
}
