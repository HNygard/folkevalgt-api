const { readFile } = require('fs').promises
const md = require('markdown-it')()
const { send } = require('micro')
const kommuner = require('../data/kommuner.json')
const fylker = require('../data/fylker.json')

exports.getFrontpage = async (request, response) => {
  const readme = await readFile('./README.md', 'utf-8')
  send(response, 200, md.render(readme))
}

exports.getKommuner = async (request, response) => {
  send(response, 200, kommuner)
}

exports.getFylker = async (request, response) => {
  send(response, 200, fylker)
}

exports.getUtvalg = async (request, response) => {
  const { areaId, committeeId } = request.params
  const area = fylker[areaId] || kommuner[areaId] || false
  if (!area) {
    send(response, 404, 'Ukjent identifikator')
  } else {
    const adapterPath = `../adapters/${area.adapter.type}.js`
    const adapter = require(adapterPath)
    const options = Object.assign({}, area, { committeeId: committeeId })
    const data = await adapter(options)
    send(response, 200, data)
  }
}
