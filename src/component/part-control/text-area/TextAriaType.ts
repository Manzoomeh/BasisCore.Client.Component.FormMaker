import Question from "../../question/Question";
import { IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import layout from "./assets/layout.html";

export default class TextAriaType extends QuestionBaseAnswerPart {
  private _ctl: HTMLTextAreaElement;
  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner);
    this._ctl = this.element.getElementsByTagName("textarea")[0];
    if (answer) {
      this._ctl.value = answer.values[0].value;
    }
  }
}
