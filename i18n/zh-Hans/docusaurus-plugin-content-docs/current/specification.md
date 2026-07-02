---
id: specification
title: 规范
sidebar_label: 规范
---

# 规范

为了让 VIA 配置键盘，它需要键盘的定义——按键的物理布局、任何布局选项以及其他可配置的元素，如旋转编码器（旋钮）、灯光等。

这些东西在“键盘定义”中定义——一个 JSON 格式的文件，存储在 VIA Github 仓库中，并由 VIA 网站托管，以便在连接键盘时由 VIA 下载和使用。

将 VIA 支持添加到键盘的人，可以通过在[这里](https://github.com/the-via/keyboards)创建一个拉取请求，将键盘定义添加到 Github 仓库中。

这是 Joe Scotto 的一段精彩视频，概述了这个过程：

[![YouTube video player](/video.png)](https://www.youtube.com/embed/7d5yzBOup9U)

## 键盘定义

键盘定义采用 JSON 格式，有效属性描述如下。

## 名字

```json
  "name": "Macropad",
```

`name` 属性表示正在定义的键盘的名称。

## 厂商和产品 ID

```json
  "vendorId": "0x5241",
  "productId": "0x1234",
```

`productId` 属性对应于 USB 产品 ID，结合 `vendorId`，VIA 在插入键盘时用来识别键盘。

## 矩阵

```json
  "matrix": {"rows": 1, "cols": 6},
```

`matrix` 属性定义了 PCB 的按键矩阵使用的行数和列数。这必须与 QMK 固件中的 `MATRIX_ROWS` 和 `MATRIX_COLS` 符号相匹配。

## 布局

```json
  "layouts": {
    ...
    "keymap": [
      [{"c": "#505557", "t": "#d9d7d7", "a": 7}, "0,0", "0,1", "0,2"],
      ["0,3", "0,4", "0,5"]
    ]
    ...
  }
```

`keymap` 属性对应于 [KLE](http://keyboard-layout-editor.com) 导出的 KLE JSON，具有左上角图例中定义的按键行、列和右下角图例中定义的可选择的组号、选项编号。KLE 最多支持3个不同颜色的键，用于识别 VIA 将自动应用主题的字母、修饰键和重音键。

```json
  "layouts": {
    ...
    "labels": [
      "Split Backspace",
      "ISO Enter",
      "Split Left Shift",
      "Split Right Shift",
      ["Bottom Row", "ANSI", "7U", "HHKB", "WKL"]
    ],
    ...
  }
```

`labels` 属性是 `string` 或 `string[]` 的可选数组，定义了布局控件的标签。

标签的顺序很重要，因为隐式序号用于映射到组号，例如 `Split Backspace` 对应布局选项 #0，`ISO` 对应布局选项 #1，等等。

如果 `labels` 数组中的项目是 `string`，则将其显示为切换按钮，关闭状态映射到布局选项 #0（默认值），打开状态映射到布局选项 #1。

如果 `labels` 数组中的一个项目是 `string[]`，它映射到一个选择控件，数组中的第一个项目用作控件的标签，以下项目用作布局选项选择 #0，#1，#2 等的标签。在上述示例中，`Bottom Row` 是标签，`ANSI` 映射到布局选项选择 #0，`7U` 映射到布局选项选择 #1 等。

解释布局选项如何工作的文档在[这里](./layouts)。

## 菜单

`menus` 用于在 VIA 中定义更多菜单，它可以包含以下**一个或多个**内置 UI 定义：

- `"qmk_backlight"`
- `"qmk_rgblight"`
- `"qmk_backlight_rgblight"`
- `"qmk_rgb_matrix"`
- `"qmk_audio"`

**和/或**自定义 UI 的定义，即明确定义所需的所有 UI 控件。

例如，启用 QMK RGB 矩阵内置 UI 的定义可以这样做：

```json
"menus": ["qmk_rgb_matrix" ]
```

**或者**使用自定义 UI 定义明确定义，如下所示：

```json
...
"menus": [
  {
    "label": "Lighting",
    "content": [
      {
        "label": "Backlight",
        "content": [
          {
            "label": "Brightness",
            "type": "range",
            "options": [0, 255],
            "content": ["id_qmk_rgb_matrix_brightness", 3, 1]
          },
          ...
        ]
      }
    ]
  }
]
```

自定义 UI 的完整文档在[这里](./custom_ui)。

如果固件使用的功能的库存实现，即在 `info.json` 或 `rules.mk` 中启用，并且没有自定义，那么只需要使用内置 UI 定义之一。

内置 UI 定义的定义方式与自定义 UI 定义相同（即 JSON 格式）和参考位于[这里](https://github.com/the-via/keyboards/tree/master/common-menus)。

## 键码

如果定义是针对使用 QMK 灯光的键盘，你可以选择启用灯光键码。

```json
  "keycodes": ["qmk_lighting"],
  "menus": ["qmk_rgblight"],
```

