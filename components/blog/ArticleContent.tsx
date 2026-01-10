'use client';

import { motion } from 'framer-motion';
import type { BlogArticle } from '@/lib/blog-data';

interface ArticleContentProps {
  article: BlogArticle;
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="prose prose-lg max-w-none
        prose-headings:text-[#182b33] prose-headings:font-bold
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-600 prose-p:leading-relaxed
        prose-strong:text-[#182b33]
        prose-a:text-[#dd1828] prose-a:no-underline hover:prose-a:underline
        prose-ul:my-4 prose-li:text-gray-600
        prose-table:overflow-hidden prose-table:rounded-lg prose-table:shadow-sm
        prose-th:bg-[#182b33] prose-th:text-white prose-th:font-semibold prose-th:px-4 prose-th:py-3
        prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-gray-100
        prose-tr:even:bg-gray-50
        prose-blockquote:border-l-4 prose-blockquote:border-[#dd1828] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
        prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[#dd1828] prose-code:before:content-none prose-code:after:content-none
        prose-hr:border-gray-200
      "
    >
      <div
        dangerouslySetInnerHTML={{ __html: parseMarkdown(article.content) }}
      />
    </motion.article>
  );
}

// Simple markdown parser (without react-markdown dependency)
function parseMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.*)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Unordered lists
    .replace(/^- (.*)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Tables (basic support)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(cell => cell.trim());
      if (cells.every(cell => cell.trim().match(/^[-:]+$/))) {
        return ''; // Skip separator row
      }
      const isHeader = cells.some(cell => cell.includes('---'));
      if (!isHeader && cells.length > 0) {
        const tag = 'td';
        const row = cells.map(cell => `<${tag}>${cell.trim()}</${tag}>`).join('');
        return `<tr>${row}</tr>`;
      }
      return match;
    })
    // Horizontal rules
    .replace(/^---$/gm, '<hr />')
    // Paragraphs (wrap loose text)
    .replace(/^(?!<[h|u|o|l|t|b|p|d])(.*[^\n])$/gm, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p>\s*<\/p>/g, '')
    // Fix nested p tags
    .replace(/<p><(h[1-6]|ul|ol|table|blockquote)/g, '<$1')
    .replace(/<\/(h[1-6]|ul|ol|table|blockquote)><\/p>/g, '</$1>');
}
