module.exports = [
    {
        name: 'component',
        alias: "c",
        files: [
            {
                path: (name) => `src/components/${name}.tsx`,
                template: (name) => `import React from 'react';

                import './${name}.scss';

                type ${name}Props {}

                export function ${name}({}: ${name}Props) {
                  return <div>${name} component works.</div>;
                };
                `
            }
        ]
    }
]