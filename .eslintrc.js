module.exports = {
  extends: [
    "react-app"
  ],
  "parserOptions": {
    "warnOnUnsupportedTypeScriptVersion": false
  },
  rules: {
    "arrow-body-style": [ "error", "as-needed" ],
    "block-spacing": [ "error", "always" ],
    "comma-dangle": [ "error", "never" ],
    "import/no-anonymous-default-export": "off",
    "no-multi-spaces": [ "error" ],
    "no-multiple-empty-lines": [ "error" ],
    "object-curly-spacing": [ "error", "always", { "arraysInObjects": false } ],
    "padded-blocks": [ "error", "never" ],
    "quotes": [ "error", "double", { "avoidEscape": true } ],
    "space-unary-ops": [ "error" ],
    "space-infix-ops": [ "error" ],
    "semi": [ "error", "never" ],
    "@typescript-eslint/consistent-type-definitions": [ "error", "type" ],
    "@typescript-eslint/member-delimiter-style": [
      "error", {
        multiline: {
          delimiter: "none",
          requireLast: true
        },
        singleline: {
          delimiter: "comma",
          requireLast: false
        }
      }
    ],
    "@typescript-eslint/type-annotation-spacing": [
      "error", {
        before: false,
        after: true,
        overrides: { arrow: { before: true, after: true } }
      }
    ]
  }
}
