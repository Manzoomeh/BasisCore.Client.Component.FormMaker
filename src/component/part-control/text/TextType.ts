import { IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import Question from "../../question/Question";
import QuestionPart from "../../question-part/QuestionPart";
import { IUserActionPart } from "../../form-maker/IUserActionResult";
import TextBaseType from "../text-area/TextBaseType";

export default class TextType extends TextBaseType<HTMLInputElement> {
  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
  }

  // public getAddedPart(): IUserActionPart {
  //   let retVal = null;
  //   if (!this.answer) {
  //     retVal = {
  //       part: this.part.part,
  //       values: [
  //         {
  //           value: this.input.value,
  //         },
  //       ],
  //     };
  //   }
  //   return retVal;
  // }

  // public getEditedPart(): IUserActionPart {
  //   let retVal = null;
  //   if (this.answer) {
  //     const changed = this._input.value != (this.answer?.values[0].value ?? "");
  //     if (changed) {
  //       retVal = {
  //         part: this.part.part,
  //         values: [
  //           {
  //             ...(this.answer && { id: this.answer.values[0].id }),
  //             value: this._input.value,
  //           },
  //         ],
  //       };
  //     }
  //   }
  //   return retVal;
  // }
}
