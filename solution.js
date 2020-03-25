/**
 * ______
 *|  ____|
 *| |__   _ ____   _____  _   _
 *|  __| | '_ \ \ / / _ \| | | |
 *| |____| | | \ V / (_) | |_| |
 *|______|_| |_|\_/ \___/ \__, |
 *                         __/ |
 *                        |___/
 */

// packages
const fetch = require('node-fetch');
const fs = require('fs');

/**
 * @function postCall - A generic fetch call
 * @param {string} api_url - The url for the fetch request
 * @param {string} req_method - The method type for the request - GET, POST etc
 * @param {string|json} req_body - The body payload for the request
 * @returns void
 */
// function postCall({
//   api_url,
//   req_method,
//   req_body
// }) {
//     fetch(api_url, {
//         method: req_method,
//         body: req_body,
//     }).then(res => {
//         res.json().then(data => {
//             console.log(data);
//         }).catch(json_err => {
//             console.error('Error with json read', json_err.toString());
//         });
//     }).catch(err => {
//         console.error('Error with api call', err.toString());
//     });
// }

/**
 * Comment
 * To handle errors correctly you need to also wrap the request in a Promise
 */
function postCall({
    api_url,
    req_method,
    req_body
}) {
    return new Promise((resolve, reject) => {
        fetch(api_url, {
            method: req_method,
            body: req_body,
        }).then(res => {
            res.json().then(data => {
                resolve(data);
            }).catch(json_err => {
                console.error('Error with json read', json_err.toString());
                reject(json_err);
            });
        }).catch(err => {
            console.error('Error with api call', err.toString());
            reject(err);
        });
    });
}

/**
 * @function getApiUrl - Get the api call url
 * @returns {Promise}
 */
function getApiUrl() {
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/url.txt`, 'utf8', (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
}

/**
 * @function getReqMethod - Get the api call method
 * @returns {Promise}
 */
function getReqMethod() {
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/method.txt`, 'utf8', (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
}

/**
 * @function getApiUrl - Get the api call body payload
 * @returns {Promise}
 */
function getReqBody() {
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/body.json`, 'utf8', (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
}

/**
 * Comment
 * This is the solution we are looking for
 * However, one issue we see is that should there be an error you fail to handle it
 */
// (async () => {
//     // Invoke the api call
//     postCall({
//         api_url: await getApiUrl(),
//         req_method: await getReqMethod(),
//         req_body: await getReqBody()
//     });
// })();

// Error handling
getApiUrl().then(api_url => {

    getReqMethod().then(req_method => {

        getReqBody().then(req_body => {

            postCall({
                api_url,
                req_method,
                req_body
            }).then(api_res => {
                console.log(api_res);
            }).catch(api_err => {
                throw api_err;
            });

        }).catch(req_body_err => {
            throw req_body_err;
        });

    }).catch(req_method_err => {
        throw req_method_err;
    });

}).catch(url_err => {
    throw url_err;
});