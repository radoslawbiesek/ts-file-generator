import { Argument, Command } from "commander";

const ELEMENTS = ["component", "service"];

const program = new Command();

program
  .command("generate")
  .alias("g")
  .description("generates and/or modifies files based on a provided config")
  .addArgument(new Argument("<name>", "the element name").choices(ELEMENTS))
  .option(
    "-d, --dry-run",
    "run through and reports activity without writing out results",
    false
  )
  .option("-f, --force", "force overwriting of existing files", false)
  .action(function (name, options) {
    console.log(name, options);
  });

program.parse();
