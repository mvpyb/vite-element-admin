const productPlugins = []
process.env.NODE_ENV === 'production' &&
productPlugins.push( 'transform-remove-console' )
module.exports = {
  plugins : [
    ...productPlugins
    // [
    //   '@babel/plugin-proposal-decorators',
    //   { 'legacy' : true }
    // ],
    // [
    //   '@babel/plugin-proposal-class-properties',
    //   { 'loose' : true }
    // ]
  ]
}
