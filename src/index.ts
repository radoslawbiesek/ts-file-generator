import { Argument, Command } from "commander";

import { getConfig } from "./config";

const program = new Command();

program
  .command("generate")
  .alias("g")
  .description("generates and/or modifies files based on a provided config")
  .addArgument(new Argument("<name>", "the element name"))
  .option("-c, --config-path", "path to the config file", "./tgconfig.cjs")
  .option(
    "-d, --dry-run",
    "run through and reports activity without writing out results",
    false
  )
  .option("-f, --force", "force overwriting of existing files", false)
  .action(generate);

program.parse();

async function generate(
  name: string,
  options: { dryRun: boolean; force: boolean; configPath: string }
) {
  const config = await getConfig(options.configPath);

  console.log(config);
}
