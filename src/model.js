import * as SQLite from 'expo-sqlite'

import { DB_FILE } from './constants'

const SCHEDULE_TABLE = 'schedules'
const CARD_TABLE = 'cards'

// NOTE: This will be replaced with typescript structure or expo-sqlite-orm
function serializeSchedule(data, snakeCase = false) {
  if (Array.isArray(data)) {
    return data.map((schedule) => serializeSchedule(schedule))
  }
  const schedule = {
    methodology: data.methodology,
    horse: data.horse,
    equipment: data.equipment,
    considerations: data.considerations,
    date: data.date,
  }
  if (snakeCase) {
    schedule.profile_name = data.name
    schedule.birth_date = data.birthDate
    schedule.profile_id = data.profileId
  } else {
    schedule.name = data.profile_name
    schedule.birthDate = data.birth_date
    schedule.profileId = data.profile_id
  }
  return schedule
}

// NOTE: This will be replaced with typescript structure or expo-sqlite-orm
function serializeCard(data, snakeCase = false) {
  if (Array.isArray(data)) {
    return data.map((card) => serializeCard(card))
  }
  const card = {
    title: data.title,
    description: data.description,
    audio: data.audio,
    image: data.image,
  }
  if (snakeCase) {
    card.card_id = data.cardId
    card.profile_id = data.profileId
  } else {
    card.cardId = data.card_id
    card.profileId = data.profile_id
  }
  return card
}

function resultSetRowLisToArray(resultSetList) {
  const resultSetArray = []
  for (let i = 0; i < resultSetList.rows.length; i++) {
    resultSetArray.push(resultSetList.rows.item(i))
  }
  return resultSetArray
}

export function openDatabase() {
  return SQLite.openDatabase(DB_FILE)
}

function createTables(db) {
  const scheduleQuery = `
    CREATE TABLE IF NOT EXISTS ${SCHEDULE_TABLE} (
      "profile_name"	TEXT NOT NULL,
      "birth_date"	TEXT NOT NULL,
      "methodology"	TEXT NOT NULL,
      "horse"	TEXT NOT NULL,
      "equipment"	TEXT NOT NULL,
      "considerations"	TEXT NOT NULL,
      "date"	NUMERIC NOT NULL,
      "profile_id"	INTEGER NOT NULL,
      PRIMARY KEY("profile_id" AUTOINCREMENT)
    );
  `

  const cardQuery = `
    CREATE TABLE IF NOT EXISTS ${CARD_TABLE} (
      "card_id"	INTEGER NOT NULL,
      "profile_id"	INTEGER NOT NULL,
      "title"	TEXT NOT NULL,
      "description"	TEXT NOT NULL,
      "audio"	TEXT NOT NULL,
      "image"	TEXT NOT NULL,
      FOREIGN KEY("profile_id") REFERENCES "card",
      PRIMARY KEY("card_id" AUTOINCREMENT)
    );
  `
  db.transaction((tx) => {
    tx.executeSql(
      scheduleQuery,
      null,
      null,
      (_, error) => console.log(error), // TODO: Handle error
    )
    tx.executeSql(
      cardQuery,
      null,
      null,
      (_, error) => console.log(error), // TODO: Handle error
    )
  })
}

export function initializeDatabase(db) {
  const schedules = serializeSchedule(require('../data/schedules.json'))
  const cards = serializeCard(require('../data/cards.json'))

  createTables(db)

  schedules.forEach((schedule) => {
    saveSchedule(db, schedule)
  })
  cards.forEach((card) => {
    saveCard(db, card)
  })
}

export function getSchedules(db, profileId, callback) {
  const query = `
    SELECT *
    FROM ${SCHEDULE_TABLE}
    WHERE profile_id = ?;
  `
  db.transaction((tx) => {
    tx.executeSql(query, [profileId], (_, result) => {
      callback(serializeSchedule(resultSetRowLisToArray(result)))
    })
  })
}

export function saveSchedule(db, schedule) {
  const insertQuery = `
    INSERT OR REPLACE INTO ${SCHEDULE_TABLE} ("profile_id", "profile_name", "birth_date",
      "methodology", "horse", "equipment", "considerations", "date")
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `
  const parameters = [
    schedule.profileId,
    schedule.name,
    schedule.birthDate,
    schedule.methodology,
    schedule.horse,
    schedule.equipment,
    schedule.considerations,
    schedule.date,
  ]
  db.transaction((tx) => {
    tx.executeSql(
      insertQuery,
      parameters,
      null,
      (_, error) => console.log(error), // TODO: Handle error
    )
  })
}

export function getCards(db, profileId, callback) {
  const query = `
    SELECT *
    FROM ${CARD_TABLE}
    WHERE profile_id = ?
  `
  const parameters = [profileId]
  db.transaction((tx) => {
    tx.executeSql(
      query,
      parameters,
      (_, result) => callback(serializeCard(resultSetRowLisToArray(result))),
      (_, error) => console.log(error), // TODO: Handle error
    )
  })
}

export function saveCard(db, card) {
  const insertQuery = `
    INSERT OR REPLACE INTO ${CARD_TABLE} ("card_id", "profile_id", "title", "description",
      "audio", "image")
    VALUES (?, ?, ?, ?, ?, ?)
  `
  const parameters = [
    card.cardId,
    card.profileId,
    card.title,
    card.description,
    card.audio,
    card.image,
  ]
  db.transaction((tx) => {
    tx.executeSql(
      insertQuery,
      parameters,
      null,
      (_, error) => console.log(error), // TODO: Handle error
    )
  })
}
