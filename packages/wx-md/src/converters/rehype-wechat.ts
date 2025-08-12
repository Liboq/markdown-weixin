import type { Root, Element, Content } from 'hast';
import { visit } from 'unist-util-visit';
import { CSSInliner, ELEMENT_CLASS_MAP } from '../utils/css-inliner.js';

export default function rehypeWeChatCompatible(css?: string) {
  return function transformer(tree: Root) {
    const inliner = css ? new CSSInliner(css) : null;
    
    // Unwrap <li><p>...</p></li> to <li>...</li>
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'li' && Array.isArray(node.children) && node.children.length === 1) {
        const only = node.children[0];
        if ((only as any).type === 'element' && (only as Element).tagName === 'p') {
          const p = only as Element;
          node.children = (p.children as Content[]) || [];
        }
      }

      // Apply inline styles from CSS if available
      if (inliner) {
        const tagName = node.tagName;
        const className = ELEMENT_CLASS_MAP[tagName];
        
        if (className) {
          node.properties = node.properties || {};
          const existingStyle = String((node.properties as any).style || '');
          
          // Get styles for element
          let inlineStyles = inliner.getInlineStyles(tagName);
          
          // Get styles for .wxmd-article class selectors
          const articleStyles = inliner.getInlineStyles(tagName, className);
          if (articleStyles) {
            inlineStyles = inlineStyles ? `${inlineStyles};${articleStyles}` : articleStyles;
          }
          
          // Get styles for .wxmd-article descendant selectors (like .wxmd-article h1)
          const descendantSelector = `.${className} ${tagName}`;
          const descendantStyles = inliner.getInlineStyles(descendantSelector);
          if (descendantStyles) {
            inlineStyles = inlineStyles ? `${inlineStyles};${descendantStyles}` : descendantStyles;
          }
          
          if (inlineStyles) {
            (node.properties as any).style = existingStyle 
              ? `${existingStyle};${inlineStyles}` 
              : inlineStyles;
          }
        }
      }

      // Ensure images are responsive in WeChat
      if (node.tagName === 'img') {
        node.properties = node.properties || {};
        const style = String((node.properties as any).style || '');
        const ensure = 'max-width:100%;height:auto;';
        (node.properties as any).style = style.includes('max-width') ? style : (style ? style + ';' : '') + ensure;
      }

      // Remove iframe/script for safety by default (WeChat likely strips them)
      if (node.tagName === 'script' || node.tagName === 'iframe') {
        node.tagName = 'div';
        node.children = [];
        node.properties = { 'data-removed': node.tagName } as any;
      }
    });
  };
}