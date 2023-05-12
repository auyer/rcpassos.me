import type { AppError } from '$lib/interfaces/error.interface'
import { error } from '@sveltejs/kit'

export async function Post(
  url: string,
  body: BodyInit | FormData
): Promise<[any | Array<any>, AppError]> {
  try {
    const headers = { 'Content-Type': 'application/octet-stream' }
    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(body)

      const response = await fetch(url, {
        method: 'POST',
        body,
        headers
      })

      const resBody = await response.json()
      if (!response.ok) {
        throw error(response.status, resBody)
      }
      return [resBody, null]
    }
  } catch (error) {
    return [{}, { message: error, code: 500 }]
  }
}
export async function Put(
  url: string,
  body: BodyInit | FormData
): Promise<[any | Array<any>, AppError]> {
  try {
    const headers = { 'Content-Type': 'application/octet-stream' }
    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(body)

      const response = await fetch(url, {
        method: 'PUT',
        body,
        headers
      })
      console.log('response: ', response)

      const resBody = await response.text()
      console.log('body: ', resBody)
      if (!response.ok) {
        throw error(response.status, resBody)
      }
      return [resBody, null]
    }
  } catch (error) {
    return [{}, error]
  }
}

export async function Get(
  // fetch: any,
  url: string
): Promise<[any | Array<any>, AppError]> {
  try {
    const response = await fetch(url, {
      method: 'GET'
    })

    const resBody = await response.json()
    if (!response.ok) {
      throw error(response.status, resBody)
    }
    return [resBody, null]
  } catch (error) {
    return [{}, { message: error, code: 500 }]
  }
}

export async function Delete(
  // fetch: any,
  url: string
): Promise<[any | Array<any>, AppError]> {
  try {
    const response = await fetch(url, {
      method: 'DELETE'
    })

    const resBody = await response.json()
    if (!response.ok) {
      throw error(response.status, resBody)
    }
    return [resBody, null]
  } catch (error) {
    return [{}, { message: error, code: 500 }]
  }
}

// const API_ENDPOINT = 'http://localhost:8080';
const API_ENDPOINT = 'https://kv.rcpassos.me'

export async function ListKeys(): Promise<[Array<string>, AppError]> {
  try {
    const baseURL = API_ENDPOINT
    const path = '/keys'

    const [jsonRes, err] = await Get(baseURL + path)
    // console.log(jsonRes)

    const listResponse: Array<string> = jsonRes

    if (err) {
      return [listResponse, err]
    }
    return [listResponse, null]
  } catch (error) {
    return [null, error]
  }
}

export async function PutKeyValue({ key, value }): Promise<[AppError]> {
  try {
    const baseURL = API_ENDPOINT
    const path = '/' + key

    const [_, err] = await Put(baseURL + path, value)

    if (err) {
      return [err]
    }
    return null
  } catch (error) {
    return [error]
  }
}

export async function ListPrefix({ key }): Promise<[Array<string>, AppError]> {
  try {
    const baseURL = API_ENDPOINT
    const path = '/keys/' + key
    console.log(path)

    const [jsonRes, err] = await Get(baseURL + path)

    const listResponse: Array<string> = jsonRes

    if (err) {
      return [listResponse, err]
    }
    return [listResponse, err]
  } catch (error) {
    return [null, error]
  }
}

export async function GetKey({ key }): Promise<[string, AppError]> {
  try {
    const baseURL = API_ENDPOINT
    const path = '/' + key

    const [jsonRes, err] = await Get(baseURL + path)

    if (err) {
      return [jsonRes, err]
    }
    return [jsonRes, err]
  } catch (error) {
    return [null, error]
  }
}

export async function DeleteKey({ key }): Promise<[string, AppError]> {
  try {
    const baseURL = API_ENDPOINT
    const path = '/' + key

    const [jsonRes, err] = await Delete(baseURL + path)

    if (err) {
      return [jsonRes, err]
    }
    return [jsonRes, err]
  } catch (error) {
    return [null, error]
  }
}

export async function DeletePrefix({ key }): Promise<[string, AppError]> {
  try {
    const baseURL = API_ENDPOINT
    const path = '/keys/' + key

    const [jsonRes, err] = await Delete(baseURL + path)

    if (err) {
      return [jsonRes, err]
    }
    return [jsonRes, err]
  } catch (error) {
    return [null, error]
  }
}

export async function DeleteAll(): Promise<[AppError]> {
  try {
    const baseURL = API_ENDPOINT
    const path = '/keys'

    const [_, err] = await Delete(baseURL + path)

    if (err) {
      return [err]
    }
    return [null]
  } catch (error) {
    return [error]
  }
}
