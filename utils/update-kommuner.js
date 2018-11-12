(async () => {
  const axios = require('axios')
  const { writeFile } = require('fs').promises
  const url = 'https://register.geonorge.no/api/subregister/sosi-kodelister/kartverket/kommunenummer-alle.json'
  const { data } = await axios.get(url)
  const kommuner = require('../data/kommuner.json')
  const kommuneKeys = Object.keys(kommuner)
  const newAdditions = data.containeditems.reduce((prev, current) => {
    console.log(`Got - ${current.codevalue} - ${current.status}`)
    if (!kommuneKeys.includes(current.codevalue) && current.status === 'Gyldig') {
      console.log(`Adding - ${current.codevalue} - ${current.description}`)
      prev[current.codevalue] = {
        name: current.description
      }
    }
    return prev
  }, {})
  const update = { ...kommuner, ...newAdditions }
  await writeFile('data/kommuner.json', JSON.stringify(update, null, 2), 'utf-8')
  console.log('Finished')
})()
