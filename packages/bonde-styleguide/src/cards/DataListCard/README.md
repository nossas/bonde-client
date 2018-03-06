### Default text render

```js
<DataListCard
  title='Atividades recentes'
  fields={{ name: {}, email: {}, time: { align: 'left' } }}
  items={[
    {
      name: 'Susan Schwartz',
      email: 'george.lindgren@hotmail.com',
      time: '23/10 às 14h'
    },
    {
      name: 'Mattie Cunningham',
      email: 'graciela_rath@lakin.ca',
      time: '23/10 às 14h'
    },
    {
      name: 'Carrie Barton',
      email: 'abdiel.renner@jorge.biz',
      time: '23/10 às 14h'
    },
    {
      name: 'Jeff Rowe',
      email: 'elias_prosacco@boyle.com',
      time: '23/10 às 14h'
    },
    {
      name: 'Owen Padilla',
      email: 'ignatius.connelly@yahoo.com',
      time: '23/10 às 14h'
    }
  ]}
/>
```

### Custom field render

```js
<DataListCard
  title='Atividades recentes'
  border={false}
  fields={{
    image: {
      width: 40,
      render: (field) => (
        <Image
          src={field}
          height={40}
          rounded='50%'
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
  items={[
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
  ]}
/>
```
