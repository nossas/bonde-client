import React from 'react'
import Tree from 'react-d3-tree'
import { Card, Flexbox2 as Flexbox, Icon, Text } from 'bonde-styleguide'
import { CreateMessageModalForm } from './'


const conversationToTree = (edges) => edges.map(item => {
  if (item.node.children && item.node.children.edges.length > 0) {
    return { uuid: item.node.id, ...item.node, children: conversationToTree(item.node.children.edges)}
  }
  return { uuid: item.node.id, ...item.node } 
})


const InsertButton = ({ onClick }) => {
  const wrapperStyles = {
    position: 'absolute',
    width: '30px',
    height: '30px',
    backgroundColor: '#e9578f',
    borderRadius: '50px',
    bottom: '-17px',
    right: '74px',
    cursor: 'pointer'
  }
  const plusStyles = {
    fontSize: '26px',
    fontWeight: '300',
    color: 'white',
    textAlign: 'center'
  }
  return (
    <div style={wrapperStyles} onClick={onClick}>
      <p style={plusStyles}>+</p>
    </div>
  )
}

const DeleteButton = () => {
  const wrapperStyles = {
    position: 'absolute',
    width: '30px',
    height: '30px',
    border: '2px solid #e9578f',
    borderRadius: '50px',
    top: '-10px',
    right: '-10px',
    backgroundColor: 'white',
    strokeWidth: '0',
    padding: '4px'
  }
  return (
    <div style={wrapperStyles}>
      <Icon name='trash' size={18} color='#e9578f' />
    </div>
  ) 
}


const NodeLabel = ({ className, nodeData, nodeDataSelected, onInsertClick }) => {
  const active = nodeDataSelected && nodeData.uuid === nodeDataSelected.uuid
  const fullProps = {
    rounded: '10px 10px 10px 0',
    border: active ? '2px solid #e9578f' : undefined
  }
  if (nodeData.action === 'quick_reply') {
    fullProps.rounded = '15px'
    fullProps.border = active ? '2px solid #e9578f' : '2px solid #2f88e6'
    fullProps.color = '#2f88e6'
  }
  return (
    <Card width='190px' margin='10px 10px 0 0' border={fullProps.border} rounded={fullProps.rounded}>
      <Flexbox padding={{x: 10, y: 10}} align='middle'>
        <Text fontSize={14} fontWeight={600} color={fullProps.color}>{nodeData.text}</Text>
      </Flexbox>
      {active && <DeleteButton />}
      {active && <InsertButton onClick={onInsertClick} />}
    </Card>
  )
}

export default class extends React.Component {
  state = {
    nodeData: undefined,
    openModal: false
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect()
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 8
      }
    })
  }

  render() {
    const { conversation, workflow } = this.props

    const height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight

    return (
      <div style={{height: height ? height - 320 : '100px'}} ref={tc => this.treeContainer = tc}>
        {this.state.nodeData && this.state.openModal && (
          <CreateMessageModalForm
            workflow={workflow}
            nodeData={this.state.nodeData}
            onClose={() => this.setState({ openModal: false })}
          />
        )}
        <Tree
          allowForeignObjects
          transitionDuration={0}
          collapsible={false}
          data={conversationToTree(conversation)}
          nodeLabelComponent={{
            render: (
              <NodeLabel
                nodeDataSelected={this.state.nodeData}
                onInsertClick={() => this.setState({ openModal: true })} />
            ),
            foreignObjectWrapper: { width: 200, height: 300, x: -100, y: -15 }
          }}
          onClick={(nodeData, evt) => {
            this.setState({ nodeData })
          }}
          orientation='vertical'
          translate={this.state.translate}
        />
      </div>
    )
  }
}