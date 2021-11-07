export type FormMode = "new" | "edit" | "view";

export default interface IFormMakerOptions {
  mode?: FormMode;
  rKey?: string;
  questionUrl: string;
  answerUrl: string;
}
