// https://blog.csdn.net/lw001x/article/details/123891939
// 高低版本兼容不同版本eslint 一键格式化

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    // 'vue/setup-compiler-macros': true,
    
    // // 常用
    // browser: true,             // 浏览器全局变量
    // node: true,                // Node.js 全局变量和 Node.js 作用域
    // commonjs: true,            // CommonJS 全局变量和 CommonJS 作用域 (启用此环境用于使用 Browserify/WebPack 的 browser-only 代码)
    // 'shared-node-browser': true, // Node.js 和 Browser 通用的全局变量
    // es6: true,                 // 启用除 modules 以外的所有 ECMAScript 6 特性  (这会自动将 `ecmaVersion` 解析器选项设置为 6)
    // es2017: true,              // 添加所有 ECMAScript 2017 的全局变量并且自动设置 `ecmaVersion` 解析器选项设置为 8
    // es2020: true,              // 添加所有 ECMAScript 2020 的全局变量并且自动设置 `ecmaVersion` 解析器选项设置为 11
    // es2021: true,              // 添加所有 ECMAScript 2021 的全局变量并且自动设置 `ecmaVersion` 解析器选项设置为 12
    // worker: true,              // web workers 全局变量
    //
    // // 不常用
    // amd: true,                 // 根据 amd 规范定义 `require()` 和 `define()` 作为全局变量
    // mocha: true,               // 添加所有 Mocha 测试全局变量
    // jasmine: true,             // 为版本 1.3 和 2.0 添加所有 Jasmine 测试全局变量
    // jest: true,                // Jest 全局变量
    // phantomjs: true,           // PhantomJS 全局变量
    // protractor: true,          // Protractor 全局变量
    // qunit: true,               // QUnit 全局变量
    // jquery: true,              // jQuery 全局变量
    // greasemonkey: true,        // GreaseMonkey 全局变量
    // prototypejs: true,         // Prototype.js 全局变量
    // shelljs: true,             // ShellJS 全局变量
    // meteor: true,              // Meteor 全局变量
    // mongo: true,               // MongoDB 全局变量
    // applescript: true,         // AppleScript 全局变量
    // nashorn: true,             // Java 8 Nashorn 全局变量
    // serviceworker: true,       // Service Worker 全局变量
    // atomtest: true,            // Atom 测试助手全局变量
    // embertest: true,           // Ember 测试助手全局变量
    // webextensions: true,       // WebExtensions 全局变量
    
  },
  globals: {
    $: "readonly",
    $$: "readonly",
    $ref: "readonly",
    $shallowRef: "readonly",
    $computed: "readonly",
    Fn: "readonly",
    PromiseFn: "readonly",
    RefType: "readonly",
    LabelValueOptions: "readonly",
    EmitType: "readonly",
    TargetContext: "readonly",
    ComponentElRef: "readonly",
    ComponentRef: "readonly",
    ElRef: "readonly",
    global: "readonly",
    ForDataType: "readonly",
    ComponentRoutes: "readonly",
    
    // script setup
    defineOptions: "readonly",
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
    
    document: "readonly",
    localStorage: "readonly",
    baiduMap: "readonly",
    window: "readonly",
    // 腾讯地图
    TMap: "readonly",
  },
  extends: [
    'standard',
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "prettier"
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    // ecmaVersion: 'latest',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: "React",
    ecmaFeatures: {
      modules: true,
      jsx: true
    },
    //  Parsing error: This experimental syntax requires enabling one of the following parser plugin(s): "jsx", "flow", "typescript"
    //  https://github.com/babel/babel/issues/14546
    babelOptions : {
      parserOpts: {
        plugins: ["jsx"]
      }
    },
    requireConfigFile: false,
    parser: '@babel/eslint-parser'
  },
  plugins: [
    'vue'
  ],
  // https://eslint.vuejs.org/rules/max-attributes-per-line.html
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    "vue/multi-word-component-names": "off",
    'vue/no-v-html' : 'off',
    
    'no-plusplus': [
      'off',
      {
        allowForLoopAfterthoughts: true
      }
    ],
    
    'vue/max-attributes-per-line' : [2, {
      singleline : {
        max : 10
      },
      multiline : {
        max : 1
      }
    }],
    'vue/no-use-v-if-with-v-for' : 1,
    'vue/require-prop-types' : 'off',
    'vue/require-default-prop' : 'off',
    'vue/singleline-html-element-content-newline' : 'off',
    'vue/multiline-html-element-content-newline' : 'off',
    // 'vue/name-property-casing' : ['error', 'PascalCase'],
    
    'accessor-pairs' : 2,
    'arrow-spacing' : [2, {
      before : true,
      after : true
    }],
    'block-spacing' : [2, 'always'],
    'brace-style' : [2, '1tbs', {
      allowSingleLine : true
    }],
    camelcase : 'off',
    'comma-dangle' : [2, 'never'],
    'comma-spacing' : [2, {
      before : false,
      after : true
    }],
    'comma-style' : [2, 'last'],
    'constructor-super' : 2,
    curly : [2, 'multi-line'],
    'dot-location' : [2, 'property'],
    'default-case' : 2,
    'eol-last' : 2,
    eqeqeq : [0, 'always', { null : 'ignore' }],
    'generator-star-spacing' : [2, {
      before : true,
      after : true
    }],
    'handle-callback-err' : [2, '^(err|error)$'],
    indent : [2, 2, {
      SwitchCase : 1
    }],
    'jsx-quotes' : [2, 'prefer-single'],
    'key-spacing' : [2, {
      beforeColon : true,
      afterColon : true
    }],
    'keyword-spacing' : [2, {
      before : true,
      after : true
    }],
    'new-cap' : 'off',
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
    'no-extend-native' : 2,
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
    'no-labels' : [2, {
      allowLoop : false,
      allowSwitch : false
    }],
    'no-lone-blocks' : 2,
    'no-mixed-spaces-and-tabs' : 2,
    'no-multi-spaces' : 2,
    'no-multi-str' : 2,
    'no-multiple-empty-lines' : [2, {
      max : 1
    }],
    'no-native-reassign' : 2,
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
    'no-unneeded-ternary' : [2, {
      defaultAssignment : false
    }],
    'no-unreachable' : 2,
    'no-unsafe-finally' : 2,
    'no-unused-vars' : [2, {
      vars : 'all',
      args : 'none'
    }],
    'no-var' : 0,
    'no-void' : 2,
    'no-useless-call' : 2,
    'no-useless-computed-key' : 2,
    'no-useless-constructor' : 2,
    'no-useless-escape' : 0,
    'no-whitespace-before-property' : 2,
    'no-with' : 2,
    'one-var' : [2, {
      initialized : 'never'
    }],
    'operator-linebreak' : [2, 'after', {
      overrides : {
        '?' : 'before',
        ':' : 'before'
      }
    }],
    'padded-blocks' : [2, 'never'],
    quotes : [2, 'single', {
      avoidEscape : true,
      allowTemplateLiterals : true
    }],
    semi : [2, 'never'],
    'semi-spacing' : [2, {
      before : false,
      after : true
    }],
    'space-before-blocks' : [2, 'always'],
    'space-before-function-paren' : [2, 'never'],
    'space-in-parens' : [2, 'always'],
    'space-infix-ops' : 2,
    'space-unary-ops' : [2, {
      words : true,
      nonwords : false
    }],
    'spaced-comment' : [2, 'always', {
      markers : ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing' : [2, 'never'],
    'use-isnan' : 2,
    'valid-typeof' : 2,
    'wrap-iife' : [2, 'any'],
    'yield-star-spacing' : [2, 'both'],
    yoda : [2, 'never'],
    'prefer-const' : 2,
    'no-debugger' : process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing' : [2, 'always', {
      objectsInObjects : false
    }],
    'array-bracket-spacing' : [2, 'never']
  }
}
