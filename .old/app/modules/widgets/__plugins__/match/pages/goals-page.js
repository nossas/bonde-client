import React, { PropTypes } from 'react'

// Global module dependencies
import { SettingsPageContentLayout } from '../../../../../components/Layout'

// Current module dependencies
import { ChoiceCombined, Page } from '../components'
import * as MatchActions from '../action-creators'

export default class GoalsPage extends React.Component {
  widget (props = this.props) {
    const { widgets, params } = props
    const widgetsStringId = widgets.map(widget => widget.id.toString())
    const widgetIndex = widgetsStringId.indexOf(params.widget_id)
    return widgets[widgetIndex]
  }

  finishedUploadFile (match) {
    const { dispatch } = this.props
    const actionStrategy = match.id
      ? MatchActions.asyncMatchUpdate
      : MatchActions.asyncMatchCreate

    dispatch(actionStrategy({ match, props: this.props }))
  }

  getOrCreateMatch (widget, firstChoice, secondChoice) {
    const combineds = widget.match_list.filter((match) => {
      return match.first_choice === firstChoice && match.second_choice === secondChoice
    })
    if (combineds && combineds.length > 0) {
      return combineds.slice(-1)[0]
    }
    return {
      first_choice: firstChoice,
      second_choice: secondChoice
    }
  }

  renderCombineChoices () {
    const { settings: { choices1 } } = this.widget()
    const firstChoices = choices1 ? choices1.split(',') : []

    return firstChoices.map((a, index) => (
      <div key={index}>
        <h2>{a}</h2>
        <div className='clearfix'>
          { this.renderSecondChoices(a) }
        </div>
      </div>
    ))
  }

  renderSecondChoices (a) {
    const widget = this.widget()
    const { settings: { choicesA } } = widget
    const secondChoices = choicesA ? choicesA.split(',') : []

    return secondChoices.map((b, index) => {
      const isLast = index === secondChoices.length - 1
      const match = this.getOrCreateMatch(widget, a, b)
      let props = {
        match: match,
        classes: isLast ? ['mb3'] : [],
        handleUploadFinish: this.finishedUploadFile.bind(this)
      }
      return <ChoiceCombined key={index} {...props} />
    })
  }

  render () {
    const { mobilization, location } = this.props
    const widget = this.widget()
    return (
      <Page mobilization={mobilization} location={location} widget={widget}>
        <SettingsPageContentLayout>
          {this.renderCombineChoices()}
        </SettingsPageContentLayout>
      </Page>
    )
  }
}

GoalsPage.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  mobilization: PropTypes.object,
  widgets: PropTypes.array
}

GoalsPage.contextTypes = {
  router: PropTypes.object.isRequired
}
