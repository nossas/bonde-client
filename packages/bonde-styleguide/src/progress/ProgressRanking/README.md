### ProgressRanking - Default


The `ProgressRanking` component sorts the child items ascendantly by default.

```js
<ProgressRanking>
  <ProgressRankingItem value={1602} label='Somos toda Olga' />
  <ProgressRankingItem value={2450} label='Existe Amor em SP' />
</ProgressRanking>
```


### ProgressRanking - `color`


```js
<ProgressRanking color='#C70038'>
  <ProgressRankingItem value={1602} label='Somos toda Olga' />
  <ProgressRankingItem value={2450} label='Existe Amor em SP' />
</ProgressRanking>
```


### ProgressRanking - `nosort`

```js
<ProgressRanking nosort>
  <ProgressRankingItem value={610} label='Sem FiuFiu' />
  <ProgressRankingItem value={1602} label='Somos toda Olga' />
  <ProgressRankingItem value={2450} label='Existe Amor em SP' />
  <ProgressRankingItem value={901} label='Empodera!' />
  <ProgressRankingItem value={967} label='Respeita as Mina' />
</ProgressRanking>
```


### ProgressRanking - `maxValue`


```js
<ProgressRanking maxValue={5000}>
  <ProgressRankingItem value={1602} label='Somos toda Olga' />
  <ProgressRankingItem value={2450} label='Existe Amor em SP' />
</ProgressRanking>
```
