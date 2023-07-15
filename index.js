const { exec } = require("child_process");

const bump = require("./bump");
const getBranchesFromRef = require("./getBranchesFromRef");

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

  const baseBranches = await getBranchesFromRef(baseRef);

  const currentBranches = await getBranchesFromRef(currentRef);

  const diff = currentBranches
    .filter((element) => !baseBranches.includes(element))
    .map((branch) => branch.trim());

  const newVersion = bump(diff, version, {
    major: majorPrefix,
    minor: minorPrefix,
    patch: patchPrefix,
  });

  console.log(`Bumped Version ${newVersion}`);

  await new Promise((resolve, reject) => {
    exec(
      `echo "bumped-version=${newVersion}" >> $GITHUB_OUTPUT`,
      (error, _stdout, stderror) => {
        if (error || stderror) {
          error && console.error("error", error);
          stderror && console.error("stderror", stderror);
          reject(error);
        }

        resolve();
      }
    );
  });
};

run();
