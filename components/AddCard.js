import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import AppTextInput from './AppTextInput'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { lightgrey, line, body, white, action } from './../utils/colors';
import styled from 'styled-components/native'


const ContainerView = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-bottom: 40px
`

class AddCard extends Component {
  state = {
    questionText: '',
    answerText: '',
  }

  handleChange = (id, value) => {
    id === 'question'
    ? this.setState({
      questionText: value
    })
    : this.setState({
      answerText: value
    })
  }

  submit = () => {
    const { navigate } = this.props.navigation
    const { deck, addCard } = this.props
    const title = deck.title
    const { questionText, answerText } = this.state
    const card = {
      question: questionText,
      answer: answerText,
    }

    if (questionText !== '' && answerText !== '') {
      //Update Redux
      addCard(title, card)

      //Update AsyncStorage
      addCardToDeck(title, card)

      this.setState({
        questionText: '',
        answerText: '',
      })

      navigate('DeckContainer', {
        title,
      })
    } else {
      alert('Please enter a question and an answer.')
    }
  }

  render() {
    return (
      <ContainerView>
        <View>
          <AppTextInput
            id='question'
            placeholder='Question'
            placeholderTextColor={lightgrey}
            value={this.state.questionText}
            onChangeText={this.handleChange}
            style={styles.input}
          />
          <AppTextInput
            id='Answer'
            placeholder='Answer'
            placeholderTextColor={lightgrey}
            value={this.state.answerText}
            onChangeText={this.handleChange}
            style={[styles.input, {marginTop: 0}]}
          />
        </View>
        <TouchableOpacity
          onPress={this.submit}
          style={styles.submit}
        >
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </ContainerView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: 50,
    marginBottom: 15,
    padding: 5,
    width: 325,
    height: 45,
    borderWidth: 1,
    borderColor: line,
    borderRadius: 4,
    color: body,
    backgroundColor: white
  },
  submit: {
    marginTop: 250,
    width: 250,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: action,
    borderRadius: 3,
  },
  text: {
    color: '#fff',
    fontWeight: '500',
    width: 230,
    textAlign: 'center'
  }
})

function mapStateToProps (decks, { navigation }) {

  const title = navigation.state.params.title
  const deck = decks[title]

  return {
    deck,
  }
}

export default connect(mapStateToProps, { addCard })(AddCard)
