```js
<ProgressBar value={10} />
```


### ProgressBar - `size` options


- `xsmall`
```js
<ProgressBar size='xsmall' value={55} />
```

- `small`
```js
<ProgressBar size='small' value={55} />
```

- `normal` **(Default)**
```js
<ProgressBar size='normal' value={55} />
```

- `large`
```js
<ProgressBar size='large' value={55} />
```

- `xlarge`
```js
<ProgressBar size='xlarge' value={55} />
```


### ProgressBar - `trackColor`


- with **hex**
```js
<ProgressBar value={30} trackColor='#561744' />
```

- with **rgba**
```js { "props": { "className": "transparent" } }
<ProgressBar value={30} trackColor='rgba(86,23,68,.6)' />
```


### ProgressBar - `thumbColor`


- with **hex**
```js
<ProgressBar value={30} thumbColor='#FEC300' />
```

- with **rgba**
```js
<ProgressBar value={30} thumbColor='rgba(254,195,0,.7)' trackColor='#561744' />
```


### ProgressBar - `textColor`


```js
<ProgressBar value={30} thumbColor='#333333' textColor='#FFFFFF' />
```
