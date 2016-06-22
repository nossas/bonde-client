import React, { PropTypes } from 'react'
import * as Paths from '../Paths'
import { TabMenuItem } from './'


const ConfigurationsMenu = ({ mobilization, location }) => {

  const basicsMobilizationPath = Paths.basicsMobilization(mobilization.id)
  const cityMobilizationPath = Paths.cityMobilization(mobilization.id)
  const sharingMobilizationPath = Paths.sharingMobilization(mobilization.id)
  const analyticsMobilizationPath = Paths.analyticsMobilization(mobilization.id)
  const customDomainMobilizationPath = Paths.customDomainMobilization(mobilization.id)

  return (
    <div className="bg-white px3 clearfix">
      <h2 className="mb3">Configure sua mobilização</h2>
      <div>
        <ul className="list-reset mb0">
          <TabMenuItem
            path={basicsMobilizationPath}
            text="Informações básicas"
            isActive={basicsMobilizationPath === location.pathname}
          />
          <TabMenuItem
            path={cityMobilizationPath}
            text="Cidade"
            isActive={cityMobilizationPath === location.pathname}
          />
          <TabMenuItem
            path={sharingMobilizationPath}
            text="Compartilhamento"
            isActive={sharingMobilizationPath === location.pathname}
          />
          <TabMenuItem
            path={analyticsMobilizationPath}
            text="Google Analytics"
            isActive={analyticsMobilizationPath === location.pathname}
          />
          <TabMenuItem
            path={customDomainMobilizationPath}
            text="Domínio"
            isActive={customDomainMobilizationPath === location.pathname}
          />
        </ul>
      </div>
    </div>
  )

}

ConfigurationsMenu.propTypes = {
  mobilization: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default ConfigurationsMenu
