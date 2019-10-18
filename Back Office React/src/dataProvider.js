// in src/dataProvider
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    DELETE_MANY,
    fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';

const API_URL = 'http://localhost:8081';

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {




    switch (type) {


        case GET_LIST: {

            if(params===''){

                return { url: `${API_URL}/${resource}` };

            }else{


                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: JSON.stringify([field, order]),
                    range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                    filter: JSON.stringify(params.filter),
                };
                return {
                    url: `${API_URL}/${resource}?${stringify(query)}`,
                    options: { mode: 'cors'},
                };
            }

        }
        case GET_ONE:


            return { url: `${API_URL}/${resource}/${params.id}` };

        case GET_MANY: {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            return { url: `${API_URL}/${resource}?${stringify(query)}` };
        }
        case GET_MANY_REFERENCE: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
                filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
            };
            return { url: `${API_URL}/${resource}?${stringify(query)}` };
        }
        case UPDATE:
            console.log(JSON.stringify(params.data));
            return {
                url: `${API_URL}/${resource}/${params.id}`,
                options: { method: 'PUT', body: JSON.stringify(params.data) },
            };
        case CREATE:
            return {
                url: `${API_URL}/${resource}`,
                options: { method: 'POST', body: JSON.stringify(params) },
            };
        case DELETE:
            if(params.filter){
                const query = {
                    filter: JSON.stringify(params.filter),
                };
                return {
                    url: `${API_URL}/${resource}?${stringify(query)}`,
                    options: { method: 'DELETE' },
                };
            }else{
                return {
                    url: `${API_URL}/${resource}/${params.id}`,
                    options: { method: 'DELETE' },
                };
            }

        case DELETE_MANY:

            console.log(params);
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };

            return {
                url: `${API_URL}/${resource}?${stringify(query)}`,
                options: { method: 'DELETE' },
            };


        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    const { headers, json } = response;

    /////////////////////////////////////////////////
    console.log("LE CONTENT-RANGE EST =========>");
    console.log(headers.get('content-range'));
    console.log("LA REPONSE REQUETE EST =========>");
    console.log(response);
    console.log(json);


    switch (type) {
        case GET_LIST:
            //on met a 10 par defaut car si le total du content-range est inférieur a 5 , il y a un bugg
            let total=10;
            if(headers.get('content-range')){
                total = parseInt(headers.get('content-range').split('/')[1]);
            }
            console.log(total);
            return {
                data: json.map(x => x),
                total:total,
            };
        case CREATE:
            if(JSON.stringify(json[0])){
                var j=JSON.parse(JSON.stringify(json[0]));
                var id=j.id;

                return { data: { ...params.data, id: id } };
            }else{
                return { data: JSON.parse(JSON.stringify(json)) };
            }


        case GET_ONE:
            return { data: JSON.parse(JSON.stringify(json[0])) };
        case GET_MANY:

            return { data: JSON.parse(JSON.stringify(json)) };
        case UPDATE:
            return { data: JSON.parse(JSON.stringify(json[0])) };
        case DELETE:
            return { data: JSON.parse(JSON.stringify(json)) };
        default:
            return {  data: JSON.parse(JSON.stringify(json[0])) };

    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const { url, options } = convertDataProviderRequestToHTTP(type, resource, params);
    return fetchJson(url, options)
        //.then(response => console.log(response));
        .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};