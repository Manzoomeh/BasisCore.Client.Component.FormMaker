import IFormMakerOptions from "../../form-maker/IFormMakerOptions";
import { IQuestion, IQuestionPart } from "../../form-maker/ISchema";
import AnswerPart from "../../answer-part/AnswerPart";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import layout from "./assets/layout.html";

export default class UnknownType extends QuestionBaseAnswerPart {
  constructor(
    question: IQuestion,
    part: IQuestionPart,
    options: IFormMakerOptions,
    container: Element
  ) {
    super(question, part, layout, options, container);
  }
}
