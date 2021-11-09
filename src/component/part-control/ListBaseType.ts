import HttpUtil from "../../HttpUtil";
import { IFixValue, IPartCollection, IQuestionPart } from "../form-maker/ISchema";
import { IUserActionPart } from "../form-maker/IUserActionResult";
import QuestionPart from "../question-part/QuestionPart";
import Question from "../question/Question";

export default abstract class ListBaseType extends QuestionPart {
  constructor(part: IQuestionPart, layout: string, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
    if (this.part.fixValues) {
      this.fillUI(this.part.fixValues);
    } else {
      this.loadFromServerAsync();
    }
  }

  protected abstract fillUI(values: Array<IFixValue>);
  protected async loadFromServerAsync(): Promise<void> {
    const data = {
      rKey: this.owner.options.rKey,
      prpId: this.owner.question.prpId,
      part: this.part.part,
    };
    const url = HttpUtil.formatString(this.part.link, data);
    const result = await HttpUtil.getDataAsync<Array<IFixValue>>(url);
    this.fillUI(result);
  }
}
