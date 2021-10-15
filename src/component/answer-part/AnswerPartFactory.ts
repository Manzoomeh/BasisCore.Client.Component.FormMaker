import TextPart from "./TextAnswer";
import { IQuestion, IQuestionPart } from "../form-maker/ISchema";
import { AnswerPart } from "./AnswerPart";

export default class AnswerPartFactory {
  public static generate(question: IQuestion, part: IQuestionPart, container: Element): AnswerPart {
    return new TextPart(question, part, container);
  }
}
