// Prism highlights every `code[class*=language-]` on the page as soon as it
// loads in a browser. The glossary highlights during render instead, so that
// automatic pass would rewrite the server HTML before React hydrates it.
// This file must be imported before prismjs.
(globalThis as { Prism?: { manual?: boolean } }).Prism = { manual: true };
export {};
