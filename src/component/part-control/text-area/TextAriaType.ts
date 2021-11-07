import Question from "../../question/Question";
import { IQuestionPart } from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import layout from "./assets/layout.html";

export default class TextAriaType extends QuestionBaseAnswerPart {
  constructor(part: IQuestionPart, owner: Question) {
    super(part, layout, owner);
  }
}
