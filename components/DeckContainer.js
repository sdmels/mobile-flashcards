import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { removeDeck } from '../actions'
import { deleteDeck } from '../utils/api'
import styled from 'styled-components/native'

const ContainerView = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`

const GroupContainerView = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`

const TitleView = styled.View`
  margin-top: 150px;
  margin-bottom: 100px;
  width: 100%;
`

const TitleText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
  color: #004346;
  `
  const CardsText = styled.Text`
  text-align: center;
  font-weight: bold;
  color: #46585d;
`

const AddCardBtn = styled.TouchableOpacity`
  background-color: #20c58a;
  height: 45px;
  width: 300px;
  border: 1px solid #20c58a;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 14px;
  `
  const StartQuizBtn = styled.TouchableOpacity`
  background-color: #343a40;
  height: 45px;
  width: 300px;
  border: 1px solid #343a40;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 14px;
`

const ButtonText = styled.Text`
  color: #fff;
`

const DeleteDeckText = styled.Text`
  color: #004346;
  font-weight: bold;
`

class DeckContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title')

    return {
      title,
    }
  }

  toAddCard = () => {
    const title = this.props.navigation.getParam('title')

    const { navigate } = this.props.navigation
    navigate('AddCard', {
      title,
    })
  }

  toQuiz = () => {
    const title = this.props.navigation.getParam('title')
    const { navigate } = this.props.navigation

    navigate('Quiz', {
      title,
    })
  }

  deleteDeck = () => {
    const { navigate } = this.props.navigation
    const { removeDeck } = this.props
    const id = this.props.navigation.getParam('title')
    //Update Redux
    removeDeck(id)
    //Update AsyncStorage
    deleteDeck(id)

    navigate('ListDecks')
  }

  render() {
    const {navigate} = this.props.navigation
    const title = this.props.navigation.getParam('title')
    const { numberOfCards } = this.props

    return (
      <ContainerView>
        <GroupContainerView>
          <TitleView>
            <TitleText>{title}</TitleText>
            <CardsText>{numberOfCards} {numberOfCards === 1 ? 'card' : 'cards'}</CardsText>
          </TitleView>
        </GroupContainerView>

        <GroupContainerView>
          <AddCardBtn onPress={this.toAddCard}>
            <ButtonText>Add Card</ButtonText>
          </AddCardBtn>

          <StartQuizBtn onPress={this.toQuiz}>
            <ButtonText>Start Quiz</ButtonText>
          </StartQuizBtn>
          <TouchableOpacity onPress={this.deleteDeck}>
            <DeleteDeckText>Delete Deck</DeleteDeckText>
          </TouchableOpacity>
        </GroupContainerView>

      </ContainerView>
    )
  }
}

function mapStateToProps (decks, { navigation } ) {
  const title = navigation.state.params.title
  const deck = decks[title]
  const numberOfCards = deck ? deck.questions.length : 0

  return {
    numberOfCards,
  }
}

export default connect(mapStateToProps, { removeDeck })(DeckContainer)
