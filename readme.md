# [VIA 网站](https://www.caniusevia.com) - 你键盘的最佳伙伴

![android-chrome-192x192](/static/android-chrome-192x192.png)

VIA 是一个强大、开源的网页交互，专为配置你的 [QMK](https://qmk.fm) 支持的机械键盘。
它允许你定制你的键映射、创建宏和调节 RGB 设置（如果有的话），不需要重新编译键盘固件。
这使键盘客制化更简单更适合每个人。

## 为你的键盘获取 VIA 的支持

你是键盘制作人或开发者？有兴趣为你键盘添加支持吗？我们欢迎你为 VIA 项目贡献代码！

1. 键盘源码**必须合并**到 [QMK 固件仓库](https://github.com/qmk/qmk_firmware)主分支
2. 你的 `keymaps/via` 键映射**必须合并**到 [VIA 的用户空间仓库](https://github.com/the-via/qmk_userspace_via)主分支
3. 为你的键盘用 JSON 格式创建一个定义并提交到 [VIA 的键盘仓库](https://github.com/the-via/keyboards)主分支

请仔细遵循我们的规范文档，以确保你的提交能够顺利审核和合并。

## 本地开发设置

此网页是用 [Docusaurus 2](https://v2.docusaurus.io/) 构建，一个现代静态站点生成工具。

### 安装

```bash
$ yarn
```

### 本地开发

```bash
$ yarn start
```

此命令启动本地开发服务并打开浏览器窗口，大多数更改都无需重启服务即可实时生效。

### 编译

```bash
$ yarn build
```

此命令会将静态内容生成到 `build` 目录，可通过任何静态内容托管服务提供。

### 发布

```bash
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

如果你使用 GitHub pages 进行托管，此命令可以方便地构建网站并推送到 `gh-pages` 分支。

## 国际化支持

本项目支持多语言切换，默认提供中文和英文支持。

### 添加新语言

1. 修改 `docusaurus.config.js` 文件中的 `i18n` 配置：

```js
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en', 'your-locale'],
    localeConfigs: {
      'your-locale': {
        label: 'Your Language',
        direction: 'ltr',
        htmlLang: 'your-locale',
      },
    },
  },
```

2. 生成翻译文件：

```bash
yarn docusaurus write-translations --locale <your-locale>
```

3. 编辑生成的翻译文件，位于 `i18n/your-locale/` 目录下。

### 翻译 Markdown 文件

1. 翻译文档：

```bash
mkdir -p i18n/<your-locale>/docusaurus-plugin-content-docs/current
cp -r docs/. i18n/<your-locale>/docusaurus-plugin-content-docs/current
```

2. 翻译页面：

```bash
mkdir -p i18n/<your-locale>/docusaurus-plugin-content-pages
cp -r src/pages/. i18n/<your-locale>/docusaurus-plugin-content-pages
```

## 遇到问题？

如果你在使用 [VIA 网页应用](https://usevia.app)时遇到任何问题或错误，请通过在 [VIA 网页应用仓库](https://github.com/the-via/app/issues)中创建一个问题来报告。这将帮助我们追踪并解决这些问题，从而提升所有用户的 VIA 使用体验。

在提交报告前，请先确保是否已有人报告过该问题。谢谢合作！

