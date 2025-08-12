interface CSSRule {
  selector: string;
  properties: { [key: string]: string };
}

export class CSSInliner {
  private rules: CSSRule[] = [];

  constructor(css: string) {
    this.parseCSS(css);
  }

  private parseCSS(css: string): void {
    // 移除注释
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // 匹配CSS规则
    const ruleRegex = /([^{]+)\{([^}]+)\}/g;
    let match;

    while ((match = ruleRegex.exec(css)) !== null) {
      const selectors = match[1].trim().split(',').map(s => s.trim());
      const propertiesText = match[2].trim();
      
      const properties: { [key: string]: string } = {};
      
      // 解析属性
      const propRegex = /([^:]+):\s*([^;]+);?/g;
      let propMatch;
      
      while ((propMatch = propRegex.exec(propertiesText)) !== null) {
        const property = propMatch[1].trim();
        const value = propMatch[2].trim();
        properties[property] = value;
      }

      // 为每个选择器创建规则
      selectors.forEach(selector => {
        this.rules.push({ selector, properties });
      });
    }
  }

  private selectorMatches(selector: string, tagName: string, className?: string): boolean {
    const trimmedSelector = selector.trim();
    
    // 处理后代选择器 .wxmd-article h1, .wxmd-article h2 等
    if (trimmedSelector.includes(' ')) {
      const parts = trimmedSelector.split(/\s+/);
      if (parts.length === 2) {
        const parentSelector = parts[0];
        const childSelector = parts[1];
        
        // 检查是否是 .wxmd-article 的后代选择器
        if (parentSelector === '.wxmd-article' && childSelector === tagName && className === 'wxmd-article') {
          return true;
        }
      }
    }
    
    // 处理组合选择器 .wxmd-article h1, .wxmd-article h2 等
    if (trimmedSelector.includes(',')) {
      const selectors = trimmedSelector.split(',').map(s => s.trim());
      return selectors.some(sel => this.selectorMatches(sel, tagName, className));
    }
    
    // 类选择器
    if (trimmedSelector.startsWith('.')) {
      const selectorClass = trimmedSelector.substring(1);
      return className === selectorClass;
    } 
    
    // 元素选择器
    return trimmedSelector === tagName;
  }

  getInlineStyles(tagName: string, className?: string): string {
    const matchedStyles: { [key: string]: string } = {};

    // 收集所有匹配的样式
    this.rules.forEach(rule => {
      if (this.selectorMatches(rule.selector, tagName, className)) {
        Object.assign(matchedStyles, rule.properties);
      }
    });

    // 转换为行内样式字符串
    return Object.entries(matchedStyles)
      .map(([prop, value]) => `${prop}:${value}`)
      .join(';');
  }
}

// CSS选择器映射，用于处理.wxmd-article的子元素
export const ELEMENT_CLASS_MAP: { [key: string]: string } = {
  'article': 'wxmd-article',
  'h1': 'wxmd-article',
  'h2': 'wxmd-article', 
  'h3': 'wxmd-article',
  'h4': 'wxmd-article',
  'h5': 'wxmd-article',
  'h6': 'wxmd-article',
  'p': 'wxmd-article',
  'ul': 'wxmd-article',
  'ol': 'wxmd-article',
  'li': 'wxmd-article',
  'blockquote': 'wxmd-article',
  'code': 'wxmd-article',
  'pre': 'wxmd-article',
  'table': 'wxmd-article',
  'th': 'wxmd-article',
  'td': 'wxmd-article',
  'img': 'wxmd-article'
};