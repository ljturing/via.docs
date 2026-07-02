---
id: configuring_qmk
title: 配置 QMK
sidebar_label: 配置 QMK
---

## 总览

VIA 的工作原理与设备上运行的固件通信，并通过 USB 向其发送命令。在 QMK 中启用 VIA 功能既能与 VIA 配置器通信，又能存储键盘映射和其他设置。

- 创建 `via` 键映射目录和与默认键映射区分开的文件
- 更改键盘的 `info.json` 和 `rules.mk`，使固件兼容

## 在 QMK 资源中创建 `via` 键映射目录和文件

VIA 兼容固件必须是区分与默认键映射的 QMK 构建目标。创建一个 `via` 键映射目录，例如 `keyboards/<keyboardname>/keymaps/via`。

要接受进入上游 QMK 仓库，此文件夹必须命名为 `via`，但对你复刻的仓库不是绝对需求。可以通过正确配置向任何键映射添加 VIA 支持。

## 在 `keyboards/<keyboard_name>/keymaps/via` 中创建 `rules.mk`

在大多数情况下，此文件只需要：

```mk
VIA_ENABLE = yes
```

确保 `yes` 是小写，如果你用成大写 `YES` ，然后你就该懵逼了。

这将启用动态键映射、原始 HID 信息处理和 Bootmagic Lite。

**Bootmagic Lite** 是指在插入键盘时按住 Esc（或其他一些键）以跳转到 BootLoader 模式并重置 EEPROM 的功能。因此，如果由于某些原因，EEPROM 包含于固件不同步的数据，并且键盘无法按预期工作（例如 VIA 中的错误键码），设备可以“恢复出厂设置”。它还使键映射中的 `QK_BOOT` 键码的需要变得多余。

不要在键盘目录的 `rules.mk` 中加入 `VIA_ENABLE = yes`。此配置只能添加到 VIA 特定的键映射中，不能默认在键盘级启用。

## 在 `keyboards/<keyboardname>/keymaps/via` 中创建 `keymap.c` 或 `keymap.json`

`via` 键映射文件夹中的键映射应使用 `LAYOUT_*()` 宏，允许映射所有电气位置，即使该布局在物理上是不可能的。

默认情况下，动态键映射有4层。这些将根据需要自动填充 `KC_TRNS` 键码，因此在默认情况下，无需在键映射中创建超过4个层。

通常在 `via` 键盘目录中无需使用 `config.h`。

> 问：我可以使用多于或少于4层吗？
>
> 答：当然可以，如果 EEPROM 控件够的话。这是高级用法，需要了解动态键映射的工作原理并覆盖默认设置。

## 更改键盘目录的 `info.json`

### 更改 `usb.vid` 和 `usb.pid`

这些值很有可能是 QMK 新键盘脚本的默认值，或者是从另一个键盘实现中复制并保持不变的，例如：

```json
  "usb": {
    "vid": "0xFEED",
    "pid": "0x0000",
  }
```

VIA 配置器使用这些来识别设备，因此他们必须是设备独有的。

请注意，如果键盘 PCB 的多个版本/修订版从 VIA 配置器的角度来看功能相同，即它们具有相同的（或兼容的）物理键布局和开关矩阵拓扑结构，并使用相同的“布局宏”（将物理键布局映射到开关矩阵布局）。VIA 配置器不在乎正在使用哪个 I/O 引脚，它只是将键码读取/写入存储在开关矩阵地址中的动态键映射。因此，请仔细考虑你是否真的需要为同一键盘 PCB 的多个版本创建多个供应商/产品 ID。

建议选择键盘 PCB 的设计者/供应商独有的 `vid`，即对于具有共同父目录的所有键盘来说，它将是相同的。

例如，`/keyboards/wilba_tech` 中的键盘使用：

```json
    "vid": "0x6582"
```

选择 `vid` 后，在所有 `info.json` 文件中搜索此值，以确保它是唯一的。为了确认你的搜索工作正常，正在更改的 `info.json` 应该在搜索结果中。

选择唯一 `vid` 的建议方法是从键盘的设计师/供应商名字中选择两个字母，并使用这些字母的两个8位 ASCII 值。

例如，`/keyboards/kingly_keys` 中的键盘都将使用：

```json
    "vid": "0x4B4B"
```

字母 “K” 的 ASCII 值为 4B，因此，**K**ingly **K**eys 变为 0x4B4B。

选择一个适用于使用相同 `vid` 的所有键盘的唯一 `pid`。它们可以简单地按顺序编号，例如 0x0001、0x0002。

> 问：如果所有 VIA 兼容的键盘都使用相同的供应商/产品 ID（可能是官方授权的），然后 VIA 查询以获取设备身份，那不是更好吗？
>
> 答：是的，这样会稍微好一点，但这种方法只适合 QMK 对任意供应商/产品 ID 的非官方使用，并且不引入另一个唯一的 ID。

### 更改 `keyboard_name`

