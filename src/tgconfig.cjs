module.exports = [
  {
    type: "component",
    alias: "c",
    files: [
      {
        path: (name) => `src/components/${name}/${name}.tsx`,
        template: (name) => `import React from 'react';

import './${name}.scss';

type ${name}Props {}

export function ${name}({}: ${name}Props) {
    return <div>${name} works.</div>;
};`,
      },
      {
        path: (name) => `src/components/${name}/${name}.scss`,
        template: (name) => `.${name} {}`,
      },
    ],
  },
];
