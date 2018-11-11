const axios = require('axios')

module.exports = async options => {
  const url = options.committeeId ? `${options.adapter.endpoint}/Details/${options.committeeId}?sourceDatabase=EPHORTE` : `${options.adapter.endpoint}/AllDmb`
  const { data } = await axios(url)
  return data
}
