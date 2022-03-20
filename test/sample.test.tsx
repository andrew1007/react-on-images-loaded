import React from 'react'
import OnImagesLoaded from '../src/OnImagesLoaded'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))
const successFn = jest.fn()
const failFn = jest.fn()

describe('OnImagesLoaded', () => {
    it('successfully invokes loading', async () => {
        const {
            findAllByTestId,
            debug,
            findByTestId,
            getAllByTestId
        } = render(
            <OnImagesLoaded
                onLoaded={successFn}
                onTimeout={failFn}
                placeholder={null}
                timeout={500}
            >
                [
                <img data-testid="img" src={''} />,
                <img data-testid="img" src={''} />,
                ]
            </OnImagesLoaded>
        )

        for (const image of getAllByTestId('img')) {
            fireEvent.load(image)
        }

        await sleep()
        expect(successFn).toBeCalled()
    })
})