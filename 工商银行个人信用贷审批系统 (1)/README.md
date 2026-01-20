
# 中国工商银行 - 内部智能信用审批系统
## ICBC Smart Credit Portal v4.22

本项目是一个基于 React 和 Google Gemini API 的内部信贷审批模拟系统。

### 本地部署步骤

1. **环境准备**
   - 确保您的电脑已安装 [Node.js](https://nodejs.org/) (建议 v18 或更高版本)。

2. **创建文件夹**
   - 在您的本地磁盘创建一个新文件夹，例如 `icbc-portal`。
   - 将所有源代码文件（`.html`, `.tsx`, `.ts`, `.json` 以及 `components` 和 `services` 文件夹下的内容）放入该文件夹。

3. **安装依赖**
   - 打开终端（Terminal/Command Prompt），进入该项目文件夹：
     ```bash
     cd path/to/icbc-portal
     ```
   - 执行以下命令安装必要组件：
     ```bash
     npm install
     ```

4. **配置 API Key**
   - 系统需要 Google Gemini API Key 才能运行风控引擎。
   - 在文件夹中创建一个 `.env` 文件，并添加以下内容：
     ```env
     VITE_API_KEY=您的_GEMINI_API_KEY
     ```

5. **启动开发服务器**
   - 运行以下命令启动项目：
     ```bash
     npm run dev
     ```
   - 启动后，浏览器会自动打开 `http://localhost:3000`。

### 项目结构说明
- `index.html`: 主页面入口，包含 Tailwind CSS 和 Google Fonts。
- `App.tsx`: 应用主逻辑和流程控制中心。
- `components/`: 存放所有功能组件（登录、表单、审批结果、归档等）。
- `services/`: 存放外部服务逻辑（Gemini 风险评估、影像处理）。
- `types.ts`: 定义应用中使用的所有数据模型和枚举。

### 登录凭证
- **账号**: `123789`
- **密码**: `1237890`

---
*注：本项目仅供演示和内部测试使用，涉及的所有数据均为模拟。*
