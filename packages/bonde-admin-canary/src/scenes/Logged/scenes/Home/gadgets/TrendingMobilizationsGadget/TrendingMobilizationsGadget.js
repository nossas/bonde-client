import React from 'react'
import { I18n } from 'react-i18next'
import { Grid, Cell, Panel } from 'bonde-styleguide'
import { Gadget, Queryset } from 'components'
import Loading from './Loading'
import Filter from './Filter'
import trendingMobilizationsQuery from './query.graphql'

const TrendingMobilizationsGadget = ({ filter, onChangeFilter, mobilizations, loading }) => (
  <I18n ns='home'>
  {(t) => (
    <Gadget
      title={t('gadgets.trendingMobilizations.title')}
      renderFilter={() => <Filter filter={filter} onChange={onChangeFilter} />}
    >
      <Grid>
      {loading ? <Loading /> : mobilizations.map(mobilization => {
        return (
          <React.Fragment key={Math.random()}>
            <Cell size={[3, 3, 6, 12, 12, 12]}>
              <Panel
                image={mobilization.facebookShareImage}
                title={mobilization.name}
                description={mobilization.goal}
                author={mobilization.community.name}
                onClick={() => {
                  if (mobilization.customDomain) {
                    const url = new URL(`http://${mobilization.customDomain}`)
                    window.open(url, '_blank')
                  } else {
                    const domain = process.env.REACT_APP_DOMAIN_PUBLIC || 'bonde.devel:5003'
                    const url = new URL(`http://${mobilization.slug}.${domain}`)
                    window.open(url, '_blank')
                  }
                }}
              />
            </Cell>
          </React.Fragment>
        )
      })}
      </Grid>
    </Gadget>
  )}
  </I18n>
)

const TrendingMobilizationsQueryset = () => (
  <Queryset
    limit={4}
    filter={{ days: 2 }}
    query={trendingMobilizationsQuery}
  >
    {({ data, filter, onChangeFilter, loading }) => (
      <TrendingMobilizationsGadget
        filter={filter}
        onChangeFilter={onChangeFilter}
        mobilizations={data && data.trendingMobilizations ? data.trendingMobilizations.nodes : undefined}
        loading={loading}
      />
    )}
  </Queryset>
)

export default TrendingMobilizationsQueryset
