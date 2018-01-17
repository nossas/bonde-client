// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

//
// @path (admin) /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
//
export default store => ({
  path: 'finish',
  getComponent (nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./page').default)
    })
  }
})
