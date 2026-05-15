const lintStagedConfig = {
  "*.{js,jsx,ts,tsx}": ["eslint --max-warnings=0", "prettier --check"],
  "*.{css,scss}": ["stylelint --allow-empty-input", "prettier --check"],
  "*.{json,md,yml,yaml}": ["prettier --check"],
};

export default lintStagedConfig;
