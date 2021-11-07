import IFormMakerOptions from "../../form-maker/IFormMakerOptions";
import { IQuestion, IQuestionPart } from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import layout from "./assets/layout.html";
import Question from "../../question/Question";

export default class UnknownType extends QuestionBaseAnswerPart {
  constructor(part: IQuestionPart, owner: Question) {
    super(part, layout, owner);
  }
}
