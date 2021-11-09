// import { IQuestionPart } from "../form-maker/ISchema";
// import HttpUtil from "../../HttpUtil";
// import Question from "../question/Question";

// export default abstract class QuestionPart {
//   protected readonly part: IQuestionPart;
//   protected readonly element: Element;
//   protected readonly owner: Question;

//   constructor(part: IQuestionPart, partLayout: string, owner: Question) {
//     this.owner = owner;
//     this.element = HttpUtil.parse(partLayout).querySelector("[data-bc-part]");
//     this.element.innerHTML = partLayout;
//     this.owner.element.appendChild(this.element);
//     this.part = part;
//     this.element.setAttribute("data-bc-part-related-cell", "");
//   }

//   //setValue();
//   protected formatString(): string {
//     const data = {
//       rKey: this.owner.options.rKey,
//       prpId: this.owner.question.prpId,
//       part: this.part.part,
//     };
//     const url = HttpUtil.formatString(this.part.link, data);
//     return url;
//   }
// }
