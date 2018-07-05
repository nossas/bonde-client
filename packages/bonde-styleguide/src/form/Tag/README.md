```js
<Tag label='Tag' />
```


### Tag - `defaultChecked`


```js
const tags = [
  { id: 1, defaultChecked: false },
  { id: 2, defaultChecked: false },
  { id: 3, defaultChecked: true },
  { id: 4, defaultChecked: false },
  { id: 5, defaultChecked: true },
  { id: 6, defaultChecked: false }
];

<div>
  {tags.map(({ id, defaultChecked }) => (
    <Tag
      key={id}
      label={`Item ${id}`}
      name={`selectedTags[${id}]`}
      defaultChecked={defaultChecked}
    />
  ))}
</div>
```
