import React from 'react'

// Global module dependencies
import * as paths from '~client/paths'
import { TellAFriend } from '~components/share'

const MatchTellAFriend = ({ mobilization, matchItem }) => {
  let combinationImageUrl = 'https://placeholdit.imgix.net/~text?txtsize=28&bg=e9e9e9' +
    '&txtclr=364C55&txt=300%C3%97300&w=300&h=300&txt=Imagem%20n%C3%A3o%20configurada'
  let share = ''
  if (matchItem) {
    combinationImageUrl = matchItem.goal_image
    share = paths.shareMatchWrapper(matchItem.widget_id, matchItem.id)
  }
  //
  // @TODO: Make `message` prop configurable?
  //
  return (
    <TellAFriend
      mobilization={mobilization}
      message='Resultado da sua combinação'
      href={`${window.location.origin}${share}`}
      imageUrl={combinationImageUrl}
      imageWidth='100%'
    />
  )
}

export default MatchTellAFriend
