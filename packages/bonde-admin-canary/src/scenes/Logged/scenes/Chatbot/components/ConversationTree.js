import React from 'react'
import Tree from 'react-d3-tree'
import { Card, Text } from 'bonde-styleguide'
import { CreateMessageModalForm } from './'


const conversationToTree = (edges) => edges.map(item => {
  if (item.node.children && item.node.children.edges.length > 0) {
    return { uuid: item.node.id, ...item.node, children: conversationToTree(item.node.children.edges)}
  }
  return { uuid: item.node.id, ...item.node } 
})


const NodeLabel = ({ className, nodeData }) => {
  return (
    <Card>
      <Text>{nodeData.text}</Text>
    </Card>
  )
}

export default class extends React.Component {
  state = {
    nodeData: undefined
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
        {this.state.nodeData !== undefined && (
          <CreateMessageModalForm
            workflow={workflow}
            nodeData={this.state.nodeData}
            onClose={() => this.setState({ nodeData: undefined })}
          />
        )}
        <Tree
          allowForeignObjects
          collapsible={false}
          data={conversationToTree(conversation)}
          nodeLabelComponent={{
            render: <NodeLabel />
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
