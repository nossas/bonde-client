import React, { Fragment } from 'react'
import { I18n } from 'react-i18next'
import { Grid, Cell, Panel } from 'bonde-styleguide'
import { Gadget, Queryset } from 'components'
import Loading from './Loading'
import trendingMobilizationsQuery from './query.graphql'
import PropTypes from 'prop-types'

const TrendingMobilizationsGadget = ({ mobilizations, loading }) => (
  <I18n ns='home'>
    {(t) => (
      <Gadget
        title={t('gadgets.trendingMobilizations.title')}
      >
        <Grid>
          {loading ? <Loading /> : mobilizations.map(({ node: mobilization }) => {
            return (
              <Fragment key={Math.random()}>
                <Cell size={[6, 6, 6, 12, 12, 12]}>
                  <Panel
                    image={mobilization.facebookShareImage}
                    title={mobilization.name}
                    author={`Por ${mobilization.community.name}`}
                    onClick={() => {
                      if (!mobilization.customDomain) {
                        const domain = process.env.REACT_APP_DOMAIN_PUBLIC || 'bonde.devel:5003'
                        const url = new URL(`http://${mobilization.slug}.${domain}`)
                        window.open(url, '_blank')
                      }

                      const url = new URL(`http://${mobilization.customDomain}`)
                      window.open(url, '_blank')
                    }}
                  />
                </Cell>
              </Fragment>
            )
          })}
        </Grid>
      </Gadget>
    )}
  </I18n>
)

TrendingMobilizationsGadget.propTypes = {
  mobilizations: PropTypes.any,
  loading: PropTypes.bool
}

const TrendingMobilizationsQueryset = () => (
  <Queryset
    limit={4}
    filter={{ days: 2 }}
    query={trendingMobilizationsQuery}
  >
    {({ data, loading }) => (
      <TrendingMobilizationsGadget
        mobilizations={data && data.trendingMobilizations ? data.trendingMobilizations.edges : undefined}
        loading={loading}
      />
    )}
  </Queryset>
)

export default TrendingMobilizationsQueryset
