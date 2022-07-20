const functions = {
  spacing: (...multipliers) =>
    multipliers.reduce((aggr, m) => [...aggr, `${m * 8}px`], []).join(' '),
  negative: val => `calc(${val} * -1)`,
};

module.exports = {
  plugins: {
    'postcss-simple-vars': {
      variables: {
        'small-phone-down': 'max-width: 319px',
        'phone-down': 'max-width: 599px',
        'phone-up': 'min-width: 600px',
        'tablet-portrait-down': 'max-width: 699px',
        'tablet-portrait-up': 'min-width: 700px',
        'tablet-landscape-down': 'max-width: 899px',
        'tablet-landscape-up': 'min-width: 900px',
        'desktop-down': 'max-width: 1199px',
        'desktop-up': 'min-width: 1200px',
        'big-desktop-down': 'max-width: 1439px',
        'big-desktop-up': 'min-width: 1440px',
      },
    },
    'postcss-functions': { functions: functions },
    'postcss-calc': { preserve: false, warnWhenCannotResolve: false },
    'postcss-import': {},
    'postcss-nested': {},
  },
};