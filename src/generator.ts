import fs from "node:fs";
import path from "node:path";

import { Element } from "./config";

export class FileGenerator {
  constructor(
    private element: Element,
    private name: string,
    private options: { dryRun: boolean; force: boolean }
  ) {}

  public generate() {
    this.element.files.forEach(this.#generateFile.bind(this));
  }

  #generateFile(file: Element["files"][number]) {
    const filePath = this.#getOrCreate(file.path);
    if (fs.existsSync(filePath) && !this.options.force) {
      throw new Error(
        `${filePath} already exists. Use the --force flag if you want to overwrite it.`
      );
    }

    const dir = path.dirname(filePath);
    const content = this.#getOrCreate(file.template);

    if (!this.options.dryRun) {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(filePath, content);
    }

    console.log(`CREATED ${filePath}`);
  }

  #getOrCreate(strOrFn: string | ((name: string) => string)): string {
    return typeof strOrFn === "function" ? strOrFn(this.name) : strOrFn;
  }
}
