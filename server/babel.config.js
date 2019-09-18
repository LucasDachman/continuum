module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/env',
      {
        'targets': {
          'node': true,
          'esmodules': true
        },
        'modules': 'commonjs'
      }
    ]
  ];
  const plugins = ["@babel/plugin-transform-modules-commonjs"];

  const ignore = ['**/node_modules'];

  return {
    presets,
    plugins,
    ignore
  };
}