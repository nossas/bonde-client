const path = require('path')

module.exports = {
  sections: [
    {
      name: 'Content',
      description: 'The list of content components.',
      components: 'src/content/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Cards',
      description: 'The list of card components.',
      components: 'src/cards/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'List',
      description: 'The list of list components.',
      components: 'src/list/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Progress',
      description: 'The list of progress components.',
      components: 'src/progress/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Navigation',
      description: 'The list of navigation components.',
      components: 'src/navigation/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Form',
      description: 'The list of form components.',
      components: 'src/form/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Await',
      description: 'The list of components to await steps.',
      components: 'src/await/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Layout',
      description: 'The list of components that modify layout.',
      components: 'src/layout/[A-Z]*/[A-Z]*.js'
    },
    {
      name: 'Assets',
      description: 'The list of assets components.',
      components: 'src/assets/[A-Z]*/[A-Z]*.js'
    }
  ],
  contextDependencies: [path.resolve(__dirname, 'src')],
  showUsage: true,
  showCode: false,
  // skipComponentsWithoutReadme: true,

  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js')
    const dir = path.dirname(componentPath)
    return `import { ${name} } from 'bonde-styleguide'`
  },

  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/ThemeWrapper'),
  }
}
