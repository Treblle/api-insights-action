import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug')
const getInputMock = jest.spyOn(core, 'getInput')

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets the link output', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'some-link':
          return 'https://apiinsights.io/reports/'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    expect(debugMock).toHaveBeenNthCalledWith(
      1,
      'Successfully sent OpenAPI spec.'
    )
  })
})
