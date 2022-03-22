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

const NestedImageComponent: React.FC<{ size: number }> = (props) => {
    return (
        <div>
            {createImages(props.size)}
        </div>
    )
}

const createImages = (count: number) => {
    return Array(count)
        .fill(null)
        .map(() => <img data-testid="img" key={Math.random()} src="" />)
}

describe('OnImagesLoaded Events', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('base events', () => {
        it('successfully invokes loading', async () => {
            const {
                queryAllByTestId
            } = makeRender({
                onLoaded: successFn,
                onTimeout: failFn,
                placeholder: null,
                timeout: 200,
                children: createImages(2)
            })
            for (const image of queryAllByTestId('img')) {
                fireEvent.load(image)
            }

            await sleep()
            expect(successFn).toBeCalledTimes(1)
        })

        it('invokes onTimeout (and not onLoaded) if an image fails to load', async () => {
            const {
                queryAllByTestId
            } = makeRender({
                onLoaded: successFn,
                onTimeout: failFn,
                placeholder: null,
                timeout: 200,
                children: createImages(2)
            })

            // fire event for only one image
            fireEvent.load(queryAllByTestId('img')[0])

            await sleep()
            expect(failFn).toBeCalledTimes(1)
            expect(successFn).not.toBeCalled()
        })

        it('invokes onLoaded if an image fails to load and no onTimeout is provided', async () => {
            const {
                queryAllByTestId
            } = makeRender({
                onLoaded: successFn,
                placeholder: null,
                timeout: 200,
                children: createImages(2)
            })

            const images = queryAllByTestId('img')
            for (const image of images) {
                fireEvent.load(image)
                break
            }

            await sleep()
            expect(failFn).not.toBeCalled()
            expect(successFn).toBeCalledTimes(1)
        })

        it('invokes onTimeout (and not onLoaded) if images load too slowly', async () => {
            const {
                queryAllByTestId
            } = makeRender({
                onLoaded: successFn,
                onTimeout: failFn,
                placeholder: null,
                timeout: 200,
                children: createImages(2)
            })

            await sleep()

            for (const image of queryAllByTestId('img')) {
                fireEvent.load(image)
            }

            expect(failFn).toBeCalledTimes(1)
            expect(successFn).not.toBeCalled()
        })
    })

    describe('nested images', () => {
        it('finds images in nested components', async () => {
            const {
                queryAllByTestId
            } = makeRender({
                onLoaded: successFn,
                onTimeout: failFn,
                placeholder: null,
                timeout: 200,
                children: <NestedImageComponent size={20} />
            })
            for (const image of queryAllByTestId('img')) {
                fireEvent.load(image)
            }

            await sleep()
            expect(successFn).toBeCalledTimes(1)
        })

        it('does not succeed if images nested at any level do not load within timeout', async () => {
            const {
                queryAllByTestId
            } = makeRender({
                onLoaded: successFn,
                onTimeout: failFn,
                placeholder: null,
                timeout: 200,
                children: (
                    <div>
                        <NestedImageComponent size={20} />,
                        {createImages(2)}
                    </div>
                )
            })
            for (const image of queryAllByTestId('img').slice(0, 21)) {
                fireEvent.load(image)
            }

            await sleep()
            expect(failFn).toBeCalledTimes(1)
            expect(successFn).not.toBeCalled()
        })
    })
})
