import { API } from '../constants'
import { isDev } from '../utils'
import ICompoundInterestParams from '../interfaces/ICompoundInterestParams'
import ICompoundInterestData from '../interfaces/ICompoundInterestData'

// Form URI based on if dev or prod
const HOST = isDev() ? API.DEV_HOST : API.PROD_HOST
const COMPOUND_INTEREST_API_URI = HOST + API.COMPOUND_INTEREST_API_ENDPOINT

/**
 * Compound Interest API Client that initiates a JSON request to the API
 * CI endpoint with all the params required and the returns the parsed JSON
 * response
 *
 * @param  {ICompoundInterestParams} compoundInterestParams Required request params
 * @returns Promise<ICompoundInterestData>
 */
const CompoundInterestAPI = (compoundInterestParams: ICompoundInterestParams): Promise<ICompoundInterestData> => {
    return new Promise((resolve, reject) => {
        fetch(COMPOUND_INTEREST_API_URI, {
            method: 'POST',
            headers: {
                Accept: API.JSON_MIME_TYPE,
                'Content-Type': API.JSON_MIME_TYPE,
            },
            body: JSON.stringify(compoundInterestParams),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status.error) return reject(new Error(res.status.message))
                const data: ICompoundInterestData = res.data
                resolve(data)
            })
            .catch((err) => reject(err))
    })
}

export default CompoundInterestAPI
