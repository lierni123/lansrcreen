// 规则参考https://alloyteam.github.io/eslint-config-alloy/
module.exports = {
  extends: ['eslint-config-alloy/react'],
  // 重写阿里规则
  rules: {
    // @fixable 禁止使用 var
    'no-var': 'warn',
    // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    eqeqeq: 'warn',
    // @fixable 一个缩进必须用2个空格替代
    indent: 'off',
    // @fixable jsx 的 props 缩进规则
    'react/jsx-indent-props': 'off',
    // @fixable 组件内方法必须按照一定规则排序
    'react/sort-comp': 'off',
    // @fixable jsx 的 children 缩进规则
    'react/jsx-indent': 'off',
    // @fixable 注释的斜线或 * 后必须有空格
    'spaced-comment': 'off',
    // @fixable 结尾必须有分号
    semi: [
      'warn',
      'always',
      {
        omitLastInOneLineBlock: true,
      },
    ],
    // @fixable 操作符左右必须有空格，比如 let sum = 1 + 2;
    'space-infix-ops': 'warn',
    // 定义过的变量必须使用
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
      },
    ],
    // 禁止使用字符串 ref
    'react/no-string-refs': 'warn',
    // 禁止使用已废弃的 api
    'react/no-deprecated': 'warn',
    // 禁止变量申明时用逗号一次申明多个
    'one-var': ['warn', 'never'],
    // 禁止出现没必要的 constructor，比如 constructor(value) { super(value) }
    'no-useless-constructor': 'warn',
  },
  globals: {
    __webpack_public_path__: true,
  },
};
