import nextConfig from "eslint-config-next";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.{js,jsx,ts,tsx}"],
  extends: [nextConfig],
  rules: {
    "no-restricted-syntax": ["error", "FunctionExpression", "FunctionDeclaration"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-empty-object-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
});
