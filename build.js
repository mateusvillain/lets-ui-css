import StyleDictionary from 'style-dictionary';

const styleDictionary = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      transform: [
        'name/kebab', 'color/hsl'
      ],
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },

    scss: {
      transformGroup: 'scss',
      transform: [
        'name/kebab', 'color/hsl'
      ],
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.scss',
          format: 'scss/map-flat',
          options: {
            outputReferences: true
          }
        }
      ]
    }
  }
});

styleDictionary.buildAllPlatforms();
