export type FormMode = "new" | "edit" | "view"

export default interface IFormMakerOptions {
    mode?: FormMode
    questionUrl: string
}