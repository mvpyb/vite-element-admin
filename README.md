
## npm-check-updates

```bash
# 检查 package.json 的最新依赖项
ncu
# 查看单个包的最新版本
ncu react
# 更新 package.json 的最新依赖项
ncu -u
# 更新单个依赖
ncu -u react
# 查看全局的安装包最新版本
ncu -g
# 检查某一个包
ncu react
ncu -f react
ncu --filter react
# 检查某一类的包
ncu 'react*'
ncu "/^react*$/"
# 检查除某个包以外的所有包
ncu \!react
ncu -x react
ncu --reject react
# 检查特定的几个包
ncu react redux
ncu react,redux
ncu -f "react redux"
# 更新的话只要在上面的每个语句后面加上 -u

E:\PhpStorm 2019.3.1\plugins\JavaScriptLanguage\languageService\eslint\bin eslint-plugin.js line 43 注释掉了，  line 50 新增。如果是低版本的eslint  调换一下

```
