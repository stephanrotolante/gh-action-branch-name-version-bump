const assert = require("assert");

const bump = require("./bump");

const prefixes = {
  major: ["feature"],
  minor: ["bugfix"],
  patch: ["chore", "hotfix"],
};

let branches;
// Test 1
branches = ["feature/kdldld-emdkdk"];
assert.equal("1.0.0", bump(branches, "0.0.0", prefixes));
assert.equal("1.0.0", bump(branches, "0.1.0", prefixes));
assert.equal("1.0.0", bump(branches, "0.0.1", prefixes));
assert.equal("2.0.0", bump(branches, "1.0.0", prefixes));

// Test 2
branches = ["feature/", "this-this-a-horrible-name", "feature/kdldld-emdkdk"];
assert.equal("2.0.0", bump(branches, "0.0.0", prefixes));
assert.equal("2.0.0", bump(branches, "0.1.0", prefixes));
assert.equal("2.0.0", bump(branches, "0.0.1", prefixes));
assert.equal("3.0.0", bump(branches, "1.0.0", prefixes));

// Test 3
branches = ["this-this-a-horrible-name"];
assert.equal("0.0.1", bump(branches, "0.0.0", prefixes));
assert.equal("0.1.1", bump(branches, "0.1.0", prefixes));
assert.equal("0.0.2", bump(branches, "0.0.1", prefixes));
assert.equal("1.0.1", bump(branches, "1.0.0", prefixes));

// Test 4
branches = ["this-this-a-horrible-name", "this-this-a-horrible-name"];
assert.equal("0.0.1", bump(branches, "0.0.0", prefixes));
assert.equal("0.1.1", bump(branches, "0.1.0", prefixes));
assert.equal("0.0.2", bump(branches, "0.0.1", prefixes));
assert.equal("1.0.1", bump(branches, "1.0.0", prefixes));

// Test 4
branches = ["this-this-a-horrible-name", "this-this-a-horrible-name", "chore/"];
assert.equal("0.0.1", bump(branches, "0.0.0", prefixes));
assert.equal("0.1.1", bump(branches, "0.1.0", prefixes));
assert.equal("0.0.2", bump(branches, "0.0.1", prefixes));
assert.equal("1.0.1", bump(branches, "1.0.0", prefixes));

// Test 5
branches = [
  "this-this-a-horrible-name",
  "this-this-a-horrible-name",
  "chore/",
  "hotfix/",
];
assert.equal("0.0.2", bump(branches, "0.0.0", prefixes));
assert.equal("0.1.2", bump(branches, "0.1.0", prefixes));
assert.equal("0.0.3", bump(branches, "0.0.1", prefixes));
assert.equal("1.0.2", bump(branches, "1.0.0", prefixes));

// Test 6
branches = [
  "this-this-a-horrible-name",
  "this-this-a-horrible-name",
  "chore/",
  "hotfix/",
  "bugfix/",
];
assert.equal("0.1.0", bump(branches, "0.0.0", prefixes));
assert.equal("0.2.0", bump(branches, "0.1.0", prefixes));
assert.equal("0.1.0", bump(branches, "0.0.1", prefixes));
assert.equal("1.1.0", bump(branches, "1.0.0", prefixes));

// Test 7
branches = [
  "this-this-a-horrible-name",
  "this-this-a-horrible-name",
  "chore/",
  "hotfix/",
  "bugfix/",
  "feature/",
];
assert.equal("1.0.0", bump(branches, "0.0.0", prefixes));
assert.equal("1.0.0", bump(branches, "0.1.0", prefixes));
assert.equal("1.0.0", bump(branches, "0.0.1", prefixes));
assert.equal("2.0.0", bump(branches, "1.0.0", prefixes));
