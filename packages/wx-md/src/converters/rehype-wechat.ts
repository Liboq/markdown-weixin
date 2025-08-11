import type { Root, Element, Content } from 'hast';
import { visit } from 'unist-util-visit';

export default function rehypeWeChatCompatible() {
  return function transformer(tree: Root) {
    // Unwrap <li><p>...</p></li> to <li>...</li>
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'li' && Array.isArray(node.children) && node.children.length === 1) {
        const only = node.children[0];
        if ((only as any).type === 'element' && (only as Element).tagName === 'p') {
          const p = only as Element;
          node.children = (p.children as Content[]) || [];
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