`info.json` 中的 `keyboard_name` 将出现在设备列表中（例如，在 Windows 的“蓝牙和其他设备”页面，以及设备首次连接并“安装”时的通知中）。

```json
  "keyboard_name": "WT60-D"
```

未来在显示设备名称时，VIA 配置器将切换到使用 `keyboard_name` 的值，而不是使用 VIA 布局定义中的名称。这将允许固件级别的自定义。


注意空间是否允许。

### 设置 `bootmagic.matrix` （可选）

如果键盘的 Esc 键（或左上角的键）不在矩阵位置 (0,0)，则在键盘级别的 `info.json` 中明确设置其矩阵位置。

```json
  "bootmagic": {
    "matrix": [3, 4]
  }
```

为了一致性，它应该设置为键盘的左上角键，即使这不是 Esc 键（例如左侧数字键盘、40% 和更小的键盘等）。在向 QMK 提交 PR 之前，请务必测试此工作。

你可能需要考虑在键盘级别启用 Bootmagic Lite（即将 `"bootmagic": true` 添加到 `info.json` 的 `features` 列表中）。这将自动为启用 VIA 的构建版本启用，但它任然对启用 VIA 禁用的构建版本有用，因此无需 `QK_BOOT` 键码或按下 PCB 上的复位按钮即可将设备切换到 BootLoader 模式。

## `config.h` 中的 VIA 设置

QMK 中的 VIA 实现将自动定义其自己的 EEPROM 使用设置、用于动态键映射的层数等。除非键盘需要在 QMK 的核心 EEPROM 使用之外将自己的状态加载/保存到 EEPROM，否则不需要覆盖默认设置。

但是，如果你在进行高级操作并需要修改 VIA 的设置，请在 `via` 键映射目录中添加一个 `config.h` 文件。

### `VIA_EEPROM_LAYOUT_OPTIONS_SIZE`

`VIA_EEPROM_LAYOUT_OPTIONS_SIZE` 控制 EEPROM 内存的大小以存储布局选项（1-4字节，默认1）。存储一个布局选项的位数是存储最大选项数的位数，即2个选项占1位，3-4个选项占2位，5-8个选项占3位，9-16个选项占4位。如果你总共需要超过8位，你只需要在 `config.h` 中覆盖它。

### `VIA_EEPROM_CUSTOM_CONFIG_SIZE`

`VIA_EEPROM_CUSTOM_CONFIG_SIZE` 控制 EEPROM 内存的大小，以存储键盘特定配置，例如灯光设置、旋转编码器设置、屏幕设置。它默认为0字节。键盘级代码可以使用 `VIA_EEPROM_CUSTOM_CONFIG_ADDR` 作为 EEPROM 保留的起始地址。

## EEPROM 内存使用

启用 VIA 后，EEPROM 内存分配为：

- QMK 核心
- VIA（`VIA_EEPROM_MAGIC_ADDR` 到 `VIA_EEPROM_CUSTOM_CONFIG_ADDR-1`）
- 自定义配置（`VIA_EEPROM_CUSTOM_CONFIG_ADDR` 到 `VIA_EEPROM_CUSTOM_CONFIG_ADDR+VIA_EEPROM_CUSTOM_CONFIG_SIZE-1`）
- 动态键映射（`DYNAMIC_KEYMAP_EEPROM_ADDR` 到 `DYNAMIC_KEYMAP_MACRO_EEPROM_ADDR-1`）
- 宏（`DYNAMIC_KEYMAP_MACRO_EEPROM_ADDR` 到 `DYNAMIC_KEYMAP_MACRO_EEPROM_ADDR+DYNAMIC_KEYMAP_MACRO_EEPROM_SIZE-1`）

除非键盘实现了自己的状态存储，否则不需要设置任何东西。通过启用 VIA，默认设置为如上所述使用 EEPROM 内存。默认情况下，动态键映射有4个层。如果你的键映射没有指定所有4层的键码，其余部分将自动填充 `KC_TRNS`；无需硬编码“填充” `KC_TRNS`。

## 空间不够？

如果没有足够的内存或 EEPROM 可用，具有许多功能和/或大型键盘对映射的键盘的可能无法通过 VIA 支持进行编译。

减少可用的动态键映射层的数量将降低 EEPROM 的使用情况和固件大小。这可以通过在 `info.json` 中适当设置 `dynamic_keymap.layer_count` 来实现：

```json
    "dynamic_keymap": {
        "layer_count": 3
    }
```

为了减少固件大小，请考虑通过将 `LTO_ENABLE = yes` 添加到键映射目录的 `rules.mk` 文件来启用 LTO（link time optimization）。这可能会对使用 ARM 处理器的键盘产生意想不到的副作用，因此在启用和禁用的情况下进行彻底测试。

如果 LTO 无法工作或报错，你可能需要禁用 QMK 功能。有关此的更多建议可以在 [QMK 的文档](https://docs.qmk.fm/#/squeezing_avr)中找到。

