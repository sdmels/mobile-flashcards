import React, { Component } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import styled from 'styled-components/native'


const DeckBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  shadow-color: rgba(0,35,37,.4);
  shadow-radius: 6px;
  shadow-opacity: 1;
  elevation: 1
`

const TitleText = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #004346;
  width: 100%;
  text-align: center;
`

const CardsText = styled.Text`
  margin-top: 7px;
  font-size: 16px;
  font-weight: bold;
  color: #46585d;
  width: 100%;
  text-align: center;
`

class Deck extends Component {
  state = {
    bounceValue: new Animated.Value(1)
  }

  onPress = () => {
    const { bounceValue } = this.state
    const { navigate } = this.props.navigation
    const { deck } = this.props
    const title = deck.title

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.05}),
      Animated.spring(bounceValue, {toValue: 1, friction: 4})
    ]).start()

    setTimeout(() => {
      navigate('DeckContainer', {
        title,
      })
    }, 350)
  }

  render() {
    const { bounceValue } = this.state
    const { deck, numberOfCards } = this.props

    return (
      <Animated.View style={[styles.container, {transform: [{scale: bounceValue}]}]}>
          <DeckBtn
            onPress={this.onPress}
          >
            <TitleText>{deck.title}</TitleText>
            <CardsText>{numberOfCards} {numberOfCards === 1 ? 'card' : 'cards'}</CardsText>
          </DeckBtn>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  }
})

function mapStateToProps (decks, { title }) {
  const deck = decks[title] ? decks[title] : null
  const numberOfCards = deck ? deck.questions.length : 0
  return {
    deck,
    numberOfCards,
  }
}

export default withNavigation(connect(mapStateToProps)(Deck))
