```js { "props": { "className": "noborder" } }
<Grid>
  <Cell size={[6]}>
    <Card title='Minhas comunidades' minHeight={274} middle>
      <Container padding={{ x: 82 }} vertical center>
        <IconColorful name='community' size={80} />
        <Title.H3 margin={{ top: 10, bottom: 22 }} align='center'>
          Se juntos já causam, imagina juntos.
        </Title.H3>
        <Button>Criar comunidade</Button>
      </Container>
    </Card>
  </Cell>

  <Cell size={[6]}>
    <Card title='Notificações' minHeight={274}>
      <ScrollBox>
        <Feed>
          <FeedItem
            date={new Date}
            text='Juntos causamos mais! Por isso, o primeiro passo é criar uma comunidade.'
          />
          <FeedItem
            date={new Date().setMinutes(new Date().getMinutes() - 1)}
            text={
              'Esse é seu Bonde, Maria! Bem-vinda! Qualquer dúvida é só clicar em ' +
              '"ajuda eu" ali embaixo. #tamojunto'
            }
          />
        </Feed>
      </ScrollBox>
    </Card>
  </Cell>
</Grid>
```

```js { "props": { "className": "noborder" } }
<Grid>
  <Cell size={[3]}>
    <Card
      title='Pressões'
      minHeight={110}
      bottom
    >
      <Container padding={{ y: 14, x: 19 }}>
        <Number
          icon={<IconColorful name='greeting' />}
          value={34}
        />
      </Container>
    </Card>
  </Cell>
</Grid>
```

```js { "props": { "className": "noborder" } }
<Grid>
  <Cell size={[6]}>
    <Card
      title='Atividades recentes'
      minHeight={274}
    >
      <ScrollBox>
        <DataList border>
          <DataListRow>
            <DataListCol>
              <Text fontSize={14}>Susan Schwartz</Text>
            </DataListCol>
            <DataListCol>
              <Text fontSize={14}>george.lindgren@hotmail.com</Text>
            </DataListCol>
            <DataListCol align='left'>
              <Text fontSize={14}>{`23/10 às 14h`}</Text>
            </DataListCol>
          </DataListRow>
          <DataListRow>
            <DataListCol>
              <Text fontSize={14}>Mattie Cunningham</Text>
            </DataListCol>
            <DataListCol>
              <Text fontSize={14}>graciela_rath@lakin.ca</Text>
            </DataListCol>
            <DataListCol align='left'>
              <Text fontSize={14}>{`23/10 às 14h`}</Text>
            </DataListCol>
          </DataListRow>
          <DataListRow>
            <DataListCol>
              <Text fontSize={14}>Carrie Barton</Text>
            </DataListCol>
            <DataListCol>
              <Text fontSize={14}>abdiel.renner@jorge.biz</Text>
            </DataListCol>
            <DataListCol align='left'>
              <Text fontSize={14}>{`23/10 às 14h`}</Text>
            </DataListCol>
          </DataListRow>
          <DataListRow>
            <DataListCol>
              <Text fontSize={14}>Jeff Rowe</Text>
            </DataListCol>
            <DataListCol>
              <Text fontSize={14}>elias_prosacco@boyle.com</Text>
            </DataListCol>
            <DataListCol align='left'>
              <Text fontSize={14}>{`23/10 às 14h`}</Text>
            </DataListCol>
          </DataListRow>
          <DataListRow>
            <DataListCol>
              <Text fontSize={14}>Owen Padilla</Text>
            </DataListCol>
            <DataListCol>
              <Text fontSize={14}>ignatius.connelly@yahoo.com</Text>
            </DataListCol>
            <DataListCol align='left'>
              <Text fontSize={14}>{`23/10 às 14h`}</Text>
            </DataListCol>
          </DataListRow>
        </DataList>
      </ScrollBox>
      <Container right padding={{ top: 9, bottom: 17, right: 26 }}>
        <LinkShowAll>Ver todos</LinkShowAll>
      </Container>
    </Card>
  </Cell>

  <Cell size={[6]}>
    <Card
      title='Minhas mobilizações'
      minHeight={250}
    >
      <ScrollBox>
        <DataList>
          <DataListRow>
            <DataListCol width={40}>
              <Image
                src='https://goo.gl/f8fg1R'
                height={40}
                rounded='50%'
              />
            </DataListCol>
            <DataListCol>
              <Text fontSize={16} fontWeight={900} lineHeight={1.25}>
                Respeita as mina
              </Text>
              <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
                Pressão
              </Text>
            </DataListCol>
          </DataListRow>
          <DataListRow>
            <DataListCol width={40}>
              <Image
                src='https://goo.gl/f8fg1R'
                height={40}
                rounded='50%'
              />
            </DataListCol>
            <DataListCol>
              <Text fontSize={16} fontWeight={900} lineHeight={1.25}>
                Somos todas Olgas
              </Text>
              <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
                Voluntários
              </Text>
            </DataListCol>
          </DataListRow>
          <DataListRow>
            <DataListCol width={40}>
              <Image
                src='https://goo.gl/f8fg1R'
                height={40}
                rounded='50%'
              />
            </DataListCol>
            <DataListCol>
              <Text fontSize={16} fontWeight={900} lineHeight={1.25}>
                Empodera!
              </Text>
              <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
                Divulgação
              </Text>
            </DataListCol>
          </DataListRow>
          <DataListRow>
            <DataListCol width={40}>
              <Image
                src='https://goo.gl/f8fg1R'
                height={40}
                rounded='50%'
              />
            </DataListCol>
            <DataListCol>
              <Text fontSize={16} fontWeight={900} lineHeight={1.25}>
                Existe amor em SP
              </Text>
              <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
                Voluntários
              </Text>
            </DataListCol>
          </DataListRow>
        </DataList>
      </ScrollBox>
    </Card>
  </Cell>
</Grid>
