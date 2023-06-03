import { Argument, Command } from "commander";

import { getConfig, getElement } from "./config";

const DEFAULT_CONFIG_PATH = "./tgconfig.cjs";

const program = new Command();

program
  .command("generate")
  .alias("g")
  .description("generates and/or modifies files based on a provided config")
  .addArgument(new Argument("<type>", "the element type"))
  .addArgument(new Argument("<name>", "the element name"))
  .option("-c, --config-path", "path to the config file", DEFAULT_CONFIG_PATH)
  .option(
    "-d, --dry-run",
    "run through and reports activity without writing out results",
    false
  )
  .option("-f, --force", "force overwriting of existing files", false)
  .action(generate);

program.parse();

async function generate(
  type: string,
  name: string,
  options: { dryRun: boolean; force: boolean; configPath: string }
) {
  const config = await getConfig(options.configPath);
  const element = getElement(type, config);

  console.log(element, name);
}
