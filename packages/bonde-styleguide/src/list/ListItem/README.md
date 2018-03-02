The label and description of the list item are truncated in a single line.

```js
const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Et ais, si una littera commota sit, fore tota ut labet disciplina. Nam illud quidem adduci vix possum, ut ea, quae senserit ille, tibi non vera videantur.';

<ListItem
  label={longText}
  description={longText}
/>
```


### ListItem - `noavatar`


```js
<ListItem
  label='Minha Sampa'
  description='Nós aproximamos os cidadãos das decisões que definem o rumo da cidade de São Paulo.'
  noavatar
/>
```


### ListItem - `onClick`


```js
<ListItem
  label='Minha Sampa'
  description='Nós aproximamos os cidadãos das decisões que definem o rumo da cidade de São Paulo.'
  onClick={() => alert('ListItem was clicked!')}
/>
```


### ListItem - `href` and `target`


```js
<ListItem
  label='Minha Sampa'
  description='Nós aproximamos os cidadãos das decisões que definem o rumo da cidade de São Paulo.'
  href='https://app.bonde.org'
  target='_blank'
/>
```


### ListItem - `LinkComponent`


```js
const CustomLink = ({ children }) => (
  <div style={{ backgroundColor: '#40B4E5', padding: '1rem' }}>
    {children}
  </div>
);

<ListItem
  label='Minha Sampa'
  description='Nós aproximamos os cidadãos das decisões que definem o rumo da cidade de São Paulo.'
  LinkComponent={CustomLink}
/>
```
