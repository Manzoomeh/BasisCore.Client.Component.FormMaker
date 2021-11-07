import IFormMakerOptions from "../../form-maker/IFormMakerOptions";
import { IQuestion, IQuestionPart } from "../../form-maker/ISchema";
import QuestionPart from "../../question-part/QuestionPart";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import layout from "./assets/layout.html";
import Question from "../../question/Question";

export default class TextType extends QuestionBaseAnswerPart {
  private _ctl: HTMLInputElement;
  constructor(
    part: IQuestionPart,

    owner: Question
  ) {
    super(part, layout, owner);
    //this._ctl = HttpUtil.parse(layout).getElementsByTagName("input")[0];
    //this.element.querySelector("[data-bc-part-ctl]").appendChild(this._ctl);
  }
}
