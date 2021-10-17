import IDictionary from "./IDictionary";

export default class HttpUtil {
  static parser: DOMParser = new DOMParser();

  static getDataAsync<T>(url: string): Promise<T> {
    return HttpUtil.fetchDataAsync(url, "GET");
  }

  static async fetchDataAsync<T>(url: string, method: "POST" | "GET", data?: any): Promise<T> {
    const init: RequestInit = { method: method };
    if (data) {
      init.headers = {
        "Content-Type": "application/json",
      };
      init.body = JSON.stringify(data);
    }
    const result = await fetch(url, init);
    return await result.json();
  }

  static formatString(string: string, params: IDictionary<string> | any): string {
    const paraNameList = [...Object.getOwnPropertyNames(params)];
    const formatter = new Function(...paraNameList, `return \`${string}\``);
    return formatter(...paraNameList.map((x) => Reflect.get(params, x)));
  }

  static parse(template: string): Document {
    return HttpUtil.parser.parseFromString(template, "text/html");
  }

  public static Move(oldParent: Node, newParent: Node) {
    while (oldParent.childNodes.length > 0) {
      newParent.appendChild(oldParent.childNodes[0]);
    }
  }
}
