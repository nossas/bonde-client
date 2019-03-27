```js
class Controller extends React.Component {
  constructor(props) {
    super(props)
    this.state = { opened: false }
  }

  render() {
    return (
      <Flexbox>
        <Button onClick={() => this.setState({ opened: true })}>Abrir modal</Button>
        <Modal opened={this.state.opened} onClose={() => this.setState({ opened: false })}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus lacinia ultricies. Aliquam eu porttitor eros. Integer vitae porttitor ipsum. Curabitur ut ipsum in velit ornare feugiat. Phasellus non condimentum ex. Proin hendrerit faucibus dictum. Quisque condimentum tincidunt tortor, nec sodales nisi vulputate in. Donec pellentesque, leo in viverra blandit, felis risus tincidunt arcu, vel aliquam massa quam in enim. Phasellus vitae convallis erat. In cursus mi et urna ullamcorper imperdiet. Morbi pellentesque, dolor in aliquam placerat, mi lacus accumsan nibh, vel ultrices mi diam non nisi. Proin eros lacus, lobortis sed elementum at, efficitur vitae ex. Vivamus quam lacus, imperdiet vitae auctor a, varius nec sem. Nullam tincidunt, neque et interdum hendrerit, metus est hendrerit urna, quis consequat sem nibh ac orci. Proin dapibus hendrerit mauris, sed tincidunt urna rutrum et.</Text>
        </Modal>
      </Flexbox>
    )
  }
}

<Controller />
```