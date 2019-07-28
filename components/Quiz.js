import React, { Component } from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
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

const ProgressText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  align-self: flex-start;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 125px;
  color: #46585d;
  width: 100%;
`

const QuestionText = styled.Text`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: #004346;
  width: 100%;
`

const AnswerBtn = Platform.OS === 'ios'
  ? styled.Text`
    margin-top: 20px;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: bold;
    height: 200px;
    color: #fa565b;
    width: 100%;
    text-align: center;
    `
    : styled.Text`
    margin-top: 20px;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: bold;
    color: #fa565b;
    width: 100%;
    text-align: center;
  `

const AnswerText = Platform.OS === 'ios'
  ? styled.Text`
    text-align: center;
    margin-top: 20px;
    margin-bottom: 15px;
    font-size: 18px;
    padding-left: 10px;
    padding-right: 10px;
    color: #1A1A1B;
    width: 100%%;
  `
  : styled.Text`
    text-align: center;
    margin-top: 20px;
    margin-bottom: 15px;
    font-size: 18px;
    padding-left: 10px;
    padding-right: 10px;
    color: #1A1A1B;
    width: 100%;
    `

const AnswerContainer = styled.TouchableOpacity`
  width: 230px;
  text-align: center
`

const CorrectBtn = styled.TouchableOpacity`
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  border-radius: 4px;
  padding: 14px;
  background-color: #20c58a;
`

const ButtonText = styled.Text`
  color: #fff;
`

const IncorrectBtn = styled.TouchableOpacity`
  background-color: #fa565b;
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 14px;
  `

  const RestartBtn = styled.TouchableOpacity`
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #20c58a;
  margin-bottom: 15px;
  padding: 14px;
  `

  const ReturnBtn = styled.TouchableOpacity`
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #343a40;
  padding: 14px;
`

const ReturnBtnText = styled.Text`
  color: #fff;
`

const NoQuestionView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  background-color: #DFDBE5;
`

const NoQuestionText = styled.Text`
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`

class Quiz extends Component {
  state = {
    correct: 0,
    currentIndex: 0,
    currentQuestion: 1,
    showAnswer: false,
    showScore: false,
    hasTakenOneQuiz: false,
  }

  static navigationOptions = ({ navigation }) => {
      //Todo: populate title dynamically
      const title = `${navigation.getParam('title')} Quiz`

      return {
        title,
      }
    }

    showAnswer = () => {
      const { showAnswer } = this.state

      this.setState({
        showAnswer: !showAnswer,
      })
    }

    handleCorrect = () => {
      const { numberOfQuestions } = this.props
      const maxArrayIndex = numberOfQuestions - 1
      const { currentQuestion } = this.state

      this.setState((state) => ({
        correct: state.correct + 1,
        currentIndex: state.currentIndex === maxArrayIndex ? state.currentIndex : state.currentIndex + 1,
        currentQuestion: state.currentQuestion + 1,
        showScore: state.currentQuestion >= numberOfQuestions ? true : false,
        showAnswer: false,
      }))
    }

    handleIncorrect = () => {
      const { numberOfQuestions } = this.props
      const maxArrayIndex = numberOfQuestions - 1

      this.setState((state) => ({
        currentIndex: state.currentIndex === maxArrayIndex ? state.currentIndex : state.currentIndex + 1,
        currentQuestion: state.currentQuestion + 1,
        showScore: state.currentQuestion >= numberOfQuestions ? true : false,
        showAnswer: false,
      }))
    }

    restart = () => {
      this.setState({
        correct: 0,
        currentIndex: 0,
        currentQuestion: 1,
        showAnswer: false,
        showScore: false,
      })
    }

    toDeckContainer = () => {
      const { title } = this.props
      const { navigate } = this.props.navigation

      navigate('DeckContainer', {
        title,
      })
    }

  render() {
    const { deck, numberOfQuestions } = this.props
    const { correct, currentIndex, currentQuestion, showAnswer, showScore } = this.state
    const questionText = numberOfQuestions > 0 ? deck.questions[currentIndex].question : null
    const answerText = numberOfQuestions > 0 ? deck.questions[currentIndex].answer : null

    if (numberOfQuestions === 0) {
      return (
          <NoQuestionView>
            <NoQuestionText>This deck doesn't have any questions. In order to take a quiz, please add some questions.
            </NoQuestionText>
          </NoQuestionView>
      )
    }

    if (showScore === true) {
      clearLocalNotification()
      .then(setLocalNotification)

      return (
        <ContainerView>
          <GroupContainerView>
            <ProgressText>Score: {correct <= 0 ? 0 : correct}/{numberOfQuestions}</ProgressText>
          </GroupContainerView>
          <GroupContainerView>
            <RestartBtn onPress={this.restart}>
              <ReturnBtnText>Restart Quiz</ReturnBtnText>
            </RestartBtn>
            <ReturnBtn onPress={this.toDeckContainer}>
              <ReturnBtnText>Back to Deck</ReturnBtnText>
            </ReturnBtn>
          </GroupContainerView>
        </ContainerView>
      )
    }

    return (
      <ContainerView>
        <GroupContainerView>
          <ProgressText>Progress: {currentQuestion <= numberOfQuestions ? currentQuestion : numberOfQuestions}/{numberOfQuestions}</ProgressText>
          <QuestionText>{questionText}</QuestionText>
          <AnswerContainer onPress={this.showAnswer}>
            {showAnswer === false ? <AnswerBtn>Answer</AnswerBtn> : <AnswerText>{answerText}</AnswerText>}
          </AnswerContainer>
        </GroupContainerView>
        <GroupContainerView>
          <CorrectBtn onPress={this.handleCorrect}>
            <ButtonText>Correct</ButtonText>
          </CorrectBtn>
          <IncorrectBtn onPress={this.handleIncorrect}>
            <ButtonText>Incorrect</ButtonText>
          </IncorrectBtn>
        </GroupContainerView>
      </ContainerView>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  const title = navigation.state.params.title
  const deck = decks[title]
  const numberOfQuestions = deck.questions.length > 0
    ? deck.questions.length
    : 0

  return {
    title,
    deck,
    numberOfQuestions,
  }
}

export default connect(mapStateToProps)(Quiz)
