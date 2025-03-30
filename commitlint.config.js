module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 200],
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation update
        "style", // Code style (formatting, missing semi-colons, etc)
        "refactor", // Code refactoring (no feature change, no bug fix)
        "test", // Adding or modifying tests
        "chore", // Maintenance (build process, dependencies)
        "ci", // Continuous Integration
        "perf", // Performance improvements
      ],
    ],
    "subject-case": [2, "always", "sentence-case"], // Enforces sentence case in commit messages
  },
};
