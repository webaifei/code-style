## 代码规范

>  是一套代码书写规则集合。大致分成三个部分，三者之间的界限不是泾渭分明的，可能有有重合的地方。
1. 可以格式化的规则 
2. 代码质量规则
3. 常见的代码最佳实践或者要避免的反模式。

|规范分类|示例|主要作用|
|-----|-----|-----|
|Formatting rules|indent, qoutes, max-length...	|统一代码风格,减少阅读成本|
|Code-quality rules|	no-unused-var, no-undef,  use const , let ...|	减少运行时错误，|
|Best-practice|	never use eval, clearTimeout ...	|代码稳定性、健壮性、安全性|

**使用代码规范的最终目的是提升质量，降低维护成本，如果某些规范违反了目标，删除它~**

**使用代码规范的最终目的是提升质量，降低维护成本，如果某些规范违反了目标，删除它~**

**使用代码规范的最终目的是提升质量，降低维护成本，如果某些规范违反了目标，删除它~**


## 规则
### 流行的代码风格（基于eslint）
1. [Airbnb javascript code style](https://github.com/yuche/javascript)
2. [ESlint rules](https://eslint.org/docs/rules/)
3. [prettier](https://prettier.io/docs/en/options.html)
#### vue项目规则
1. [eslint-plugin-vue rules](https://github.com/vuejs/eslint-plugin-vue#readme)

## 工具
1. eslint
2. prettier
3. jshint

### 如何选择
选择rules的基于下面两条原则：
1. 保证使用代码风格的初衷
2. 不在具体rule上做无谓的争论，降低使用成本

基于上面的原则， 我们选择使用 eslint-plugin-vue 和 prettier的配置规则。
其中 不符合我们使用情况的rule 进行减法处理（在eslint的rules选项中 进行覆盖）
### 如何集成
> 下面只说明vs code中如何集成eslint，其他请参考eslint官方文档https://eslint.org/docs/user-guide/integrations
1. vscode安装eslint插件
2. 如果使用vue-cli工具生成项目的话，默认已经生成了eslint配置文件。反之，我们需要自己在项目根目录下增加.eslintrc.js配置文件
```
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ["plugin:vue/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "off",
    "no-debugger": "off"
    // "import/no-unresolved": 0
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};


3. 安装依赖
npm i eslint babel-eslint eslint-plugin-vue prettier eslint-plugin-prettier -D

```
4. 在package.json中添加eslint命令
```
{
    "eslint:fix": "eslint src/**  --ext js,vue --fix",
}
// 执行npm命令对所有的文件进行check 和 fix
npm run eslint:fix
```
5. 将不需要进行eslint check的文件和文件夹添加到 .eslintignore中 进行忽略
```
# build为项目构建完成的存放地址 对应自己项目的产出目录
/build/**
/node_modules/*
```

6. 添加pre-commit hook
> 在git commit 之前进行eslint检测，不符合规则 将不能进行commit

1. 拷贝下面的bash脚本到你的项目 .git/hooks/pre-commit文件中

    ````
    #!/bin/bash

    for file in $(git diff --cached --name-only | grep -E '\.(js|jsx|vue)$')
    do
    git show ":$file" | node_modules/.bin/eslint --stdin --stdin-filename "$file" # we only want to lint the staged changes, not any un-staged changes
    if [ $? -ne 0 ]; then
        echo "ESLint failed on staged file '$file'. Please check your code and try again. You can run ESLint manually via npm run eslint."
        exit 1 # exit with failure status
    fi
    done


2. 默认.git/hook文件目录下 应该没有pre-commit文件，而是一个pre-commit.sample，重新创建或者修改这个文件名 都可。

3. 注意pre-commit是否有可执行权限,不想深究的话 直接执行
    ```
    chmod 777 pre-commit
    ```


## 参考资料
* [vue风格指南](https://cn.vuejs.org/v2/style-guide/)
* [Airbnb JavaScript Style Guide](https://github.com/yuche/javascript)
* [google javascript code style](https://google.github.io/styleguide/jsguide.html)
* [why prettier](https://prettier.io/docs/en/why-prettier.html)


