import { error } from '@sveltejs/kit';

/** 
 * @param {string} url
 * @param {BodyInit | FormData} body
 * @returns {Promise<[any, any]>}
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
				throw error(response.status, resBody);
			}
			return [resBody, null];
		}
	} catch (error) {
		return [null, { message: error, code: 500 }];
	}
}

/** 
 * @param {string} url
 * @param {BodyInit | FormData} body
 * @returns {Promise<[any, any]>}
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
			// console.log('response: ', response);
			const resBody = await response.text();
			// console.log('body: ', resBody);
			if (!response.ok) {
				throw error(response.status, resBody);
			}
			return [resBody, null];
		}
	} catch (error) {
		return [null, error];
	}
}

/**
 * @param {string} url
 * @returns {Promise<[any, any]>}
 */
export async function Get(
	// fetch: any,
	url
) {
	try {
		const response = await fetch(url, {
			method: 'GET'
		});
		const resBody = await response.json();
		if (!response.ok) {
			throw error(response.status, resBody);
		}
		return [resBody, null];
	} catch (error) {
		return [null, { message: error, code: 500 }];
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
			throw error(response.status, resBody);
		}
		return [resBody, null];
	} catch (error) {
		return [null, { message: error, code: 500 }];
	}
}
// const API_ENDPOINT = 'http://localhost:8080';
const API_ENDPOINT = 'https://kv.rcpassos.me';

/**
 * 
 * @returns {Promise<[string[]|null, any]>}
 */
export async function ListKeys() {
	try {
		const baseURL = API_ENDPOINT;
		const path = '/keys';
		const [jsonRes, err] = await Get(baseURL + path);
		const listResponse = jsonRes;
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
		const [err] = await Put(baseURL + path, value);
		if (err) {
			return [err];
		}
		return null;
	} catch (error) {
		return [error];
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
		// console.log(path);
		const [jsonRes, err] = await Get(baseURL + path);
		const listResponse = jsonRes;
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
		const [jsonRes, err] = await Get(baseURL + path);
		if (err) {
			return [jsonRes, err];
		}
		return [jsonRes, err];
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
		const [jsonRes, err] = await Delete(baseURL + path);
		if (err) {
			return [jsonRes, err];
		}
		return [jsonRes, err];
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
		const [jsonRes, err] = await Delete(baseURL + path);
		if (err) {
			return [jsonRes, err];
		}
		return [jsonRes, err];
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
