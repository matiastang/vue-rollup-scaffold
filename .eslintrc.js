/*
 * @Author: your name
 * @Date: 2021-10-18 17:15:20
 * @LastEditTime: 2021-10-19 14:11:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-scaffold/.eslintrc.js
 */
module.exports = {
	root: true,
	env: {
		node: true,
	},
	plugins: ['prettier'],
	extends: [
		// 一个配置文件可以从基础配置中继承已启用的规则
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		// 语法解析器的一些配置
		ecmaVersion: 2020,
	},
	rules: {
		// 规则
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		// prettier样式规则，需要和配置文件的统一
		'prettier/prettier': [
			'error',
			{
				trailingComma: 'es5',
				tabWidth: 4,
				useTabs: true,
				semi: false,
				singleQuote: true,
				endOfLine: 'auto',
				printWidth: 100,
				bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
			},
		],
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				jest: true,
			},
		},
	],
}
