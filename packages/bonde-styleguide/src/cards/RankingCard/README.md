```js
<RankingCard
  sectionTitle='Localização'
  alignItems='middle'
  trackColor='#eee'
  progressColor='#ee0099'
  maxValue={3000}
  items={[
    { label: 'São Paulo', value: 2361 },
    { label: 'Rio de Janeiro', value: 1522 },
    { label: 'Curitiba', value: 654 },
    { label: 'Recife', value: 322 }
  ]}
>
  <BrazilMap size={170} margin={{ left: 20 }} />
</RankingCard>
```

```js
<RankingCard
  sectionTitle='Top 5 Mobs'
  alignItems='end'
  items={[
    { label: 'Existe amor em SP', value: 2450 },
    { label: 'Somos toda Olga', value: 1602 },
    { label: 'Respeita as Mina', value: 967 },
    { label: 'Empodera!', value: 901 },
    { label: 'Sem FiuFiu', value: 610 }
  ]}
>
  <IconColorful name='mobilization' size={78} />
</RankingCard>
```
