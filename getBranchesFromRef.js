const { exec } = require("child_process");

const getBranchesFromRef = async (ref) =>
  new Promise((resolve, reject) => {
    exec(
      `git branch --merged ${ref} | grep -v '^\* '`,
      (error, stdout, stderror) => {
        if (error || stderror) {
          error && console.error("error", error);
          stderror && console.error("stderror", stderror);
          reject(error);
        }

        if (!stdout) {
          throw new Error("No Stdout");
        }

        console.log("Output:");
        console.log(stdout);

        resolve(stdout.split("\n"));
      }
    );
  });

module.exports = getBranchesFromRef;
