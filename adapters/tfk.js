process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const axios = require('axios')

function transformPerson (data) {
  return {
    Id: 204567,
    Funksjon: 'Leder i utvalg',
    Representerer: 'Høyre',
    Sortering: 1,
    Provider: null,
    Utvalg: null,
    Person: {
      Id: data._id,
      Fornavn: data.name,
      Mellomnavn: null,
      Etternavn: data.name,
      Adresse: data.address,
      Postnummer: data.zip,
      Poststed: data.zip,
      Epost: data.publicMail,
      Telefon: data.mobilePhone,
      BildeUrl: null,
      Provider: null,
      Utvalg: null
    }
  }
}

function transformCommittee (committee, members) {
  return {
    Id: committee._id,
    Navn: committee.name,
    Provider: null,
    Medlemmer: members.map(transformPerson)
  }
}

function transformCommittees (data) {
  return {
    Id: data._id,
    Navn: data.name
  }
}

module.exports = async options => {
  if (options.committeeId) {
    const memberUrl = `${options.adapter.endpoint}/${options.committeeId}/members`
    const url = `${options.adapter.endpoint}/${options.committeeId}`
    const [members, committee] = await Promise.all([axios(memberUrl), axios(url)])
    const data = transformCommittee(committee.data[0], members.data)
    return data
  } else {
    const url = `${options.adapter.endpoint}`
    const { data } = await axios(url)
    return data.map(transformCommittees)
  }
}
