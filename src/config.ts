import { ZodError, z } from "zod";

const configSchema = z.array(
  z.object({
    name: z.string(),
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

type Config = {
  name: string;
  alias?: string;
  files: {
    template: string | ((name: string) => string);
    path: string | ((name: string) => string);
  }[];
}[];

export async function getConfig(path: string): Promise<Config> {
  const configRaw = await import(path);
  const result = configSchema.safeParse(configRaw.default);

  if (!result.success) {
    throw new Error(createErrorMsg(result.error));
  }

  return result.data;
}

function createErrorMsg(err: ZodError) {
  return `Invalid config format. Please make sure the provided config meets the following type:

  type Config = {
    name: string;
    alias?: string;
    files: {
      template: string | ((name: string) => string);
      path: string | ((name: string) => string);
    }[];
  }[];
  
  Validation error: ${err}`;
}
