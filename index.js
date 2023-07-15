const { exec } = require("child_process");

const bump = require("./bump");

const run = async () => {
  const version = process.env["INPUT_VERSION"] ?? "";

  const baseRef = process.env["INPUT_BASE_REF"] ?? "";

  const currentRef = process.env["INPUT_CURRENT_REF"] ?? "";

  if (!version) {
    throw new Error("No Version Specified");
  }

  if (!baseRef) {
    throw new Error("No Base Branch Specified");
  }

  const majorPrefix = process.env["INPUT_MAJOR-WORDING"]?.split(",") ?? [];
  const minorPrefix = process.env["INPUT_MINOR-WORDING"]?.split(",") ?? [];
  const patchPrefix = process.env["INPUT_PATCH-WORDING"]?.split(",") ?? [];

  console.log(`Major Prefixes ${JSON.stringify(majorPrefix)}`);
  console.log(`Minor Prefixes ${JSON.stringify(minorPrefix)}`);
  console.log(`Patch Prefixes ${JSON.stringify(patchPrefix)}`);
  console.log(`Current Version ${version}`);
  console.log(`Base Ref ${baseRef}`);
  console.log(`Current Ref ${currentRef}`);

  return new Promise((res, rej) => {
    exec(
      `git --no-pager log --pretty=format:%s ${baseRef}..${currentRef}`,
      (error, stdout, stderror) => {
        if (error) {
          console.error(error);
          console.error(stderror);
          rej(error);
        }

        if (!stdout) {
          throw new Error("No Stdout");
        }

        console.log("Output:");
        console.log(stdout);

        res(stdout.split("\n"));
      },
    );
  }).then((branches) =>
    bump(branches, version, {
      major: majorPrefix,
      minor: minorPrefix,
      patch: patchPrefix,
    }),
  );
};

run();
