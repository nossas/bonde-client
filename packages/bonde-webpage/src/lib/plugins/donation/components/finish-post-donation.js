import React, { Component } from 'react'

export default class FinishPostDonation extends Component {

  constructor(e) {
    super(e)
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  state = {
    selectedValue: 'donation_value1'
  }

  renderValues(settings) {
    if (settings) {
      return [...Array(5)].map((_, i) => (
        <option
          key={i}
          value={`donation_value${i + 1}`}>
          R$ {settings[`donation_value${i + 1}`]} / mês
        </option>
      ))
    } else {
      return <option disabled> Nenhuma opção disponível </option>
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
          OBA! Doação Realizada :)
                </h2>
        <div
          className="p3"
          style={{ paddingTop: 0 }}
        >
          <div className='center clearfix p2'>
            <b>Quer aumentar seu impacto?</b><br />
            Torne essa doação recorrente!
                    </div>
          <div
            className='center clearfix mb2'
            style={{
              fontSize: 14,
              color: 'gray'
            }}
          >
            Sua contribuição será efetivada automaticamente uma vez ao mês, iniciando daqui há 31 dias.
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
              APOIAR TODO MÊS
            </button>
            <button
              onClick={() => this.props.onFinish()}
              className="btn col-12 p2">
              AGORA NÃO
            </button>
          </div>
        </div>
      </div>
    )
  }
}