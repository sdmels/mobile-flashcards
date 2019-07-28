import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, setDecks } from './_data'

export function getDecks () {
  AsyncStorage.clear()
  setDecks()
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function addNewDeck (deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    const newData = {
      ...data,
      ...deck
    }
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newData))
  })
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    data[title].questions = data[title].questions.concat([card])
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
  })
}

export function deleteDeck (key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    data[key] = undefined
    delete data[key]
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
  })
}
