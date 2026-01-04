import { defineConfig } from 'vitepress'
import { generateSidebar } from './utils/sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wのr1eyt_'s Blog", // 浏览器标签页显示的标题
  description: "一个基于 VitePress 的技术博客",
  lang: 'zh-CN', // 设置站点语言为中文，确保日期格式为中文
  // 全局开启代码块行号显示
  markdown: {
    lineNumbers: true
  },
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 1. 顶部导航栏 (Nav)
    nav: [
      { text: '首页', link: '/' },
      { text: '我的文章', link: '/posts/intro' },
      { text: '关于我', link: '/about' }
    ],
    logo: '/dog.png',

    // 2. 左侧侧边栏 (Sidebar) - 自动生成
    sidebar: generateSidebar(),
    // 【新增 1】开启本地搜索框
    // 这会在导航栏右侧添加一个放大镜图标，支持快捷键呼出
    search: {
      provider: 'local'
    },

    // 【新增 2】添加页脚
    // 通常用于显示版权信息或备案号
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024-present Wesley'
    },

    // 【新增 4】显示最后更新时间
    // 会在每篇文章底部显示"最后更新于"的时间
    // 注意：需要项目在 Git 仓库中才能获取更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'medium'
      }
    },
    // 【新增 3】显示"在 GitHub 上编辑此页"链接
    // 方便读者纠错，也显得很极客
    editLink: {
      pattern: 'https://github.com/think-home/my-VPblog/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 3. 社交链接图标
    socialLinks: [
      { icon: 'github', link: 'https://github.com/think-home' }
    ]
  }
})