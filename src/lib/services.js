import { error } from '@sveltejs/kit';

/**
 * @param {string} url
 * @param {BodyInit | FormData} body
 * @returns {Promise<[any, any]|undefined>}
 */
export async function Post(url, body) {
	try {
		const headers = { 'Content-Type': 'application/octet-stream' };
		if (!(body instanceof FormData)) {
			headers['Content-Type'] = 'application/json';
			body = JSON.stringify(body);
			const response = await fetch(url, {
				method: 'POST',
				body,
				headers
			});
			const resBody = await response.json();
			if (!response.ok) {
				return ['', error(response.status, resBody)];
			}
			return [resBody, null];
		}
	} catch (error) {
		return [null, error];
	}
}

/**
 * @param {string} url
 * @param {BodyInit | FormData} body
 * @returns {Promise<[string, any]>}
 */
export async function Put(url, body) {
	try {
		const headers = { 'Content-Type': 'application/octet-stream' };
		if (!(body instanceof FormData)) {
			headers['Content-Type'] = 'application/json';
			body = JSON.stringify(body);
			const response = await fetch(url, {
				method: 'PUT',
				body,
				headers
			});
			const resBody = await response.text();
			if (!response.ok) {
				return ['', error(response.status, resBody)];
			}
			return [resBody, null];
		}
	} catch (error) {
		return ['', error];
	}
}

/**
 * @param {string} url
 * @returns {Promise<[string, any]>}
 */
export async function Get(
	// fetch: any,
	url
) {
	try {
		const response = await fetch(url, {
			method: 'GET'
		});
		const resBody = await response.text();
		if (!response.ok) {
			return ['', error(response.status, resBody)];
		}
		return [resBody, null];
	} catch (error) {
		return ['', error];
	}
}

/**
 * @param {string} url
 * @returns {Promise<[any, any]>}
 */
export async function Delete(
	// fetch: any,
	url
) {
	try {
		const response = await fetch(url, {
			method: 'DELETE'
		});
		const resBody = await response.json();
		if (!response.ok) {
			return ['', error(response.status, resBody)];
		}
		return [resBody, null];
	} catch (error) {
		return [null, error];
	}
}
// const API_ENDPOINT = 'http://localhost:8080';
const API_ENDPOINT = 'https://memorykv.rcpassos.me';

/**
 *
 * @returns {Promise<[string[]|null, any]>}
 */
export async function ListKeys() {
	try {
		const baseURL = API_ENDPOINT;
		const path = '/keys';
		const [jsonRes, err] = await Get(baseURL + path);
		// list will return a json compatible list of keys
		const listResponse = JSON.parse(jsonRes);
		if (err) {
			return [listResponse, err];
		}
		return [listResponse, null];
	} catch (error) {
		return [null, error];
	}
}

/**
 * @param {string} key - The key in the database.
 * @param {any} value - The author of the book.
 */
export async function PutKeyValue(key, value) {
	try {
		const baseURL = API_ENDPOINT;
		const path = '/' + key;
		const [response, err] = await Put(baseURL + path, value);
		console.log('PutKeyValue', response, err);
		if (err) {
			return [response, err];
		}
		return [response, err];
	} catch (error) {
		return ['', error];
	}
}

/**
 * @param {string} key - The key in the database.
 * @returns {Promise<[string[]|null, any]>}
 */
export async function ListPrefix(key) {
	try {
		const baseURL = API_ENDPOINT;
		const path = '/keys/' + key;
		const [jsonRes, err] = await Get(baseURL + path);
		// list will return a json compatible list of keys
		const listResponse = JSON.parse(jsonRes);
		if (err) {
			return [listResponse, err];
		}
		return [listResponse, err];
	} catch (error) {
		return [null, error];
	}
}

/**
 * @param {string} key - The key in the database.
 * @returns {Promise<[string|null, any]>}
 */
export async function GetKey(key) {
	try {
		const baseURL = API_ENDPOINT;
		const path = '/' + key;
		const [response, err] = await Get(baseURL + path);
		if (err) {
			return [response, err];
		}
		return [response, err];
	} catch (error) {
		return [null, error];
	}
}

/**
 * @param {string} key - The key in the database.
 * @returns {Promise<[string|null, any]>}
 */
export async function DeleteKey(key) {
	try {
		const baseURL = API_ENDPOINT;
		const path = '/' + key;
		const [response, err] = await Delete(baseURL + path);
		if (err) {
			return [response, err];
		}
		return [response, err];
	} catch (error) {
		return [null, error];
	}
}

/**
 * @param {string} key - The key in the database.
 * @returns {Promise<[string|null, any]>}
 */
export async function DeletePrefix(key) {
	try {
		const baseURL = API_ENDPOINT;
		const path = '/keys/' + key;
		const [response, err] = await Delete(baseURL + path);
		if (err) {
			return [response, err];
		}
		return [response, err];
	} catch (error) {
		return [null, error];
	}
}

/**
 * @returns {Promise<[any]>}
 */
export async function DeleteAll() {
	try {
		const baseURL = API_ENDPOINT;
		const path = '/keys';
		const [err] = await Delete(baseURL + path);
		if (err) {
			return [err];
		}
		return [null];
	} catch (error) {
		return [error];
	}
}
