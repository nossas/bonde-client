```js
<Tag text='Tag' />
```


### Tag - `checked`


```js
const tags = [
  { id: 1, checked: false },
  { id: 2, checked: false },
  { id: 3, checked: true },
  { id: 4, checked: false },
  { id: 5, checked: true },
  { id: 6, checked: false }
];

<div>
  {tags.map(({ id, checked }) => (
    <Tag
      key={id}
      text={`Item ${id}`}
      name={`selectedTags[${id}]`}
      checked={checked}
    />
  ))}
</div>
```
