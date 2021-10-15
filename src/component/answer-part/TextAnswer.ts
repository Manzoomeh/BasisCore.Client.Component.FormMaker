import HttpUtil from "../../HttpUtil";
import { IQuestion, IQuestionPart } from "../form-maker/ISchema";
import { AnswerPart } from "./AnswerPart";

export default class TextPart extends AnswerPart {
  private _ctl: HTMLInputElement;
  constructor(question: IQuestion, part: IQuestionPart, container: Element) {
    super(question, part, container);
    this._ctl = HttpUtil.parse("<input type='text'>").getElementsByTagName("input")[0];
    this.element.querySelector("[data-bc-part-ctl]").appendChild(this._ctl);
  }
}
