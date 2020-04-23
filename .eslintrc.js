module.exports = {
  extends: [
    "react-app"
  ],
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "block-spacing": ["error", "always"],
    "comma-dangle": ["error", "never"],
    "no-multiple-empty-lines": ["error"],
    "object-curly-spacing": ["error", "always", { "arraysInObjects": false }],
    "padded-blocks": ["error", "never"],
    "quotes": ["error", "double", { "avoidEscape": true }],
    "space-unary-ops": ["error"],
    "space-infix-ops": ["error"],
    "semi": ["error", "never"],
    "template-curly-spacing": ["error", "always"]
  }
}
