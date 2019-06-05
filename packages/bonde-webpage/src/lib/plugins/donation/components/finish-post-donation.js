import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';

export default class FinishPostDonation extends Component {

  constructor(e) {
    super(e)
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  state = {
    selectedValue: 'donation_value' + this.props.widget.settings.default_donation_value
  }

  renderValues(settings) {
    const { donation_value1, donation_value2, donation_value3, donation_value4, donation_value5 } = settings
    if (settings) {
      return <>
        {donation_value1 && <option value={`donation_value1`}>
          <FormattedMessage
            id='widgets.components--donation.finish-post-donation.value-list'
            defaultMessage='R$ {value} / mês'
            values={{
              value: donation_value1
            }}
          />
        </option>}
        {donation_value2 && <option value={`donation_value2`}>
          <FormattedMessage
            id='widgets.components--donation.finish-post-donation.value-list'
            defaultMessage='R$ {value} / mês'
            values={{
              value: donation_value2
            }}
          />
        </option>}
        {donation_value3 && <option value={`donation_value3`}>
          <FormattedMessage
            id='widgets.components--donation.finish-post-donation.value-list'
            defaultMessage='R$ {value} / mês'
            values={{
              value: donation_value3
            }}
          />
        </option>}
        {donation_value4 && <option value={`donation_value4`}>
          <FormattedMessage
            id='widgets.components--donation.finish-post-donation.value-list'
            defaultMessage='R$ {value} / mês'
            values={{
              value: donation_value4
            }}
          />
        </option>}
        {donation_value5 && <option value={`donation_value5`}>
          <FormattedMessage
            id='widgets.components--donation.finish-post-donation.value-list'
            defaultMessage='R$ {value} / mês'
            values={{
              value: donation_value5
            }}
          />
        </option>}
      </>
    } else {
      return <option disabled>
        <FormattedMessage
          id='widgets.components--donation.finish-post-donation.no-action'
          defaultMessage='Nenhuma ação disponível'
        />
      </option>
    }
  }

  handleValueChange(e) {
    const { value } = e.currentTarget
    this.setState({
      selectedValue: value
    })
  }

  render() {
    const {
      widget: { settings },
      mobilization: { header_font }
    } = this.props

    const mainColor = (settings && settings.main_color) || '#54d0f6'

    return (
      <div className='donation center clearfix'>
        <h2
          className='p2 m0 white rounded-top'
          style={{ fontFamily: header_font, backgroundColor: mainColor, fontWeight: 'bold' }}
        >
          <FormattedMessage
            id='widgets.components--donation.finish-post-donation.title-component'
            defaultMessage='OBA! Doação Realizada :)'
          />
        </h2>
        <div
          className="p3"
          style={{ paddingTop: 0 }}
        >
          <div className='center clearfix p2'>
            <b>
              <FormattedMessage
                id='widgets.components--donation.finish-post-donation.improve-impact-question'
                defaultMessage='Quer aumentar seu impacto?'
              />
            </b><br />
            <FormattedMessage
              id='widgets.components--donation.finish-post-donation.improve-impact-solution'
              defaultMessage='Torne essa doação recorrente!'
            />
          </div>
          <div
            className='center clearfix mb2'
            style={{
              fontSize: 14,
              color: 'gray'
            }}
          >
            <FormattedMessage
              id='widgets.components--donation.finish-post-donation.improve-impact-explanation'
              defaultMessage='Sua contribuição será efetivada automaticamente uma vez ao mês, iniciando daqui há 31 dias.'
            />
          </div>
          <div className='center clearfix'>
            <select
              className='select mb2'
              onChange={this.handleValueChange}
              value={this.state.selectedValue}
            >
              {this.renderValues(settings)}
            </select>
            <button
              onClick={() => this.props.onFinish(this.state.selectedValue)}
              className="btn col-12 p2 mb2"
              style={{
                backgroundColor: mainColor,
                color: 'white'
              }}
            >
              <FormattedMessage
                id='widgets.components--donation.finish-post-donation.support-every-month'
                defaultMessage='APOIAR TODO MÊS'
              />
            </button>
            <button
              onClick={() => this.props.onFinish()}
              className="btn col-12 p2"
            >
              <FormattedMessage
                id='widgets.components--donation.finish-post-donation.not-now'
                defaultMessage='AGORA NÃO'
              />
            </button>
          </div>
        </div>
      </div>
    )
  }
}