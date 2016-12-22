import { FETCH_BLOCKS, EDIT_BLOCK, REMOVE_BLOCK, MOVE_BLOCK_UP, MOVE_BLOCK_DOWN } from '../../constants/ActionTypes'
import * as BlockActions from './../../actions/BlockActions'
import $ from 'jquery'

describe('BlockActions', () => {
  describe('#fetchBlocks', () => {
    it('should GET blocks using correct URL and dispatch action', () => {
      const dispatch = sandbox.spy()
      BlockActions.fetchBlocks({ mobilization_id: 1 })(dispatch)
      const request = requests[0]
      const blocks = [{id: 1}, {id: 2}]
      expect(request.url).to.equal(`${process.env.API_URL}/mobilizations/1/blocks`)
      expect(request.method).to.equal('GET')
      request.respond(200, { "Content-Type": "application/json" }, JSON.stringify(blocks))
      expect(dispatch).to.have.been.calledWith({
        type: FETCH_BLOCKS,
        blocks
      })
    })
  })

  describe('#addBlock', () => {
    it('should POST block using correct URL transition to edit mobilization', () => {
      const dispatch = sandbox.spy()
      const router = { transitionTo() {} }
      const transitionToStub = sandbox.stub(router, 'transitionTo')
      const block = {
        bg_class: 'bg-test',
        widgets_attributes: [{kind: 'draft', size: 68}, {kind: 'draft', size: 69}]
      }
      BlockActions.addBlock({
        router,
        mobilization_id: 1,
        block
      })(dispatch)
      const request = requests[0]
      expect(request.url).to.equal(`${process.env.API_URL}/mobilizations/1/blocks`)
      expect(request.method).to.equal('POST')
      expect(request.requestBody).to.equal($.param({block: block}))
      request.respond(200)
      expect(transitionToStub).to.have.been.calledWith('/mobilizations/1/edit?newBlock=true')
    })
  })

  describe('#editBlock', () => {
    it('should PUT block using correct URL and dispatch action', () => {
      const dispatch = sandbox.spy()
      const block = {
        id: 2,
        bg_class: 'bg-test'
      }
      BlockActions.editBlock({
        mobilization_id: 1,
        block_id: 2,
        block
      })(dispatch)
      const request = requests[0]
      expect(request.url).to.equal(`${process.env.API_URL}/mobilizations/1/blocks/2`)
      expect(request.method).to.equal('PUT')
      expect(request.requestBody).to.equal($.param({block}))
      request.respond(200, { "Content-Type": "application/json" }, JSON.stringify(block))
      expect(dispatch).to.have.been.calledWith({
        type: EDIT_BLOCK,
        block
      })
    })
  })

  describe('#removeBlock', () => {
    it('should DELETE block using correct URL and dispatch action', () => {
      const dispatch = sandbox.spy()
      BlockActions.removeBlock({
        mobilization_id: 1,
        block_id: 2
      })(dispatch)
      const request = requests[0]
      expect(request.url).to.equal(`${process.env.API_URL}/mobilizations/1/blocks/2`)
      expect(request.method).to.equal('DELETE')
      expect(request.requestBody).to.be.null
      const block = {id: 2}
      request.respond(200, { "Content-Type": "application/json" }, JSON.stringify(block))
      expect(dispatch).to.have.been.calledWith({
        type: REMOVE_BLOCK,
        block
      })
    })
  })

  describe('#moveBlockUp', () => {
    it('should PUT block using correct URL and dispatch action', () => {
      const dispatch = sandbox.spy()
      const block1 = { id: 1, position: 3 }
      const block2 = { id: 2, position: 6 }
      const block3 = { id: 3, position: 9 }
      const blocks = {data: [block1, block2, block3]}
      BlockActions.moveBlockUp({
        mobilization_id: 1,
        blocks,
        block: block3
      })(dispatch)
      const request = requests[0]
      expect(request.url).to.equal(`${process.env.API_URL}/mobilizations/1/blocks/3`)
      expect(request.method).to.equal('PUT')
      expect(request.requestBody).to.equal($.param({block: {position: 6}}))
      const movedBlock = {...block3, position: 6}
      request.respond(200, { "Content-Type": "application/json" }, JSON.stringify(movedBlock))
      expect(dispatch).to.have.been.calledWith({
        type: MOVE_BLOCK_UP,
        block: movedBlock
      })
    })
  })

  describe('#moveBlockDown', () => {
    it('should PUT block using correct URL and dispatch action', () => {
      const dispatch = sandbox.spy()
      const block1 = { id: 1, position: 3 }
      const block2 = { id: 2, position: 6 }
      const block3 = { id: 3, position: 9 }
      const blocks = {data: [block1, block2, block3]}
      BlockActions.moveBlockDown({
        mobilization_id: 1,
        blocks,
        block: block2
      })(dispatch)
      const request = requests[0]
      expect(request.url).to.equal(`${process.env.API_URL}/mobilizations/1/blocks/2`)
      expect(request.method).to.equal('PUT')
      expect(request.requestBody).to.equal($.param({block: {position: 9}}))
      const movedBlock = {...block3, position: 9}
      request.respond(200, { "Content-Type": "application/json" }, JSON.stringify(movedBlock))
      expect(dispatch).to.have.been.calledWith({
        type: MOVE_BLOCK_DOWN,
        block: movedBlock
      })
    })
  })
})
