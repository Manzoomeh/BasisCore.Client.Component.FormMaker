export type FormMode = "new" | "edit" | "view";

export default interface IFormMakerOptions {
  mode?: FormMode;
  rKey?: string;
  schemaUrl: string;
  schemaId: number;
  answerUrl: string;
  entityId: number;
}
