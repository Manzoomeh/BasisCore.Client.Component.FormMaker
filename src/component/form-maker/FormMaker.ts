import HttpUtil from "../../HttpUtil";
import IFormMakerOptions from "./IFormMakerOptions";
import IQuestionSchema, { IAnswerSchema } from "./ISchema";
import layout from "./assets/layout.html";
import "./assets/style";
import QuestionCollection from "../question-container/QuestionContainer";
import { IUserActionResult } from "./IUserActionResult";

export default class FormMaker {
  readonly options: IFormMakerOptions;
  private readonly _container: HTMLElement;
  private _questions: Array<QuestionCollection>;
  private _answer: IAnswerSchema;
  private _schema: IQuestionSchema;

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
      this._answer = await HttpUtil.getDataAsync<IAnswerSchema>(
        this.options.answerUrl
      );
    }
    this._schema = await HttpUtil.getDataAsync<IQuestionSchema>(
      this.options.questionUrl
    );
    var container = this._container.querySelector(
      "[data-bc-property-container]"
    );
    this._questions = new Array<QuestionCollection>();
    this._schema.questions.forEach((question) => {
      const answer = this._answer?.properties.find(
        (x) => x.prpId == question.prpId
      );
      this._questions.push(
        new QuestionCollection(question, this.options, container, answer)
      );
    });
  }

  public getAnswers() {
    const retVal: IUserActionResult = {
      lid: this._schema.lid,
      schemaId: this._schema.schemaId,
      schemaVersion: this._schema.schemaVersion,
      usedForId: this._answer?.usedForId,
      properties: this._questions
        .map((x) => x.getUserAction())
        .filter((x) => x),
    };

    return retVal;
  }
}
