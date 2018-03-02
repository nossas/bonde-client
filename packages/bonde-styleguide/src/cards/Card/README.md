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
  <Cell size={[6]}>
    <Card
      title='Treending mobs'
      minHeight={320}
    >
      <Image src='https://goo.gl/hggWmp' height={185} />
      <Container padding={{ x: 16, y: 14 }}>
        <Title.H3>Cinzas dos Muros</Title.H3>
        <Text
          fontSize={16}
          lineHeight={1.31}
          color='#4a4a4a'
          margin={{ y: 8 }}
        >
          Nossos muros têm voz, têm vida.
        </Text>
        <Text fontSize={13} lineHeight={1.85} color='#4a4a4a'>
          Por Minha Sampa
        </Text>
      </Container>
    </Card>
  </Cell>

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
      title='Localização'
      minHeight={274}
      middle
    >
      <Container padding={{ x: 24 }} horizontal center>
        <ProgressRanking
          trackColor='#eeeeee'
          color='#ee0099'
          maxValue={3000}
          width={110}
        >
          <ProgressRankingItem label='São Paulo' value={2361} />
          <ProgressRankingItem label='Rio de Janeiro' value={1522} />
          <ProgressRankingItem label='Curtiba' value={654} />
          <ProgressRankingItem label='Recife' value={322} />
        </ProgressRanking>
        <BrazilMap size={170} />
      </Container>
    </Card>
  </Cell>

  <Cell size={[6]}>
    <Card
      title='Top 5 Mobs'
      minHeight={274}
      middle
    >
      <Container padding={{ x: 27 }} horizontal bottom>
        <ProgressRanking
          trackColor='#fff'
          maxValue={2450}
          width={200}
        >
          <ProgressRankingItem label='Existe amor em SP' value={2450} />
          <ProgressRankingItem label='Somos toda Olga' value={1602} />
          <ProgressRankingItem label='Respeita as Mina' value={967} />
          <ProgressRankingItem label='Empodera!' value={901} />
          <ProgressRankingItem label='Sem FiuFiu' value={610} />
        </ProgressRanking>
        <IconColorful name='mobilization' size={78} />
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
