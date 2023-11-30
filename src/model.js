import * as SQLite from 'expo-sqlite'

import { DB_FILE } from './constants'

const SCHEDULE_TABLE = 'schedules'
const CARD_TABLE = 'cards'
const SCHEDULE_CARDS_TABLE = 'schedule_cards'

export function createSchedule(
  id,
  name,
  birthDate,
  methodology,
  horse,
  equipment,
  considerations,
  date,
) {
  return {
    id,
    name,
    birthDate,
    methodology,
    horse,
    equipment,
    considerations,
    date,
    birth_date: birthDate,
  }
}

// NOTE: This will be replaced with typescript structure or expo-sqlite-orm
function serializeSchedule(data, snakeCase = false) {
  if (Array.isArray(data)) {
    return data.map((schedule) => serializeSchedule(schedule))
  }
  const schedule = createSchedule(
    data.id,
    data.name,
    data.birthDate || data.birth_date,
    data.methodology,
    data.horse,
    data.equipment,
    data.considerations,
    data.date,
  )
  if (snakeCase) {
    schedule.birth_date = schedule.birthDate
    delete schedule.birthDate
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
  scheduleCard.order = data.order
  if (snakeCase) {
    scheduleCard.schedule_id = data.scheduleId
    scheduleCard.card_id = data.cardId
  } else {
    scheduleCard.scheduleId = data.schedule_id
    scheduleCard.cardId = data.card_id
  }
  return scheduleCard
}

function resultSetRowListToItem(resultSetList) {
  if (!resultSetList.rows.length) {
    return null
  }
  return resultSetList.rows.item(0)
}

function resultSetRowListToArray(resultSetList) {
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
      "order" INTEGER NOT NULL,
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
  const scheduleCards = serializeScheduleCard(
    require('../data/schedule_cards.json'),
  )

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
      callback(serializeSchedule(resultSetRowListToArray(result)))
    })
  })
}

export function getSchedule(db, id, callback) {
  const query = `
    SELECT *
    FROM ${SCHEDULE_TABLE}
    WHERE id = ?
    LIMIT 1;
  `
  const parameters = [id]
  db.transaction((tx) => {
    tx.executeSql(query, parameters, (_, result) => {
      const item = resultSetRowListToItem(result)
      if (!item) {
        return callback(null)
      }
      callback(serializeSchedule(item))
    })
  })
}

export function getLatestSchedule(db, id, callback) {
  const query = `
    SELECT *
    FROM ${SCHEDULE_TABLE}
    ORDER BY id DESC
    LIMIT 1;
  `
  const parameters = [id]
  db.transaction((tx) => {
    tx.executeSql(query, parameters, (_, result) => {
      const item = resultSetRowListToItem(result)
      if (!item) {
        return callback(null)
      }
      callback(serializeSchedule(item))
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
      (_, result) => callback(serializeCard(resultSetRowListToArray(result))),
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
    WHERE schedule_id = ?
    ORDER BY "order" ASC
    ;
  `
  const parameters = [scheduleId]
  db.transaction((tx) => {
    tx.executeSql(
      query,
      parameters,
      (_, result) =>
        callback(serializeScheduleCard(resultSetRowListToArray(result))),
      (_, error) => console.log(error), // TODO: Handle error
    )
  })
}

export function saveScheduleCard(db, scheduleCard) {
  const insertQuery = `
    INSERT OR REPLACE INTO ${SCHEDULE_CARDS_TABLE} ("status", "order", "schedule_id", "card_id")
    VALUES (?, ?, ?, ?)
  `
  const parameters = [
    scheduleCard.status,
    scheduleCard.order,
    scheduleCard.scheduleId,
    scheduleCard.cardId,
  ]
  // console.log("SCHEDULE_ID_DB_sched", scheduleCard.scheduleId)
  // console.log("SCHEDULE_ID_DB_status", scheduleCard.status)
  // console.log("SCHEDULE_ID_DB_card", scheduleCard.cardId)
  // console.log("SCHEDULE_ID_DB_order", scheduleCard.order)

  db.transaction((tx) => {
    tx.executeSql(
      insertQuery,
      parameters,
      null,
      (_, error) => console.log(error), // TODO: Handle error
    )
  })
}
