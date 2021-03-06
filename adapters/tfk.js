process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const axios = require('axios')

function transformPerson (data) {
  const committees = data.committees.filter(committee => committee.groupRecno === data.selectedCommittee)
  const parties = data.committees.filter(committee => committee.role === 'Parti')
  const party = parties[0] || {}
  const committee = committees[0] || {}
  return {
    Id: data.recno,
    Funksjon: committee.roleDescription,
    Representerer: party.name || 'Uavhengig',
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
    const [membersResult, committeeResult] = await Promise.all([axios(memberUrl), axios(url)])
    const committee = committeeResult.data[0]
    const members = membersResult.data.map(member => Object.assign(member, { selectedCommittee: committee._id }))
    const data = transformCommittee(committee, members)
    return data
  } else {
    const url = `${options.adapter.endpoint}`
    const { data } = await axios(url)
    return data.map(transformCommittees)
  }
}
