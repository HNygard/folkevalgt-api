const axios = require('axios')

module.exports = async options => {
  const url = options.committeeId ? `${options.adapter.endpoint}/${options.committeeId}` : `${options.adapter.endpoint}`
  const { data } = await axios(url)
  return data
}
