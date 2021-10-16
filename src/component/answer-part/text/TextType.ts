import IFormMakerOptions from "../../form-maker/IFormMakerOptions";
import { IQuestion, IQuestionPart } from "../../form-maker/ISchema";
import AnswerPart from "../AnswerPart";
import layout from "./assets/layout.html"

export default class TextType extends AnswerPart {
  private _ctl: HTMLInputElement;
  constructor(question: IQuestion, part: IQuestionPart, options: IFormMakerOptions, container: Element) {
    super(question, part, layout, options, container);
    //this._ctl = HttpUtil.parse(layout).getElementsByTagName("input")[0];
    //this.element.querySelector("[data-bc-part-ctl]").appendChild(this._ctl);
  }
}


