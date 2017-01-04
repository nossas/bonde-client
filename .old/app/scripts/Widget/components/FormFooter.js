import React, { PropTypes } from 'react'


const FormFooter = ({ submitted, saving, ...props }) => {
  return (
    <div className="flex flex-wrap mt1">
      <button className="caps button bg-darken-3 h3 mr2">Cancelar</button>
      <input
        type="submit"
        className="caps button bg-aqua h3"
        value={(saving ? "Salvando..." : "Salvar")}
        {...props}
      />
      { !saving && submitted && <div className="green h4 px2 mt2">Configurações do formulário atualizadas!</div> }
    </div>
  )
}

FormFooter.propTypes = {
  submitted: PropTypes.bool,
  saving: PropTypes.bool
}

FormFooter.defaultProps = {
  submitted: false,
  saving: false
}

export default FormFooter
