# 简历构建器 (Resume Builder)

> 专为产品经理设计的在线简历构建工具 —— 所见即所得，一键导出 PDF。

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000?logo=shadcnui)

---

## ✨ 特性

- **所见即所得编辑** — 左侧编辑、右侧实时预览，分屏布局一目了然
- **5 大简历模块** — 基本信息、核心优势、工作经历、项目经历、教育经历
- **拖拽排序** — 模块顺序自由拖拽调整，所见即所得
- **自定义模块名** — 双击模块标签即可重命名（如将"核心优势"改为"专业技能"）
- **模块显隐控制** — 一键切换模块在简历中的显示/隐藏
- **可视化描述编辑** — 每条经历支持多行描述，逐行增删
- **一键导出 PDF** — 自动分页，超出一页内容自动切分，不会挤压变形
- **手动分页** — 可为任意模块设置"前置分页"，确保该模块从新页开始，避免被截断
- **一键导出 PNG** — 高清 2x 分辨率截图
- **分享链接** — 将简历数据编码为 URL，一键复制分享
- **一键重置** — 恢复到默认示例数据，放心折腾
- **移动端适配** — 小屏自动切换为标签页布局
- **暗色主题** — 深色编辑器 UI，长时间使用不刺眼

## 🖼️ 预览

桌面端采用左右分栏布局：左侧为编辑面板，右侧为 A4 纸实时预览。

```
┌──────────────┬─────────────────────────┐
│  编辑器面板   │                         │
│  ┌─────────┐ │      A4 简历预览         │
│  │ 模块标签 │ │                         │
│  │ 拖拽排序 │ │    ┌───────────────┐    │
│  └─────────┘ │    │  头像 + 姓名   │    │
│  ┌─────────┐ │    │  联系方式      │    │
│  │ 表单编辑 │ │    └───────────────┘    │
│  │ · 姓名  │ │    ┌───────────────┐    │
│  │ · 电话  │ │    │  核心优势      │    │
│  │ · ...   │ │    └───────────────┘    │
│  └─────────┘ │    ┌───────────────┐    │
│              │    │  工作经历      │    │
│              │    └───────────────┘    │
│              │          ...            │
└──────────────┴─────────────────────────┘
```

## 🚀 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/YOUR_USERNAME/resume-builder.git
cd resume-builder

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问
# http://localhost:5173
```

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 |
| 语言 | TypeScript 5.9 |
| 构建工具 | Vite 7 |
| UI 组件库 | shadcn/ui (50+ 组件) |
| 样式 | Tailwind CSS 3.4 |
| 表单 | react-hook-form + zod |
| 图标 | Lucide React |
| PDF 导出 | jsPDF + html2canvas |
| 路由 | React Router 7 |

## 📁 项目结构

```
src/
├── components/
│   ├── editor/           # 编辑面板组件
│   │   ├── Toolbar.tsx         # 顶部工具栏（导出/重置/分享）
│   │   ├── EditorPanel.tsx     # 编辑面板容器
│   │   ├── ModuleTabs.tsx      # 模块标签（拖拽排序/显隐/分页控制）
│   │   ├── BasicInfoForm.tsx   # 基本信息编辑表单
│   │   ├── AdvantagesForm.tsx  # 核心优势编辑表单
│   │   ├── ExperienceForm.tsx  # 经历编辑表单（工作/项目/教育通用）
│   │   └── DescriptionEditor.tsx # 描述逐行编辑器
│   ├── preview/
│   │   └── ResumePreview.tsx   # 简历预览（A4 纸渲染）
│   └── ui/               # shadcn/ui 组件库
├── context/
│   └── ResumeContext.tsx       # 全局状态管理
├── hooks/
│   └── use-mobile.ts          # 移动端检测
├── lib/
│   ├── defaultData.ts         # 默认示例数据
│   └── utils.ts               # 工具函数
├── pages/
│   └── Home.tsx               # 主页（桌面分栏 / 移动端标签页）
├── types/
│   └── resume.ts              # TypeScript 类型定义
├── App.tsx                    # 根组件
├── main.tsx                   # 入口文件
└── index.css                  # 全局样式 + Tailwind
```

## 🧩 核心功能详解

### PDF 导出与分页

导出 PDF 时会自动计算 A4 纸张比例（210mm × 297mm），将长内容按页面高度自动切分。同时支持**手动分页**——在编辑面板的模块标签旁点击剪刀图标，即可在该模块前插入分页标记，确保该模块从新的一页开始，不会被自动分页截断。

### 拖拽排序

模块列表支持拖拽排序，排序结果实时反映在预览中。只需拖住模块左侧的抓手图标，即可调整简历模块的展示顺序。

### 分享链接

点击"导出 → 复制分享链接"，简历数据会以 Base64 编码写入 URL hash，例如：

```
https://example.com/#data=eyJiYXNpY0luZm8iOnsibmFtZSI6...
```

对方打开链接即可看到你的简历内容，无需后端服务。

### 数据持久化

简历数据存储在 React 状态中。分享链接功能实质上实现了"导入导出"——URL 中的 hash 会被解析为简历数据。

## 📦 可用脚本

```bash
npm run dev       # 启动开发服务器 (http://localhost:5173)
npm run build     # TypeScript 编译 + Vite 生产构建
npm run preview   # 预览生产构建
npm run lint      # ESLint 代码检查
```

## 📄 许可证

MIT License

---

Built with ❤️ using React + TypeScript + shadcn/ui
