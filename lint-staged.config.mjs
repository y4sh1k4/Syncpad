const lintStagedConfig = {
  "*.{js,jsx,ts,tsx}": ["eslint", "prettier --write"],
  "*.{css,scss}": ["stylelint --allow-empty-input", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"],
};

export default lintStagedConfig;
