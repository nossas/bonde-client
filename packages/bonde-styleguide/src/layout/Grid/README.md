The grid is defined in 12 columns. That wraps multiple `Cell` components.
`[1, 2, 3, 4, 6, 12]`

```js
<Grid>
  <Cell><Brick text='1' /></Cell>
  <Cell><Brick text='2' /></Cell>
  <Cell><Brick text='3' /></Cell>
  <Cell><Brick text='4' /></Cell>
  <Cell><Brick text='5' /></Cell>
  <Cell><Brick text='6' /></Cell>
  <Cell><Brick text='7' /></Cell>
  <Cell><Brick text='8' /></Cell>
  <Cell><Brick text='9' /></Cell>
  <Cell><Brick text='10' /></Cell>
  <Cell><Brick text='11' /></Cell>
  <Cell><Brick text='12' /></Cell>
</Grid>
```


### Grid - nested structure



```js
//
// Ancestral grid
//
<Grid style={{ border: '2px solid red' }}>
  <Cell>
    <Brick text='1' />
  </Cell>
  <Cell size={[8]}>
    <Text>Nested Grid</Text>
    <Grid style={{ border: '2px dashed green' }}>
      <Cell size={[6]}>
        <Brick text='8: 6' />
      </Cell>
      <Cell size={[3]}>
        <Brick text='8: 3' />
      </Cell>
      <Cell size={[3]}>
        <Brick text='8: 3' />
      </Cell>
    </Grid>
  </Cell>
  <Cell size={[3]}>
    <Brick text='3' />
  </Cell>
</Grid>
```
