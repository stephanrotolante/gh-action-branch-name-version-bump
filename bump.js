const BRANCH_REGEX = /^[A-z]+\/.*/;

const bump = (branches = [], version, prefixes = {}) => {
  let [major, minor, patch] = version.split(".").map(Number);

  let [bumpMajor, bumpMinor, bumpPatch] = [0, 0, 0];

  const {
    major: majorPrefixes = [],
    minor: minorPrefixes = [],
    patch: patchPrefixes = [],
  } = prefixes;

  branches.forEach((branch) => {
    // If no prefix skip
    if (!BRANCH_REGEX.test(branch)) {
      return;
    }

    const branchPrefix = branch.split("/")[0];

    if (majorPrefixes.includes(branchPrefix)) {
      bumpMajor += 1;
    } else if (minorPrefixes.includes(branchPrefix)) {
      bumpMinor += 1;
    } else if (patchPrefixes.includes(branchPrefix)) {
      bumpPatch += 1;
    }
  });

  if (bumpMajor) {
    major += bumpMajor;
    minor = patch = 0;
  } else if (bumpMinor) {
    minor += bumpMinor;
    patch = 0;
  } else if (bumpPatch) {
    patch += bumpPatch;
  } else {
    patch += 1;
  }

  return `${major}.${minor}.${patch}`;
};

module.exports = bump;
