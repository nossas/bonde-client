import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import BlockChangeBackground from '~client/mobrender/components/block-change-background'

describe('~client/mobrender/components/block-change-background', () => {
  let changeBackground
  const props = {
    block: { id: 1, bg_class: 'bg-1', bg_image: 'tmp://bg.png' }
  }

  beforeEach(() => {
    changeBackground = mount(<BlockChangeBackground {...props} />)
  })

  it('should render without crashed', () => {
    expect(changeBackground).to.be.ok
  })

  it('should render block-color-picker and file-uploader', () => {
    expect(changeBackground.find('BasicColorPicker').length).to.equal(1)
    expect(changeBackground.find('FileUploader').length).to.equal(1)
  })

  describe('render color picker', () => {
    it('should pass block.bg_class to selected in color-picker', () => {
      const colorPicker = changeBackground.find('BasicColorPicker')
      expect(colorPicker.props().selected).to.equal(props.block.bg_class)
    })

    it('should call onChangeBackground with block updated when click color-picker', () => {
      let result
      changeBackground.setProps({ onChangeBackground: block => result = block })
      const item = changeBackground.find('BasicColorPickerItem').at(1)
      item.props().onSelectColor(item.props().color)
      expect(result).to.deep.equal({...props.block,
        bg_class: item.props().color
      })
    })
  })

  describe('render file uploader', () => {
    it('should pass block.bg_image to file in file-uploader', () => {
      const uploader = changeBackground.find('FileUploader')
      expect(uploader.props().file).to.equal(props.block.bg_image)
    })

    it('should call onChangeBackground when onRemove is called', () => {
      let result
      changeBackground.setProps({ onChangeBackground: block => result = block })
      changeBackground.find('FileUploader').props().onRemove()
      expect(result).to.deep.equal({...props.block,
        bg_image: undefined
      })
    })

    it('should call onChangeBackground and uploadFile("bgBlock") when onFinish is called', () => {
      let result
      let resultProgress
      changeBackground.setProps({
        onChangeBackground: block => result = block,
        onUploadFile: key => resultProgress = key
      })
      const newBgFile = 'tmp://new-bg.png'
      changeBackground.find('FileUploader').props().onFinish(newBgFile)
      expect(result).to.deep.equal({...props.block,
        bg_image: newBgFile
      })
      expect(resultProgress).to.equal('bgBlock')
    })

    it('should pass progress to file uploader', () => {
      changeBackground.setProps({ progress: 25 })
      const result = changeBackground.find('FileUploader').props().progress
      expect(result).to.equal(25)
    })

    it('should call onUploadFile("bgBlock", progres) while loading', () => {
      let result
      changeBackground.setProps({ onUploadFile: (key, progress) => result = {key, progress} })
      changeBackground.find('FileUploader').props().onProgress(59)
      expect(result).to.deep.equal({ key: 'bgBlock', progress: 59 })
    })
  })

  describe('render navbar', () => {
    const saveClassName = 'btn caps bg-darken-4 white rounded mr1'
    const cancelClassName = 'btn caps bg-darken-4 white rounded'

    it('should has custom style for render to top', () => {
      const main = changeBackground.find('div').at(0)
      expect(main.props().className).to.contains('absolute col-12 top-0 z5')
    })

    it('should render div wrapper to cancel edit when clicked out navbar', () => {
      const wrapper = changeBackground.find('div.fixed')
      expect(wrapper.props().className).to.contains('fixed top-0 right-0 bottom-0 left-0 z4')
    })

    it('should call onCancelEdit when clicked in wrapper', () => {
      let result
      changeBackground.setProps({ onCancelEdit: block => result = block })
      const wrapper = changeBackground.find('div.fixed')
      wrapper.simulate('click')
      expect(result).to.deep.equal(props.block)
    })

    it('should render buttons to save and cancel edition', () => {
      expect(changeBackground.find('.save-btn').length).to.equal(1)
      const saveButton = changeBackground.find('.save-btn')
      expect(saveButton.text()).to.equal('Salvar')

      expect(changeBackground.find('.cancel-btn').length).to.equal(1)
      const cancelButton = changeBackground.find('.cancel-btn')
      expect(cancelButton.text()).to.equal('Cancelar')
    })

    it('should call update when click in save button', () => {
      let result
      changeBackground.setProps({ update: block => result = block })
      changeBackground.find('.save-btn').simulate('click')
      expect(result).to.deep.equal(props.block)
    })

    it('should call onCancelEdit when click in cancel button', () => {
      let result
      changeBackground.setProps({ onCancelEdit: block => result = block })
      changeBackground.find('.cancel-btn').simulate('click')
      expect(result).to.deep.equal(props.block)
    })

    it('should disable save button when upload in progress', () => {
      changeBackground.setProps({ progress: 10 })
      expect(changeBackground.find('.save-btn').props().disabled).to.equal(true)
    })
  })
})
