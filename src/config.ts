import { z } from "zod";

const configSchema = z.array(
  z.object({
    name: z.string(),
    alias: z.string().optional(),
    template: z.union([
      z.string(),
      z.function().args(z.string().optional()).returns(z.string()),
    ]),
  })
);

export async function getConfig(path: string) {
  const configRaw = await import(path);
  const config = configSchema.parse(configRaw.default);

  return config;
}
