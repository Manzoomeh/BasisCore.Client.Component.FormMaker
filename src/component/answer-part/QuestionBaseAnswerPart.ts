import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import { IQuestion, IQuestionPart } from "../form-maker/ISchema";
import AnswerPart from "./AnswerPart";

export default abstract class QuestionBaseAnswerPart extends AnswerPart {
  protected readonly question: IQuestion;
  protected readonly part: IQuestionPart;
  protected readonly options: IFormMakerOptions;
  constructor(
    question: IQuestion,
    part: IQuestionPart,
    partLayout: string,
    options: IFormMakerOptions,
    container: Element
  ) {
    super(partLayout, container);
    this.question = question;
    this.part = part;
    this.options = options;

    this.element.setAttribute("data-bc-part-related-cell", "");
  }
}
