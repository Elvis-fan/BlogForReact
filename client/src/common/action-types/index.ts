export const getFetchActionTypes = (type: string) => {
    return {
        FETCH: `fetch/${type}`,
        FETCH_REQUEST: `fetch/request/${type}`,
        FETCH_SUCCESS: `fetch/success/${type}`,
        FETCH_FAILURE: `fetch/failure/${type}`,
    }
}