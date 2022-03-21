import React from 'react'
import OnImagesLoaded, { Props } from '../src/OnImagesLoaded'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

const sleep = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))
const successFn = jest.fn()

const makeRender = (props: Props) => render(
    <OnImagesLoaded {...props} />
)

const Placeholder = () => <div data-testid="placeholder" />

const createImages = (count: number) => {
    return Array(count)
        .fill(null)
        .map(() => <img data-testid="img" key={Math.random()} src="" />)
}

describe('OnImagesLoaded UI', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('placeholder', () => {
        it('renders placeholder during loading', () => {
            const {
                queryByTestId
            } = makeRender({
                onLoaded: successFn,
                placeholder: <Placeholder />,
                timeout: 200,
                children: createImages(2)
            })
            const placeholder = queryByTestId('placeholder')
            expect(placeholder).toBeTruthy()
        })

        it('does not render placeholder after loading is resolved', async () => {
            const {
                queryByTestId
            } = makeRender({
                onLoaded: successFn,
                placeholder: <Placeholder />,
                timeout: 200,
                children: createImages(2)
            })
            await sleep()
            const placeholder = queryByTestId('placeholder')
            expect(placeholder).toBeFalsy()
        })
    })
})
