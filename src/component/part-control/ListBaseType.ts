import HttpUtil from "../../HttpUtil";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import { IFixValue, IQuestion, IQuestionPart } from "../form-maker/ISchema";
import AnswerPart from "../answer-part/AnswerPart";
import QuestionBaseAnswerPart from "./QuestionBaseAnswerPart";

export default abstract class ListBaseType extends QuestionBaseAnswerPart {
  constructor(
    question: IQuestion,
    part: IQuestionPart,
    layout: string,
    options: IFormMakerOptions,
    container: Element
  ) {
    super(question, part, layout, options, container);
    if (this.part.fixValues) {
      this.fillUI(this.part.fixValues);
    } else {
      this.loadFromServerAsync();
    }
  }

  protected abstract fillUI(values: Array<IFixValue>);
  protected async loadFromServerAsync(): Promise<void> {
    const data = {
      rKey: this.options.rKey,
      prpId: this.question.prpId,
      part: this.part.part,
    };
    const url = HttpUtil.formatString(this.part.link, data);
    const result = await HttpUtil.getDataAsync<Array<IFixValue>>(url);
    this.fillUI(result);
  }
}
