const { getMedlemmer, getUtvalg } = require('@alheimsins/acos-innsyn')

module.exports = async options => {
  const settings = Object.assign({}, options.adapter, { utvalgId: options.committeeId })
  const action = options.committeeId ? getMedlemmer : getUtvalg
  const data = await action(settings)
  return data
}
