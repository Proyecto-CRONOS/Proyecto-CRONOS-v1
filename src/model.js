import * as SQLite from 'expo-sqlite'

import { DB_FILE } from './constants'

const SCHEDULE_TABLE = 'schedules'
const CARD_TABLE = 'cards'
const SCHEDULE_CARDS_TABLE = 'schedule_cards'

// NOTE: This will be replaced with typescript structure or expo-sqlite-orm
function serializeSchedule(data, snakeCase = false) {
  if (Array.isArray(data)) {
    return data.map((schedule) => serializeSchedule(schedule))
  }
  const schedule = {
    id: data.id,
    name: data.name,
    methodology: data.methodology,
    horse: data.horse,
    equipment: data.equipment,
    considerations: data.considerations,
    date: data.date,
  }
  if (snakeCase) {
    schedule.birth_date = data.birthDate
  } else {
    schedule.birthDate = data.birth_date
  }
  return schedule
}

// NOTE: This will be replaced with typescript structure or expo-sqlite-orm
// FIXME: Remove this function
function serializeCard(data) {
  if (Array.isArray(data)) {
    return data.map((card) => serializeCard(card))
  }
  const card = {
    id: data.id,
    title: data.title,
    description: data.description,
    audio: data.audio,
    image: data.image,
  }
  return card
}

// NOTE: This will be replaced with typescript structure or expo-sqlite-orm
function serializeScheduleCard(data, snakeCase = false) {
  if (Array.isArray(data)) {
    return data.map((scheduleCard) => serializeScheduleCard(scheduleCard))
  }
  const scheduleCard = serializeCard(data)
  scheduleCard.id = data.id
  scheduleCard.status = data.status
  if (snakeCase) {
    scheduleCard.schedule_id = data.scheduleId
    scheduleCard.card_id = data.cardId
  } else {
    scheduleCard.scheduleId = data.schedule_id
    scheduleCard.cardId = data.card_id
  }
  return scheduleCard
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
      "name"	TEXT NOT NULL,
      "birth_date"	TEXT NOT NULL,
      "methodology"	TEXT NOT NULL,
      "horse"	TEXT NOT NULL,
      "equipment"	TEXT NOT NULL,
      "considerations"	TEXT NOT NULL,
      "date"	NUMERIC NOT NULL,
      "id"	INTEGER NOT NULL,
      PRIMARY KEY("id" AUTOINCREMENT)
    );
  `
  const cardQuery = `
    CREATE TABLE IF NOT EXISTS ${CARD_TABLE} (
      "id"	INTEGER NOT NULL,
      "title"	TEXT NOT NULL,
      "description"	TEXT NOT NULL,
      "audio"	TEXT NOT NULL,
      "image"	TEXT NOT NULL,
      PRIMARY KEY("id" AUTOINCREMENT)
    );
  `
  const scheduleCardsQuery = `
    CREATE TABLE IF NOT EXISTS ${SCHEDULE_CARDS_TABLE} (
      "status" TEXT NOT NULL,
      "schedule_id"	INTEGER NOT NULL,
      "card_id"	INTEGER NOT NULL,
      PRIMARY KEY("schedule_id","card_id")
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
      scheduleCardsQuery,
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
  const scheduleCards = serializeScheduleCard(require('../data/schedule_cards.json'))

  createTables(db)

  schedules.forEach((schedule) => {
    saveSchedule(db, schedule)
  })
  cards.forEach((card) => {
    saveCard(db, card)
  })
  scheduleCards.forEach((scheduleCard) => {
    saveScheduleCard(db, scheduleCard)
  })
}

export function getSchedules(db, callback) {
  const query = `
    SELECT *
    FROM ${SCHEDULE_TABLE};
  `
  db.transaction((tx) => {
    tx.executeSql(query, null, (_, result) => {
      callback(serializeSchedule(resultSetRowLisToArray(result)))
    })
  })
}

export function saveSchedule(db, schedule) {
  const insertQuery = `
    INSERT OR REPLACE INTO ${SCHEDULE_TABLE} ("id", "name", "birth_date",
      "methodology", "horse", "equipment", "considerations", "date")
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `
  const parameters = [
    schedule.id,
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

export function getCards(db, callback) {
  const query = `
    SELECT *
    FROM ${CARD_TABLE};
  `
  db.transaction((tx) => {
    tx.executeSql(
      query,
      null,
      (_, result) => callback(serializeCard(resultSetRowLisToArray(result))),
      (_, error) => console.log(error), // TODO: Handle error
    )
  })
}

export function saveCard(db, card) {
  const insertQuery = `
    INSERT OR REPLACE INTO ${CARD_TABLE} ("id", "title", "description",
      "audio", "image")
    VALUES (?, ?, ?, ?, ?)
  `
  const parameters = [
    card.id,
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

export function getScheduleCards(db, scheduleId, callback) {
  const query = `
    SELECT *
    FROM ${SCHEDULE_CARDS_TABLE}
    LEFT JOIN ${CARD_TABLE} AS card ON card.id = card_id
    WHERE schedule_id = ?;
  `
  const parameters = [scheduleId]
  db.transaction((tx) => {
    tx.executeSql(
      query,
      parameters,
      (_, result) => callback(serializeScheduleCard(resultSetRowLisToArray(result))),
      (_, error) => console.log(error), // TODO: Handle error
    )
  })
}

export function saveScheduleCard(db, scheduleCard) {
  const insertQuery = `
    INSERT OR REPLACE INTO ${SCHEDULE_CARDS_TABLE} ("status", "schedule_id", "card_id")
    VALUES (?, ?, ?)
  `
  const parameters = [scheduleCard.status, scheduleCard.scheduleId, scheduleCard.cardId]
  db.transaction((tx) => {
    tx.executeSql(
      insertQuery,
      parameters,
      null,
      (_, error) => console.log(error), // TODO: Handle error
    )
  })
}
