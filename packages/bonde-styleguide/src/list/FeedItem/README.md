```js
const now = new Date;
const sec = 1000;
const min = sec * 60;
const hour = min * 60;

<Feed>
  <FeedItem
    date={new Date}
    text='Juntos causamos mais! Por isso, o primeiro passo é criar uma comunidade. '
  />
  <FeedItem
    date={new Date(now - 1 * min)}
    text='Juntos causamos mais! Por isso, o primeiro passo é criar uma comunidade. '
  />
  <FeedItem
    date={new Date(now - 1 * hour)}
    text='Juntos causamos mais! Por isso, o primeiro passo é criar uma comunidade. '
  />
</Feed>
```
