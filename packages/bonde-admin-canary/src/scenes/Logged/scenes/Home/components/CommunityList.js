import React from 'react'
import { DataListCard, Image, Text } from 'bonde-styleguide'

const communities = [
  {
    image: 'https://goo.gl/nBC6NB',
    text: {
      title: 'Minha Sampa',
      description: 'Nós aproximamos os cidadãos das decisões que definem o rumo da cidade de São Paulo.'
    }
  },
  {
    image: 'https://goo.gl/nAtki5',
    text: {
      title: 'Meu Rio',
      description: 'Nós aproximamos os cidadãos das decisões que definem o rumo da cidade do Rio de Janeiro.'
    }
  },
  {
    image: 'https://goo.gl/8kqLZf',
    text: {
      title: 'CPI dos Ônibus pra valer',
      description: 'Prorrogar a CPI dos ônibus por mais quatro meses.'
    }
  }
]

const CommunityList = ({ t }) => (
  <DataListCard
    sectionTitle={t('my-communities')}
    border={false}
    fields={{
      image: {
        width: 40,
        render: (field) => (
          <Image
            src={field}
            width={40}
            height={40}
            rounded={40}
          />
        )
      },
      text: {
        render: (field) => {
          return (
            <React.Fragment>
              <Text fontSize={16} fontWeight={900} lineHeight={1.25}>{field.title}</Text>
              <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>{field.description}</Text>
            </React.Fragment>
          )
        }
      }
    }}
    items={communities}
  />
)

export default CommunityList
