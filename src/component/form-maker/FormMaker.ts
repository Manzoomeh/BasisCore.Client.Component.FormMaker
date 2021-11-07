import HttpUtil from "../../HttpUtil";
import IFormMakerOptions from "./IFormMakerOptions";
import IQuestionSchema, { IAnswerSchema } from "./ISchema";
import layout from "./assets/layout.html";
import "./assets/style";
import QuestionCollection from "../question-container/QuestionContainer";

export default class FormMaker {
  readonly options: IFormMakerOptions;
  private readonly _container: HTMLElement;
  private _question: Map<number, QuestionCollection>;
  private _answer: IAnswerSchema;

  private static get defaultOptions(): Partial<IFormMakerOptions> {
    return {
      mode: "new",
    };
  }

  constructor(container: HTMLElement, options: IFormMakerOptions) {
    this.options = {
      ...FormMaker.defaultOptions,
      ...(options ?? ({} as any)),
    };
    this._container = container;
    this._container.innerHTML = layout;
  }

  public async loadUIFromQuestionAsync(): Promise<void> {
    if (this.options.answerUrl) {
      this._answer = await HttpUtil.getDataAsync<IAnswerSchema>(this.options.answerUrl);
    }
    const schema = await HttpUtil.getDataAsync<IQuestionSchema>(this.options.questionUrl);
    var container = this._container.querySelector("[data-bc-property-container]");
    this._question = new Map<number, QuestionCollection>();
    schema.questions.forEach((question) => {
      const answer = this._answer?.properties.find((x) => x.prpId == question.prpId);
      this._question.set(
        question.prpId,
        new QuestionCollection(question, this.options, container, answer)
      );
    });
  }
}
