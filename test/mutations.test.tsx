import React from 'react'
import OnImagesLoaded, { Props } from '../src/OnImagesLoaded'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

const sleep = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))
const successFn = jest.fn()
const updateStartFn = jest.fn()
const updateEndFn = jest.fn()

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

const Placeholder = () => <div data-testid="placeholder" />

describe('Mutations', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('does not have onUpdate props', () => {
        it('appends extra images with no special behavior', async () => {
            const originalImages = createImages(2)
            const originalProps: Props = {
                onLoaded: successFn,
                placeholder: <Placeholder />,
                timeout: 200,
                children: originalImages
            }
            const {
                rerender,
            } = makeRender(originalProps)

            await sleep()

            const newImages = createImages(2)
            const nextProps = {
                ...originalProps,
                children: [...originalImages, ...newImages]
            }
            rerender(<OnImagesLoaded {...nextProps} />)

            expect(updateStartFn).not.toBeCalled()
        })

        it('removes images with no special behavior', async () => {
            const originalImages = createImages(2)
            const originalProps: Props = {
                onLoaded: successFn,
                placeholder: <Placeholder />,
                timeout: 200,
                children: originalImages
            }
            const {
                rerender,
            } = makeRender(originalProps)

            await sleep()

            const nextProps = {
                ...originalProps,
                children: originalImages.slice(0, 1)
            }
            rerender(<OnImagesLoaded {...nextProps} />)
            expect(updateStartFn).not.toBeCalled()
            expect(updateEndFn).not.toBeCalled()
        })

        it('removes and adds images with no special behavior', async () => {
            const originalImages = createImages(10)
            const originalProps: Props = {
                onLoaded: successFn,
                placeholder: <Placeholder />,
                timeout: 200,
                children: originalImages
            }
            const {
                rerender,
            } = makeRender(originalProps)
            await sleep()
            const newImages = createImages(2)
            const nextProps = {
                ...originalProps,
                children: [...originalImages.slice(0, 2), ...newImages]
            }
            rerender(<OnImagesLoaded {...nextProps} />)
            expect(updateStartFn).not.toBeCalled()
            expect(updateEndFn).not.toBeCalled()
        })
    })

    describe('has mutation listener props', () => {
        it('invokes extra onUpdateStart and onUpdateEnd when images are added', async () => {
            const originalImages = createImages(2)
            const originalProps: Props = {
                onLoaded: successFn,
                onUpdateStart: updateStartFn,
                onUpdateEnd: updateEndFn,
                placeholder: <Placeholder />,
                timeout: 200,
                children: originalImages
            }
            const {
                rerender,
                queryAllByTestId
            } = makeRender(originalProps)

            await sleep()

            const newImages = createImages(2)
            const nextProps = {
                ...originalProps,
                children: [...originalImages, ...newImages]
            }
            rerender(<OnImagesLoaded {...nextProps} />)

            await sleep()

            const next = queryAllByTestId('img').slice(-2)
            for (const image of next) {
                fireEvent.load(image)
            }

            await sleep()

            expect(updateStartFn).toBeCalledTimes(1)
            expect(updateEndFn).not.toBeCalled()
        })

        it('invokes multiple times when images are added in batches', async () => {
            const originalImages = createImages(2)
            const originalProps: Props = {
                onLoaded: successFn,
                onUpdateStart: updateStartFn,
                onUpdateEnd: updateEndFn,
                timeout: 200,
                children: originalImages
            }
            const {
                rerender,
                queryAllByTestId
            } = makeRender(originalProps)

            await sleep()

            const newImages = createImages(2)
            const nextProps = {
                ...originalProps,
                children: [...originalImages, ...newImages]
            }
            rerender(<OnImagesLoaded {...nextProps} />)

            await sleep()

            for (const image of queryAllByTestId('img').slice(-2)) {
                fireEvent.load(image)
            }

            await sleep()

            const newNextImage = createImages(2)
            const newNextProps = {
                ...nextProps,
                children: [...nextProps.children, ...newNextImage]
            }

            rerender(<OnImagesLoaded {...newNextProps} />)

            expect(updateStartFn).toBeCalledTimes(2)

            await sleep()

            for (const image of queryAllByTestId('img')) {
                fireEvent.load(image)
            }

            expect(updateEndFn).toBeCalledTimes(2)
        })

        it('invokes onUpdateStart when images are removed', async () => {
            const originalImages = createImages(5)
            const originalProps: Props = {
                onLoaded: successFn,
                onUpdateStart: updateStartFn,
                placeholder: <Placeholder />,
                timeout: 200,
                children: originalImages
            }
            const {
                rerender,
            } = makeRender(originalProps)

            await sleep()

            const nextProps = {
                ...originalProps,
                children: originalImages.slice(0, 3)
            }

            rerender(<OnImagesLoaded {...nextProps} />)

            expect(updateStartFn).toBeCalledTimes(1)
        })

        it('invokes onUpdateStart and End when images are removed and added', async () => {
            const originalImages = createImages(10)
            const originalProps: Props = {
                onLoaded: successFn,
                onUpdateStart: updateStartFn,
                onUpdateEnd: updateEndFn,
                placeholder: <Placeholder />,
                timeout: 200,
                children: originalImages
            }
            const {
                rerender,
                queryAllByTestId
            } = makeRender(originalProps)

            await sleep()

            const newImages = createImages(2)
            const nextProps = {
                ...originalProps,
                children: [...originalImages.slice(0, 2), ...newImages]
            }

            rerender(<OnImagesLoaded {...nextProps} />)

            expect(updateStartFn).toBeCalledTimes(1)

            await sleep()

            const images = queryAllByTestId('img')
            for (const image of images.slice(-2)) {
                fireEvent.load(image)
            }

            await sleep()

            expect(updateEndFn).toBeCalledTimes(1)
        })
    })
})