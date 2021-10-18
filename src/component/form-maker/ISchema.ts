import IDictionary from "../../IDictionary";

export type WebMethod = "POST" | "GET";

export type ViewType =
  | "Text"
  | "Textarea"
  | "Autocomplete"
  | "Select"
  | "Upload"
  | "Datepicker"
  | "Checklist";

export default interface ISchema {
  schemaId: number;
  schemaVersion: number;
  lid: number;
  baseVocab: string;
  questions: Array<IQuestion>;
  sections: Array<ISection>;
}

export interface IQuestion {
  prpId: number;
  typeId: number;
  ord: number;
  vocab: string;
  title: string;
  wordId: number;
  multi: boolean;
  sectionId: number;
  cssClass: string;
  help?: string;
  parts: Array<IQuestionPart>;
}

export interface IQuestionPart {
  part: number;
  viewType: string | ViewType;
  cssClass: string;
  validations: IDictionary<any>;
  caption?: string;
  link?: string;
  fixValues?: Array<IFixValue>;
  dependency?: Array<IDependency>;
  method?: WebMethod;
}

export interface IFixValue {
  id: number;
  value: string;
}

export interface IDependency {
  id: number;
  part: number;
  schemaId: number;
  prpId: number;
}

export interface IAnswerResult {
  parts: Array<IPartResult>;
}

export interface IPartResult {
  part: number;
  value: any;
  title: string;
}
export interface ISection {
  id: number;
  title: string;
  description: string;
}
