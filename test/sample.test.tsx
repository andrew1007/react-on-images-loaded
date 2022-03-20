import React from 'react'
import OnImagesLoaded, { Props } from '../src/OnImagesLoaded'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

const sleep = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))
const successFn = jest.fn()
const failFn = jest.fn()
const updateFn = jest.fn()

const makeRender = (props: Props) => render(
    <OnImagesLoaded {...props} />
)

const Placeholder = () => <div data-testid="placeholder" />

const createImages = (count: number) => {
    return Array(count)
        .fill(null)
        .map((_, idx) => <img data-testid="img" key={Math.random()} src="" />)
}

describe('OnImagesLoaded', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe('events', () => {
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
            expect(successFn).toBeCalled()
        })

        it('invokes onTimeout and not onLoaded if an image fails to load', async () => {
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
                break
            }

            await sleep()
            expect(failFn).toBeCalled()
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
            expect(successFn).toBeCalled()
        })
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

    describe('adding images after mounting', () => {
        describe('does not have onUpdate prop', () => {
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
                expect(updateFn).not.toBeCalled()
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
                expect(updateFn).not.toBeCalled()
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
                expect(updateFn).not.toBeCalled()
            })
        })

        describe('has onUpdate prop', () => {
            it('invokes extra onUpdate when images are added', async () => {
                const originalImages = createImages(2)
                const originalProps: Props = {
                    onLoaded: successFn,
                    onUpdate: updateFn,
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
                expect(updateFn).toBeCalled()
            })
            it('invokes onUpdate when images are removed', async () => {
                const originalImages = createImages(2)
                const originalProps: Props = {
                    onLoaded: successFn,
                    onUpdate: updateFn,
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
                expect(updateFn).toBeCalled()
            })
            it('invokes onUpdate when images are removed and added', async () => {
                const originalImages = createImages(10)
                const originalProps: Props = {
                    onLoaded: successFn,
                    onUpdate: updateFn,
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
                expect(updateFn).toBeCalled()
            })
        })
    })
})
