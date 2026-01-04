# 部署说明

本文档说明如何将博客部署到 GitHub Pages 并使用自定义域名。

## 📋 部署前准备

1. ✅ GitHub 仓库已创建：`think-home/my-VPblog`
2. ✅ 自定义域名：`vpblog.de5.net`
3. ✅ CNAME 文件已配置：`public/CNAME`

## 🚀 部署步骤

### 1. 启用 GitHub Pages

1. 进入 GitHub 仓库设置页面
2. 点击左侧菜单的 **Pages**
3. 在 **Source** 部分，选择 **GitHub Actions**
4. 保存设置

### 2. 配置自定义域名

1. 在 GitHub Pages 设置页面，找到 **Custom domain** 部分
2. 输入你的域名：`vpblog.de5.net`
3. 勾选 **Enforce HTTPS**（推荐）
4. 保存设置

### 3. 配置 DNS 解析

在你的域名服务商（de5.net）处配置 DNS 记录：

**方式 1：CNAME 记录（推荐）**
```
类型: CNAME
主机记录: vpblog
记录值: think-home.github.io
TTL: 600（或默认值）
```

**方式 2：A 记录**
```
类型: A
主机记录: vpblog
记录值: 
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
TTL: 600（或默认值）
```

### 4. 推送代码触发部署

```bash
# 确保所有更改已提交
git add .
git commit -m "配置部署"
git push origin main
```

### 5. 查看部署状态

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签页
3. 查看部署工作流的状态
4. 等待部署完成（通常需要 1-2 分钟）

## 🔍 验证部署

部署成功后，访问以下地址验证：

- 自定义域名：https://vpblog.de5.net
- GitHub Pages：https://think-home.github.io/my-VPblog

## 📝 自动部署

配置完成后，每次推送到 `main` 分支都会自动触发部署：

```bash
# 修改内容后
git add .
git commit -m "更新文章"
git push origin main
```

GitHub Actions 会自动：
1. 安装依赖
2. 构建项目
3. 部署到 GitHub Pages

## ⚙️ 本地测试构建

在部署前，可以在本地测试构建：

```bash
# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 🐛 常见问题

### 1. 部署失败

- 检查 GitHub Actions 日志
- 确保 `package.json` 中的构建脚本正确
- 确保所有依赖都已安装

### 2. 域名无法访问

- 检查 DNS 解析是否正确
- 等待 DNS 传播（可能需要几分钟到几小时）
- 检查 CNAME 文件是否正确

### 3. HTTPS 证书问题

- 在 GitHub Pages 设置中启用 **Enforce HTTPS**
- 等待证书自动生成（可能需要几分钟）

## 📚 相关资源

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [VitePress 部署指南](https://vitepress.dev/guide/deploy)
- [自定义域名配置](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

