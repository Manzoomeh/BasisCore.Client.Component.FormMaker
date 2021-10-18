import Answer from "../../answer/Answer";
import { IQuestionPart } from "../../form-maker/ISchema";
import QuestionBaseAnswerPart from "../QuestionBaseAnswerPart";
import layout from "./assets/layout.html";

export default class TextAriaType extends QuestionBaseAnswerPart {
  constructor(part: IQuestionPart, owner: Answer) {
    super(part, layout, owner);
  }
}
