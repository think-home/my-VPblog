import { readdirSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径（兼容 ES 模块）
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface SidebarItem {
  text: string
  link: string
}

interface SidebarGroup {
  text: string
  items: SidebarItem[]
}

/**
 * 从 Markdown 文件内容中提取标题
 */
function extractTitle(filePath: string, content: string): string {
  // 尝试从 frontmatter 中获取 title
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/)
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1]
    const titleMatch = frontmatter.match(/^title:\s*(.+)$/m)
    if (titleMatch) {
      return titleMatch[1].trim().replace(/^["']|["']$/g, '')
    }
  }

  // 尝试从第一个一级标题获取
  const h1Match = content.match(/^#\s+(.+)$/m)
  if (h1Match) {
    return h1Match[1].trim()
  }

  // 如果没有找到，使用文件名（去除扩展名）
  const fileName = filePath.split('/').pop()?.replace(/\.md$/, '') || ''
  return fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * 自动生成侧边栏配置
 */
export function generateSidebar(): SidebarGroup[] {
  // 从 .vitepress/utils 目录向上两级到达项目根目录，然后进入 posts 目录
  const postsDir = join(__dirname, '../../posts')
  const files = readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .sort() // 按文件名排序，你可以根据需要调整排序逻辑

  const items: SidebarItem[] = files.map(file => {
    const filePath = join(postsDir, file)
    const content = readFileSync(filePath, 'utf-8')
    const title = extractTitle(filePath, content)
    const link = `/posts/${file.replace(/\.md$/, '')}`

    return {
      text: title,
      link
    }
  })

  return [
    {
      text: '文章列表',
      items
    }
  ]
}

