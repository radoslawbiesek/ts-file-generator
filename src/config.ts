import { z } from "zod";

const configSchema = z.array(
  z.object({
    type: z.string(),
    alias: z.string().optional(),
    files: z.array(
      z.object({
        template: z.union([
          z.string(),
          z.function().args(z.string().optional()).returns(z.string()),
        ]),
        path: z.union([
          z.string(),
          z.function().args(z.string().optional()).returns(z.string()),
        ]),
      })
    ),
  })
);

export type Element = {
  type: string;
  alias?: string;
  files: {
    template: string | ((name: string) => string);
    path: string | ((name: string) => string);
  }[];
};

export type Config = Element[];

export async function getConfig(path: string): Promise<Config> {
  const configRaw = await import(path);
  const result = configSchema.safeParse(configRaw.default);

  if (!result.success) {
    throw new Error(`Invalid config format. Please make sure the provided config meets the following type:

    type Config = {
      type: string;
      alias?: string;
      files: {
        template: string | ((name: string) => string);
        path: string | ((name: string) => string);
      }[];
    }[];
    
    Validation error: ${result.error}`);
  }

  return result.data;
}

export function getElement(type: string, config: Config): Config[number] {
  const element = config.find((el) => el.type === type || el.alias === type);

  if (!element) {
    throw new Error(
      `Unexpected type: ${type}. The available types are: ${config
        .map((c) => c.type)
        .join(", ")}.`
    );
  }

  return element;
}
