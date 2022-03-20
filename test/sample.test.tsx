import React from 'react'
import OnImagesLoaded from '../src/OnImagesLoaded'
import { mount } from 'enzyme'


describe('hello', () => {
    it('e', () => {
        const el = mount(<OnImagesLoaded 
            onLoaded={() => null}
            placeholder={null}
        />)
    })
})