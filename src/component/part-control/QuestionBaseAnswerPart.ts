import { IQuestionPart } from "../form-maker/ISchema";
import QuestionPart from "../question-part/QuestionPart";
import HttpUtil from "../../HttpUtil";
import Question from "../question/Question";

export default abstract class QuestionBaseAnswerPart extends QuestionPart {
  protected readonly part: IQuestionPart;

  constructor(part: IQuestionPart, partLayout: string, owner: Question) {
    super(partLayout, owner);
    this.part = part;
    this.element.setAttribute("data-bc-part-related-cell", "");
  }

  //setValue();
  protected formatString(): string {
    const data = {
      rKey: this.owner.options.rKey,
      prpId: this.owner.question.prpId,
      part: this.part.part,
    };
    const url = HttpUtil.formatString(this.part.link, data);
    return url;
  }
}
