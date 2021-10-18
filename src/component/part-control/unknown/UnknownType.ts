import IFormMakerOptions from "../../form-maker/IFormMakerOptions";
import { IQuestion, IQuestionPart } from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import layout from "./assets/layout.html";
import Answer from "../../answer/Answer";

export default class UnknownType extends QuestionBaseAnswerPart {
  constructor(part: IQuestionPart, owner: Answer) {
    super(part, layout, owner);
  }
}
