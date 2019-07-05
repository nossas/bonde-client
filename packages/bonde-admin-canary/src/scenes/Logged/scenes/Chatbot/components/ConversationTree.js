import React from 'react'
import Tree from 'react-d3-tree'
import { Card, Flexbox2 as Flexbox, Scrollbox, Icon, Text } from 'bonde-styleguide'
import { CreateMessageModalForm, DeleteMessageModal } from './'
import PropTypes from 'prop-types'

const conversationToTree = (edges) => edges.map(item => {
  if (item.node.children && item.node.children.edges.length > 0) {
    return { uuid: item.node.id, name: item.node.text, ...item.node, children: conversationToTree(item.node.children.edges) }
  }
  return { uuid: item.node.id, name: item.node.text, ...item.node }
})

const InsertButton = ({ onClick }) => {
  const wrapperStyles = {
    position: 'absolute',
    width: '30px',
    height: '30px',
    backgroundColor: '#e9578f',
    borderRadius: '50px',
    bottom: '-17px',
    right: '40px',
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

InsertButton.propTypes = {
  onClick: PropTypes.func
}

const DeleteButton = ({ onClick }) => {
  const wrapperStyles = {
    position: 'absolute',
    width: '30px',
    height: '30px',
    border: '2px solid #e9578f',
    borderRadius: '50px',
    top: '-15px',
    right: '40px',
    backgroundColor: 'white',
    strokeWidth: '0',
    padding: '4px',
    cursor: 'pointer'
  }
  return (
    <div style={wrapperStyles} onClick={onClick}>
      <Icon name='trash' size={18} color='#e9578f' />
    </div>
  )
}

DeleteButton.propTypes = {
  onClick: PropTypes.func
}

const SimpleNodeLabel = ({ nodeData, nodeDataSelected, onInsertClick, onDeleteClick }) => {
  /* let hasChildren = false
  let hasChildrenIsReply = false
  if (nodeData.children) {
    hasChildren = nodeData.children.length > 0
    hasChildrenIsReply = nodeData.children.filter(x => x.kind === 'quick_reply').length > 0
  } */
  const active = nodeDataSelected && nodeData.uuid === nodeDataSelected.uuid
  const fullProps = {
    rounded: '10px 10px 10px 0',
    border: active ? '2px solid #e9578f' : undefined
  }
  if (nodeData.kind === 'quick_reply') {
    fullProps.rounded = '15px'
    fullProps.border = active ? '2px solid #e9578f' : '2px solid #2f88e6'
    fullProps.color = '#2f88e6'
  }

  return (
    <Card margin='15px 10px 0 0' border={fullProps.border} rounded={fullProps.rounded}>
      <Flexbox padding={{ top: 10, left: 10 }} align='middle'>
        <Scrollbox height={100}>
          {nodeData.kind === 'gif' ? (
            <img src={nodeData.text} alt={`GIF: ${nodeData.text}`} />
          ) : (
            <Text fontSize={14} fontWeight={600} color={fullProps.color}>{nodeData.text}</Text>
          )}
        </Scrollbox>
      </Flexbox>
      {active && (
        <React.Fragment>
          <DeleteButton onClick={onDeleteClick} />
          <InsertButton onClick={onInsertClick} />
        </React.Fragment>
      )}
    </Card>
  )
}

SimpleNodeLabel.propTypes = {
  nodeData: PropTypes.shape({
    uuid: PropTypes.string,
    kind: PropTypes.string,
    text: PropTypes.string
  }),
  nodeDataSelected: PropTypes.shape({
    uuid: PropTypes.string
  }),
  onInsertClick: PropTypes.func,
  onDeleteClick: PropTypes.func
}

export default class ConversationTree extends React.Component {
  state = {
    nodeData: undefined,
    openInsertModal: false,
    openDeleteModal: false
  }

  componentDidMount () {
    const dimensions = this.treeContainer.getBoundingClientRect()
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 8
      }
    })
  }

  render () {
    const { conversation, campaign } = this.props

    const height = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight

    return (
      <div style={{ height: height ? height - 320 : '100px' }} ref={tc => { this.treeContainer = tc }}>
        {this.state.nodeData && this.state.openInsertModal && (
          <CreateMessageModalForm
            campaign={campaign}
            nodeData={this.state.nodeData}
            onClose={() => this.setState({ openInsertModal: false })}
          />
        )}
        {this.state.nodeData && this.state.openDeleteModal && (
          <DeleteMessageModal
            campaign={campaign}
            nodeData={this.state.nodeData}
            onClose={() => this.setState({ openDeleteModal: false })}
          />
        )}
        <Tree
          allowForeignObjects
          transitionDuration={0}
          collapsible={false}
          data={conversationToTree(conversation)}
          orientation='vertical'
          translate={this.state.translate}
          onClick={(nodeData) => this.setState({ nodeData })}
          nodeLabelComponent={{
            render: (
              <SimpleNodeLabel
                nodeDataSelected={this.state.nodeData}
                onDeleteClick={() => this.setState({ openDeleteModal: true })}
                onInsertClick={() => this.setState({ openInsertModal: true })}
              />
            ),
            foreignObjectWrapper: { height: 150, x: -58, y: -26 }
          }}
        />
      </div>
    )
  }
}

ConversationTree.propTypes = {
  conversation: PropTypes.array,
  campaign: PropTypes.any
}
