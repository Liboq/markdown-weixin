---
title: 命令行 CLI
---

# 命令行 CLI

基本用法：

```bash
wxmd <input.md> [-o output.html]
```

示例：

```bash
# 指定输出路径
wxmd post.md -o build/post.html

# 从标准输入读取，输出到标准输出
cat post.md | wxmd > post.html
```

常用选项（因版本而异，以下为通用示例）：

- `-o, --output <file>`: 指定输出 HTML 文件
- `--no-highlight`: 关闭代码高亮
- `--theme <name>`: 指定内置主题（page/code/typography 等）

提示：运行 `wxmd --help` 查看完整选项。