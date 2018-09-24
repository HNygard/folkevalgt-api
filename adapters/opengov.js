const { getBoards, getMembers } = require('opengov-meetings')

function transformPerson (data) {
  return {
    Id: null,
    Funksjon: data.role,
    Representerer: data.party,
    Sortering: 1,
    Provider: null,
    Utvalg: null,
    Person: {
      Id: null,
      Fornavn: data.firstName,
      Mellomnavn: null,
      Etternavn: data.lastName,
      Adresse: null,
      Postnummer: null,
      Poststed: null,
      Epost: null,
      Telefon: null,
      BildeUrl: null,
      Provider: null,
      Utvalg: null
    }
  }
}

function transformCommittee (data) {
  return {
    Id: data.boardId,
    Navn: data.name,
    Provider: null,
    Medlemmer: data.members.map(transformPerson)
  }
}

function transformCommittees (data) {
  return {
    Id: data.id,
    Navn: data.name
  }
}

module.exports = async options => {
  if (options.committeeId) {
    const settings = {
      host: options.adapter.host,
      path: options.adapter.path,
      boardId: options.committeeId
    }
    const data = await getMembers(settings)
    return transformCommittee(data)
  } else {
    const settings = {
      host: options.adapter.host,
      path: options.adapter.path
    }
    const data = await getBoards(settings)
    return data.map(transformCommittees)
  }
}
