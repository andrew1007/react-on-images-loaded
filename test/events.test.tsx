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

    // describe('adding images after mounting', () => {
    //     describe('does not have onUpdate prop', () => {
    //         it('appends extra images with no special behavior', async () => {
    //             const originalImages = createImages(2)
    //             const originalProps: Props = {
    //                 onLoaded: successFn,
    //                 placeholder: <Placeholder />,
    //                 timeout: 200,
    //                 children: originalImages
    //             }
    //             const {
    //                 rerender,
    //                 queryAllByTestId
    //             } = makeRender(originalProps)

    //             await sleep()

    //             const newImages = createImages(2)
    //             const nextProps = {
    //                 ...originalProps,
    //                 children: [...originalImages, ...newImages]
    //             }
    //             rerender(<OnImagesLoaded {...nextProps} />)

    //             expect(updateFn).not.toBeCalled()
    //         })
    //         it('removes images with no special behavior', async () => {
    //             const originalImages = createImages(2)
    //             const originalProps: Props = {
    //                 onLoaded: successFn,
    //                 placeholder: <Placeholder />,
    //                 timeout: 200,
    //                 children: originalImages
    //             }
    //             const {
    //                 rerender,
    //             } = makeRender(originalProps)

    //             await sleep()

    //             const nextProps = {
    //                 ...originalProps,
    //                 children: originalImages.slice(0, 1)
    //             }
    //             rerender(<OnImagesLoaded {...nextProps} />)
    //             expect(updateFn).not.toBeCalled()
    //         })
    //         it('removes and adds images with no special behavior', async () => {
    //             const originalImages = createImages(10)
    //             const originalProps: Props = {
    //                 onLoaded: successFn,
    //                 placeholder: <Placeholder />,
    //                 timeout: 200,
    //                 children: originalImages
    //             }
    //             const {
    //                 rerender,
    //             } = makeRender(originalProps)
    //             await sleep()
    //             const newImages = createImages(2)
    //             const nextProps = {
    //                 ...originalProps,
    //                 children: [...originalImages.slice(0, 2), ...newImages]
    //             }
    //             rerender(<OnImagesLoaded {...nextProps} />)
    //             expect(updateFn).not.toBeCalled()
    //         })
    //     })

    //     describe('has onUpdate prop', () => {
    //         it('invokes extra onUpdate when images are added', async () => {
    //             const originalImages = createImages(2)
    //             const originalProps: Props = {
    //                 onLoaded: successFn,
    //                 onUpdate: updateFn,
    //                 placeholder: <Placeholder />,
    //                 timeout: 200,
    //                 children: originalImages
    //             }
    //             const {
    //                 rerender,
    //                 queryAllByTestId
    //             } = makeRender(originalProps)

    //             await sleep()

    //             const newImages = createImages(2)
    //             const nextProps = {
    //                 ...originalProps,
    //                 children: [...originalImages, ...newImages]
    //             }
    //             rerender(<OnImagesLoaded {...nextProps} />)

    //             await sleep()

    //             const next = queryAllByTestId('img')
    //             for (const image of next) {
    //                 fireEvent.load(image)
    //             }

    //             await sleep()

    //             expect(updateFn).toBeCalledTimes(1)
    //         })

    //         it('invokes multiple times when images are added in batches', async () => {
    //             const originalImages = createImages(2)
    //             const originalProps: Props = {
    //                 onLoaded: successFn,
    //                 onUpdate: updateFn,
    //                 placeholder: <Placeholder />,
    //                 timeout: 200,
    //                 children: originalImages
    //             }
    //             const {
    //                 rerender,
    //                 queryAllByTestId
    //             } = makeRender(originalProps)

    //             await sleep()

    //             const newImages = createImages(2)
    //             const nextProps = {
    //                 ...originalProps,
    //                 children: [...originalImages, ...newImages]
    //             }
    //             rerender(<OnImagesLoaded {...nextProps} />)

    //             await sleep()

    //             for (const image of queryAllByTestId('img')) {
    //                 fireEvent.load(image)
    //             }

    //             await sleep()

    //             const newNextImage = createImages(2)
    //             const newNextProps = {
    //                 ...nextProps,
    //                 children: [...nextProps.children, ...newNextImage]
    //             }

    //             rerender(<OnImagesLoaded {...newNextProps} />)
    //             await sleep()

    //             for (const image of queryAllByTestId('img')) {
    //                 fireEvent.load(image)
    //             }

    //             expect(updateFn).toBeCalledTimes(2)
    //         })

    //         xit('invokes onUpdate when images are removed', async () => {
    //             const originalImages = createImages(2)
    //             const originalProps: Props = {
    //                 onLoaded: successFn,
    //                 onUpdate: updateFn,
    //                 placeholder: <Placeholder />,
    //                 timeout: 200,
    //                 children: originalImages
    //             }
    //             const {
    //                 rerender,
    //             } = makeRender(originalProps)

    //             await sleep()

    //             const nextProps = {
    //                 ...originalProps,
    //                 children: originalImages.slice(0, 1)
    //             }
    //             rerender(<OnImagesLoaded {...nextProps} />)
    //             expect(updateFn).toBeCalledTimes(1)
    //         })
    //         xit('invokes onUpdate when images are removed and added', async () => {
    //             const originalImages = createImages(10)
    //             const originalProps: Props = {
    //                 onLoaded: successFn,
    //                 onUpdate: updateFn,
    //                 placeholder: <Placeholder />,
    //                 timeout: 200,
    //                 children: originalImages
    //             }
    //             const {
    //                 rerender,
    //             } = makeRender(originalProps)
    //             await sleep()
    //             const newImages = createImages(2)
    //             const nextProps = {
    //                 ...originalProps,
    //                 children: [...originalImages.slice(0, 2), ...newImages]
    //             }
    //             rerender(<OnImagesLoaded {...nextProps} />)
    //             expect(updateFn).toBeCalledTimes(1)
    //         })
    //     })
    // })
})
