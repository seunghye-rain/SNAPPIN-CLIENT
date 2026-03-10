import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('react-component', {
    description: 'Adds a new react component to the design system',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/design-system/src/ui/{{kebabCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'templates/component.hbs',
      },
      {
        type: 'add',
        path: 'packages/design-system/src/ui/{{kebabCase name}}/index.ts',
        templateFile: 'templates/index.hbs',
      },
    ],
  });
}
