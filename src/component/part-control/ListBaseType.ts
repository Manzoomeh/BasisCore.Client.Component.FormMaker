import HttpUtil from "../../HttpUtil";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import {
  IFixValue,
  IPartCollection,
  IPartValue,
  IQuestion,
  IQuestionPart,
} from "../form-maker/ISchema";
import QuestionBaseAnswerPart from "./QuestionBaseAnswerPart";
import Question from "../question/Question";

export default abstract class ListBaseType extends QuestionBaseAnswerPart {
  protected values: IPartCollection;
  constructor(part: IQuestionPart, layout: string, owner: Question, answer: IPartCollection) {
    super(part, layout, owner);
    this.values = answer;
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
