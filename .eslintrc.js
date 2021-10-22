module.exports = {
  root : true,
  env : {
    jquery : true,
    browser : true,
    node : true,
    es6 : true
  },
  globals : {
    // script setup
    defineProps : 'readonly',
    defineEmits : 'readonly',
    defineExpose : 'readonly',
    withDefaults : 'readonly'
  },
  extends : [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parser : 'vue-eslint-parser',
  parserOptions : {
    parser : 'babel-eslint',
    // parser : '@typescript-eslint/parser',
    // parser : '@babel/eslint-parser',
    // ecmaVersion : 2020,
    sourceType : 'module',
    jsxPragma : 'React',
    ecmaFeatures : {
      jsx : true
    }
    // requireConfigFile : false,
  },
  rules : {
    'vue/no-use-v-if-with-v-for' : 1,
    'vue/require-prop-types' : 'off',
    'vue/require-default-prop' : 'off',
    'vue/singleline-html-element-content-newline' : 'off',
    'vue/multiline-html-element-content-newline' : 'off',
    'vue/name-property-casing' : ['error', 'PascalCase'],
    'vue/no-v-html' : 'off',
    'accessor-pairs' : 2,
    'arrow-spacing' : [
      2,
      {
        before : true,
        after : true
      }
    ],
    'block-spacing' : [2, 'always'],
    'brace-style' : [
      2,
      '1tbs',
      {
        allowSingleLine : true
      }
    ],
    camelcase : 'off',
    'comma-dangle' : [2, 'never'],
    'comma-spacing' : [
      2,
      {
        before : false,
        after : true
      }
    ],
    'comma-style' : [2, 'last'],
    'constructor-super' : 2,
    curly : [2, 'multi-line'],
    'dot-location' : [2, 'property'],
    'default-case' : 2,
    'eol-last' : 2,
    eqeqeq : [0, 'always', { null : 'ignore' }],
    'generator-star-spacing' : [
      2,
      {
        before : true,
        after : true
      }
    ],
    'handle-callback-err' : [2, '^(err|error)$'],
    indent : [
      2,
      2,
      {
        SwitchCase : 1
      }
    ],
    'jsx-quotes' : [2, 'prefer-single'],
    'key-spacing' : [
      2,
      {
        beforeColon : true,
        afterColon : true
      }
    ],
    'keyword-spacing' : [
      2,
      {
        before : true,
        after : true
      }
    ],
    'new-cap' : [
      2,
      {
        newIsCap : true,
        capIsNew : false
      }
    ],
    'new-parens' : 2,
    'no-array-constructor' : 2,
    'no-caller' : 2,
    'no-console' : 'off',
    'no-class-assign' : 2,
    'no-cond-assign' : 2,
    'no-const-assign' : 2,
    'no-control-regex' : 0,
    'no-delete-var' : 2,
    'no-dupe-args' : 2,
    'no-dupe-class-members' : 2,
    'no-dupe-keys' : 2,
    'no-duplicate-case' : 2,
    'no-empty' : 0,
    'no-empty-character-class' : 2,
    'no-empty-pattern' : 0,
    'no-eval' : 2,
    'no-ex-assign' : 2,
    'no-extend-native' : 0,
    'no-extra-bind' : 2,
    'no-extra-boolean-cast' : 2,
    'no-extra-parens' : [2, 'functions'],
    'no-fallthrough' : 2,
    'no-floating-decimal' : 2,
    'no-func-assign' : 2,
    'no-implied-eval' : 2,
    'no-inner-declarations' : [2, 'functions'],
    'no-invalid-regexp' : 2,
    'no-irregular-whitespace' : 2,
    'no-iterator' : 2,
    'no-label-var' : 2,
    'no-labels' : [
      2,
      {
        allowLoop : false,
        allowSwitch : false
      }
    ],
    'no-lone-blocks' : 2,
    'no-mixed-spaces-and-tabs' : 2,
    'no-multi-spaces' : 2,
    'no-multi-str' : 2,
    'no-multiple-empty-lines' : [
      2,
      {
        max : 1
      }
    ],
    'no-native-reassign' : 0,
    'no-negated-in-lhs' : 2,
    'no-new-object' : 2,
    'no-new-require' : 2,
    'no-new-symbol' : 2,
    'no-new-wrappers' : 2,
    'no-obj-calls' : 2,
    'no-octal' : 2,
    'no-octal-escape' : 2,
    'no-path-concat' : 2,
    'no-proto' : 2,
    'no-redeclare' : 2,
    'no-regex-spaces' : 2,
    'no-return-assign' : [2, 'except-parens'],
    'no-self-assign' : 2,
    'no-self-compare' : 2,
    'no-sequences' : 2,
    'no-shadow-restricted-names' : 2,
    'no-spaced-func' : 2,
    'no-sparse-arrays' : 2,
    'no-this-before-super' : 2,
    'no-throw-literal' : 0,
    'no-trailing-spaces' : 2,
    'no-undef' : 2,
    'no-undef-init' : 0,
    'no-unexpected-multiline' : 2,
    'no-unmodified-loop-condition' : 0,
    'no-unneeded-ternary' : [
      2,
      {
        defaultAssignment : false
      }
    ],
    // 不能有无法执行的代码
    'no-unreachable' : 2,
    'no-unsafe-finally' : 2,
    'no-unused-vars' : [
      2,
      {
        vars : 'all',
        args : 'none'
      }
    ],
    'no-var' : 0,
    'no-void' : 2,
    'no-useless-call' : 2,
    'no-useless-computed-key' : 2,
    'no-useless-constructor' : 2,
    'no-useless-escape' : 0,
    'no-whitespace-before-property' : 2,
    'no-with' : 2,
    'one-var' : [
      2,
      {
        initialized : 'never'
      }
    ],
    'operator-linebreak' : [
      2,
      'after',
      {
        overrides : {
          '?' : 'before',
          ':' : 'before'
        }
      }
    ],
    'padded-blocks' : [2, 'never'],
    quotes : [
      2,
      'single',
      {
        avoidEscape : true,
        allowTemplateLiterals : true
      }
    ],
    semi : [2, 'never'],
    'semi-spacing' : [
      2,
      {
        before : false,
        after : true
      }
    ],
    'space-before-blocks' : [2, 'always'],
    'space-before-function-paren' : [2, 'never'],
    'space-in-parens' : [2, 'always'],
    'space-infix-ops' : 2,
    'space-unary-ops' : [
      2,
      {
        words : true,
        nonwords : false
      }
    ],
    'spaced-comment' : [
      2,
      'always',
      {
        markers : [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ','
        ]
      }
    ],
    'template-curly-spacing' : [2, 'never'],
    'use-isnan' : 2,
    'valid-typeof' : 2,
    'wrap-iife' : [2, 'any'],
    'yield-star-spacing' : [2, 'both'],
    yoda : [2, 'never'],
    'prefer-const' : 2,
    'object-curly-spacing' : [
      2,
      'always',
      {
        objectsInObjects : false
      }
    ],
    'array-bracket-spacing' : [2, 'never']
  }
}
