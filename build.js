import StyleDictionary from 'style-dictionary';

StyleDictionary.registerFormat({
  name: 'css/variables-modes',
  format: function(params) {
    const dictionary = params && (params.dictionary || params);
    const allProperties = (dictionary && dictionary.allTokens) ? dictionary.allTokens : [];



    const toHsla = (c) => {
      if (!c) return null;
      if (typeof c === 'string') return c;
      if (typeof c.h !== 'undefined') {
        const h = c.h;
        const s = c.s + '%';
        const l = c.l + '%';
        const a = typeof c.a !== 'undefined' ? c.a : 1;
        return `hsla(${h}, ${s}, ${l}, ${a})`;
      }
      return String(c);
    };

    // helper to resolve token reference strings like "{Brand.lui.brand.color.accent.1}" into CSS var references
    const resolveValue = (v) => {
      if (v == null) return null;
      if (typeof v === 'string') {
        const m = v.match(/^\{\s*([^}]+)\s*\}$/);
        if (m) {
          const path = m[1];
          const parts = path.split('.').map(p => p.replace(/\s+/g, '-').toLowerCase());
          const varName = parts.slice(1).join('-') || parts.join('-');
          return `var(--${varName})`;
        }
        // plain string (e.g., "16px")
        return v;
      }
      // object color
      return toHsla(v);
    };

    // classify modes into theme (light/dark), brand (other non-responsive modes) and media (responsive modes like mobile/desktop)
    const themeModes = {};
    const brandModes = {};
    const mediaModes = {};
    const rootVars = [];

    // set of names we consider responsive breakpoints; extend as needed
    const breakpointSet = new Set(['mobile','tablet','desktop','phone','sm','md','lg','xl','2xl']);

    allProperties.forEach(prop => {
      const original = prop.original || {};
      const modes = original.$extensions && original.$extensions.mode;
      // build a normalized var name that drops the first path segment
      const pathSegments = (prop.path && prop.path.length) ? prop.path.map(p => String(p).replace(/\s+/g, '-').toLowerCase()) : prop.name.split('-');
      const shortName = pathSegments.slice(1).join('-') || pathSegments.join('-');

      if (modes && Object.keys(modes).length > 1) {
        const modeKeys = Object.keys(modes);
        // default mode preference: light, then dark, then first available
        const defaultMode = (modeKeys.includes('light') ? 'light' : (modeKeys.includes('dark') ? 'dark' : modeKeys[0]));
        const defaultVal = resolveValue(modes[defaultMode]);
        if (defaultVal != null) {
          rootVars.push('  --' + shortName + ': ' + defaultVal + ';');
        }

        modeKeys.forEach(modeName => {
          const modeKey = modeName.replace(/\s+/g, '-').toLowerCase();
          const rawVal = modes[modeName];
          const val = resolveValue(rawVal);
          if (val == null) return;

          if (['light','dark'].includes(modeKey)) {
            themeModes[modeKey] = themeModes[modeKey] || [];
            themeModes[modeKey].push('  --' + shortName + ': ' + val + ';');
          } else if (breakpointSet.has(modeKey)) {
            mediaModes[modeKey] = mediaModes[modeKey] || [];
            mediaModes[modeKey].push('  --' + shortName + ': ' + val + ';');
          } else {
            brandModes[modeKey] = brandModes[modeKey] || [];
            brandModes[modeKey].push('  --' + shortName + ': ' + val + ';');
          }
        });
      } else {
        const resolved = resolveValue(prop.value);
        if (resolved != null) rootVars.push('  --' + shortName + ': ' + resolved + ';');
      }
    });

    let output = ':root {\n' + rootVars.join('\n') + '\n}\n\n';

    // emit only light/dark under data-theme
    if (themeModes.light) {
      output += '[data-theme="light"] {\n' + themeModes.light.join('\n') + '\n}\n\n';
    }
    if (themeModes.dark) {
      output += '[data-theme="dark"] {\n' + themeModes.dark.join('\n') + '\n}\n\n';
    }

    // emit brand modes under data-brand
    Object.keys(brandModes).forEach(mode => {
      output += '[data-brand="' + mode + '"] {\n' + brandModes[mode].join('\n') + '\n}\n\n';
    });

    // map media mode names to media queries (defaults, tweak as needed)
    const mediaQueryMap = {
      mobile: '(max-width: 599px)',
      tablet: '(min-width: 600px) and (max-width: 1023px)',
      desktop: '(min-width: 1024px)',
      phone: '(max-width: 599px)'
    };

    Object.keys(mediaModes).forEach(mode => {
      const mq = mediaQueryMap[mode] || null;
      if (mq) {
        output += '@media ' + mq + ' {\n  :root {\n' + mediaModes[mode].join('\n') + '\n  }\n}\n\n';
      } else {
        // fallback to data-brand if no media mapping exists
        output += '[data-brand="' + mode + '"] {\n' + mediaModes[mode].join('\n') + '\n}\n\n';
      }
    });

    return output;
  }
});

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
          format: 'css/variables-modes',
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
