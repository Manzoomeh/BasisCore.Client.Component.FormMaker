import { IPartCollection, IQuestion, IQuestionPart } from "../../form-maker/ISchema";
import QuestionPartTypeBase from "../QuestionBaseAnswerPart";
import layout from "./assets/layout.html";
import Question from "../../question/Question";

export default class TextType extends QuestionPartTypeBase {
  private _ctl: HTMLInputElement;
  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner);
    this._ctl = this.element.getElementsByTagName("input")[0];
    if (answer) {
      this._ctl.value = answer.values[0].value;
    }
  }
}
