import * as core from '@actions/core'
import * as fs from 'fs'
import axios from 'axios'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const schema: string = core.getInput('schema')

    const fileData = fs.readFileSync(schema)

    const response = await axios.post(
      'https://api.apiinsights.io/api/v1/schemas',
      {
        schema: fileData
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    if (response.status === 202) {
      core.debug('Successfully sent OpenAPI spec.')
    } else {
      core.setFailed('Something went wrong.')
      console.log(response.data)
    }

    core.setOutput('link', `https://apiinsights.io/reports/${response.data.id}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
