import React from 'react'
import { DataListCard, Image, Text, Icon, Pagination } from 'bonde-styleguide'

const mobilizations = [
  {
    image: 'https://goo.gl/JFHz3h',
    title: 'SParaMulheres',
    community: 'Minha Sampa',
    status: 'active',
    actionsCount: 16320,
  },
  {
    image: 'https://goo.gl/FnqZWj',
    title: 'Ilumina SP',
    community: 'Minha Sampa',
    status: 'draft',
    actionsCount: 0,
  },
  {
    image: 'https://goo.gl/RJZTGF',
    title: 'Heróis Invisíveis',
    community: 'Minha Sampa',
    status: 'active',
    actionsCount: 974,
  },
  {
    image: 'https://goo.gl/2ygft6',
    title: 'Queima de Arquivo',
    community: 'Minha Sampa',
    status: 'active',
    actionsCount: 2453,
  },
  {
    image: 'https://goo.gl/3Chgix',
    title: 'Paulista Aberta',
    community: 'Minha Sampa',
    status: 'draft',
    actionsCount: 0,
  }
]

const MobilizationList = ({ t }) => {
  const statuses = {
    active: {
      label: t('active'),
      props: { color: '#50e3c2', fontWeight: 'bold' },
    },
    draft: {
      label: t('draft'),
      props: { color: '#aaaaaa', fontWeight: 'normal' },
    },
  }

  return (
    <DataListCard
      sectionTitle={t('my-mobilizations')}
      Footer={() => <Pagination pages={4} />}
      fields={{
        image: {
          width: 40,
          render: image => (
            <Image src={image} width={40} height={40} rounded={40} />
          )
        },
        title: {
          render: title => (
            <Text fontSize={16} fontWeight={900} lineHeight={1.25}>
              {title}
            </Text>
          )
        },
        community: {
          render: community => (
            <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
              {community}
            </Text>
          )
        },
        status: {
          render: status => (
            <Text
              fontSize={13}
              lineHeight={1.54}
              {...statuses[status].props}
            >
              {status === 'active' && <Icon name='tick' color='#50e3c2' margin='0 5px 0 0' />}
              {statuses[status].label}
            </Text>
          )
        },
        actionsCount: {
          render: count => (
            <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
              {count || '—'}
            </Text>
          )
        },
        redir: {
          align: 'right',
          render: () => (
            <Icon name='angle-right' />
          )
        }
      }}
      items={mobilizations}
    />
  )
}

export default MobilizationList
