'use client';

import { m } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { BlogArticle } from '@/lib/blog-data';

interface ArticleContentProps {
  article: BlogArticle;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const t = useTranslations('blog');

  return (
    <div className="space-y-8">
      {/* Article content */}
      <m.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="prose prose-lg max-w-none"
      >
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(article.content) }}
        />
      </m.article>

      {/* Sources section */}
      {article.sources && article.sources.length > 0 && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t-2 border-gray-200"
        >
          <h3 className="text-lg font-bold text-[#182b33] mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-[#dd1828]" />
            {t('sources')}
          </h3>
          <ul className="space-y-2">
            {article.sources.map((source, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#dd1828] font-semibold">{index + 1}.</span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#dd1828] transition-colors underline underline-offset-2"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </m.div>
      )}

      {/* Styles for article content */}
      <style jsx global>{`
        .article-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #182b33;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #f3f4f6;
        }

        .article-content h3 {
          font-size: 1.35rem;
          font-weight: 600;
          color: #182b33;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .article-content p {
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }

        .article-content strong {
          color: #182b33;
          font-weight: 600;
        }

        .article-content a {
          color: #dd1828;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .article-content a:hover {
          color: #a01020;
        }

        .article-content ul {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .article-content ul li {
          color: #4b5563;
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 0.5rem;
        }

        .article-content ul li::marker {
          color: #dd1828;
        }

        .article-content table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .article-content thead {
          background: #182b33;
        }

        .article-content th {
          color: white;
          font-weight: 600;
          padding: 0.875rem 1rem;
          text-align: left;
        }

        .article-content td {
          padding: 0.875rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          color: #4b5563;
        }

        .article-content tr:nth-child(even) {
          background: #f9fafb;
        }

        .article-content tr:last-child td {
          border-bottom: none;
        }

        .article-content hr {
          margin: 2rem 0;
          border: none;
          border-top: 2px solid #e5e7eb;
        }

        .article-content blockquote {
          margin: 1.5rem 0;
          padding: 1rem 1.5rem;
          border-left: 4px solid #dd1828;
          background: #f9fafb;
          border-radius: 0 0.5rem 0.5rem 0;
          font-style: italic;
          color: #4b5563;
        }
      `}</style>
    </div>
  );
}

// Robust markdown parser
function parseMarkdown(content: string): string {
  let html = content.trim();

  // Split into lines for processing
  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let inTable = false;
  let tableRows: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Skip empty lines but close lists
    if (line.trim() === '') {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      if (inTable) {
        processedLines.push(processTable(tableRows));
        tableRows = [];
        inTable = false;
      }
      processedLines.push('');
      continue;
    }

    // Headers
    if (line.match(/^### /)) {
      if (inList) { processedLines.push('</ul>'); inList = false; }
      processedLines.push(`<h3>${line.replace(/^### /, '')}</h3>`);
      continue;
    }
    if (line.match(/^## /)) {
      if (inList) { processedLines.push('</ul>'); inList = false; }
      processedLines.push(`<h2>${line.replace(/^## /, '')}</h2>`);
      continue;
    }
    if (line.match(/^# /)) {
      if (inList) { processedLines.push('</ul>'); inList = false; }
      processedLines.push(`<h1>${line.replace(/^# /, '')}</h1>`);
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      if (inList) { processedLines.push('</ul>'); inList = false; }
      processedLines.push('<hr />');
      continue;
    }

    // Tables
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (inList) { processedLines.push('</ul>'); inList = false; }
      inTable = true;
      tableRows.push(line);
      continue;
    } else if (inTable) {
      processedLines.push(processTable(tableRows));
      tableRows = [];
      inTable = false;
    }

    // List items
    if (line.match(/^- /)) {
      if (!inList) {
        processedLines.push('<ul>');
        inList = true;
      }
      const itemContent = processInlineMarkdown(line.replace(/^- /, ''));
      processedLines.push(`<li>${itemContent}</li>`);
      continue;
    }

    // Close list if we're in one and this isn't a list item
    if (inList) {
      processedLines.push('</ul>');
      inList = false;
    }

    // Regular paragraph
    const paragraphContent = processInlineMarkdown(line);
    if (paragraphContent.trim()) {
      processedLines.push(`<p>${paragraphContent}</p>`);
    }
  }

  // Close any open lists
  if (inList) {
    processedLines.push('</ul>');
  }
  if (inTable) {
    processedLines.push(processTable(tableRows));
  }

  return processedLines.join('\n');
}

// Process inline markdown (bold, italic, links)
function processInlineMarkdown(text: string): string {
  return text
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

// Process markdown table
function processTable(rows: string[]): string {
  if (rows.length < 2) return '';

  const headerRow = rows[0];
  const dataRows = rows.slice(2); // Skip header and separator

  const headers = headerRow
    .split('|')
    .filter(cell => cell.trim())
    .map(cell => `<th>${cell.trim()}</th>`)
    .join('');

  const bodyRows = dataRows
    .map(row => {
      const cells = row
        .split('|')
        .filter(cell => cell.trim())
        .map(cell => `<td>${processInlineMarkdown(cell.trim())}</td>`)
        .join('');
      return `<tr>${cells}</tr>`;
    })
    .join('');

  return `<table><thead><tr>${headers}</tr></thead><tbody>${bodyRows}</tbody></table>`;
}
