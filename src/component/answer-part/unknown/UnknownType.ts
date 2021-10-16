import IFormMakerOptions from "../../form-maker/IFormMakerOptions";
import { IQuestion, IQuestionPart } from "../../form-maker/ISchema";
import AnswerPart from "../AnswerPart";
import layout from "./assets/layout.html"

export default class UnknownType extends AnswerPart {
  constructor(question: IQuestion, part: IQuestionPart, options: IFormMakerOptions, container: Element) {
    super(question, part, layout, options, container);

  }
}
