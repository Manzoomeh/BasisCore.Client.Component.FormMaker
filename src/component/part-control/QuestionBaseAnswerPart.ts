import { IQuestionPart } from "../form-maker/ISchema";
import AnswerPart from "../answer-part/AnswerPart";
import HttpUtil from "../../HttpUtil";
import Answer from "../answer/Answer";

export default abstract class QuestionBaseAnswerPart extends AnswerPart {
  protected readonly part: IQuestionPart;

  constructor(part: IQuestionPart, partLayout: string, owner: Answer) {
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
