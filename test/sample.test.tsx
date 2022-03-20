import React from 'react'
import OnImagesLoaded, { Props } from '../src/OnImagesLoaded'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

const sleep = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))
const successFn = jest.fn()
const failFn = jest.fn()

const makeRender = (props: Props) => render(
    <OnImagesLoaded {...props} />
)

const createImages = (count) => {
    Array(count)
        .fill(null)
}

describe('OnImagesLoaded', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('successfully invokes loading', async () => {
        const {
            getAllByTestId
        } = makeRender({
            onLoaded: successFn,
            onTimeout: failFn,
            placeholder: null,
            timeout: 200,
            children: [
                <img key={1} data-testid="img" src={''} />,
                <img key={2} data-testid="img" src={''} />,
            ]
        })
        for (const image of getAllByTestId('img')) {
            fireEvent.load(image)
        }

        await sleep()
        expect(successFn).toBeCalled()
    })

    it('invokes onTimeout and not onLoaded if an image fails to load', async () => {
        const {
            getAllByTestId
        } = makeRender({
            onLoaded: successFn,
            onTimeout: failFn,
            placeholder: null,
            timeout: 200,
            children: [
                <img data-testid="img" src={''} />,
                <img data-testid="img" src={''} />,
            ]
        })

        for (const image of getAllByTestId('img')) {
            fireEvent.load(image)
            break
        }

        await sleep()
        expect(failFn).toBeCalled()
        expect(successFn).not.toBeCalled()
    })

    it('invokes onLoaded if an image fails to load and no onTimeout is provided', async () => {
        const {
            getAllByTestId
        } = makeRender({
            onLoaded: successFn,
            placeholder: null,
            timeout: 200,
            children: [
                <img data-testid="img" src={''} />,
                <img data-testid="img" src={''} />,
            ]
        })

        const images = getAllByTestId('img')
        for (const image of images) {
            fireEvent.load(image)
            break
        }

        await sleep()
        expect(failFn).not.toBeCalled()
        expect(successFn).toBeCalled()
    })

    it('tests things', () => {
        const {
            getAllByTestId
        } = makeRender({
            onLoaded: successFn,
            placeholder: null,
            timeout: 200,
            children: [
                <img data-testid="img" src={''} />,
                <img data-testid="img" src={''} />,
            ]
        })
        const images = getAllByTestId('img')
        sleep()
    })
})