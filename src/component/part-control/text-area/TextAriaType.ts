import Question from "../../question/Question";
import { IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import QuestionPart from "../../question-part/QuestionPart";
import { IUserActionPart } from "../../form-maker/IUserActionResult";
import TextBaseType from "./TextBaseType";

export default class TextAriaType extends TextBaseType<HTMLTextAreaElement> {
  //private _textArea: HTMLTextAreaElement;

  // public get changed(): boolean {
  //   return this._textArea.value != (this.answer?.values[0].value ?? "");
  // }

  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
    //this._textArea = this.element.getElementsByTagName("textarea")[0];
    if (answer) {
      this.input.value = answer.values[0].value;
    }
  }

  // public getAddedPart(): IUserActionPart {
  //   let retVal = null;
  //   if (!this.answer) {
  //     retVal = {
  //       part: this.part.part,
  //       values: [
  //         {
  //           value: this._textArea.value,
  //         },
  //       ],
  //     };
  //   }
  //   return retVal;
  // }

  // public getUserEditActionPart(): IUserActionPart {
  //   return {
  //     part: this.part.part,
  //     values: [
  //       {
  //         id: this.answer?.values[0].id,
  //         value: this._textArea.value,
  //       },
  //     ],
  //   };
  // }

  // public getEditedPart(): IUserActionPart {
  //   let retVal = null;
  //   if (this.answer) {
  //     const changed = this.input.value != (this.answer?.values[0].value ?? "");
  //     if (changed) {
  //       retVal = {
  //         part: this.part.part,
  //         values: [
  //           {
  //             ...(this.answer && { id: this.answer.values[0].id }),
  //             value: this.input.value,
  //           },
  //         ],
  //       };
  //     }
  //   }
  //   return retVal;
  // }
}
