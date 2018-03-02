The `Cell` component works only together with `Grid` component.

```js
<Grid>
  <Cell
    size={[
      // From top to bottom, the values of array of size property are:
      3,  // for @media (min-width: 1281px)
      3,  // for @media (min-width: 1025px)
      6,  // for @media (min-width: 801px)
      6,  // for @media (min-width: 600px)
      12, // for @media (min-width: 480px)
      12  // for @media (min-width: 320px)
    ]}
  >
    <Brick text='[3,3,6,6,12,12]' />
  </Cell>
  <Cell size={[6,6,10,10,12,12]}>
    <Brick text='[6,6,10,10,12,12]' />
  </Cell>
</Grid>
```

You can keep the default values, changing only the media query you desire. For example,
I want to change only the cell size when window width is between 480px and 600px:
**(Resize the window to see.)**

```js
<Grid>
  <Cell size={[null, null, null, 8]}>
    <Brick text='example' />
  </Cell>
  <Cell>
    <Brick text='default' />
  </Cell>
</Grid>
```
