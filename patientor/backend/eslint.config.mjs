import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["build/**"] },
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			"@typescript-eslint/no-unused-vars": "error",
			"@typescript-eslint/consistent-type-imports": "error",
			"no-case-declarations": "off",
		},
	}
);
