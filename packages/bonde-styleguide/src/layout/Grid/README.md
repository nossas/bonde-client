The grid is defined in 12 columns. That wraps multiple `Cell` components.
`[1, 2, 3, 4, 6, 12]`

```js
<Grid>
  <Cell><Text>1</Text></Cell>
  <Cell><Text>2</Text></Cell>
  <Cell><Text>3</Text></Cell>
  <Cell><Text>4</Text></Cell>
  <Cell><Text>5</Text></Cell>
  <Cell><Text>6</Text></Cell>
  <Cell><Text>7</Text></Cell>
  <Cell><Text>8</Text></Cell>
  <Cell><Text>9</Text></Cell>
  <Cell><Text>10</Text></Cell>
  <Cell><Text>11</Text></Cell>
  <Cell><Text>12</Text></Cell>
</Grid>
```


### Grid - nested structure



```js
//
// Ancestral grid
//
<Grid style={{ border: '2px solid red' }}>
  <Cell>
    <Text>1</Text>
  </Cell>
  <Cell size={[8]}>
    <Text>Nested Grid</Text>
    <Grid style={{ border: '2px dashed green' }}>
      <Cell size={[6]}>
        <Text>{`8: 6`}</Text>
      </Cell>
      <Cell size={[3]}>
        <Text>{`8: 3`}</Text>
      </Cell>
      <Cell size={[3]}>
        <Text>{`8: 3`}</Text>
      </Cell>
    </Grid>
  </Cell>
  <Cell size={[3]}>
    <Text>3</Text>
  </Cell>
</Grid>
```
