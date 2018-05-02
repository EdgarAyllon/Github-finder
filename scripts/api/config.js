/**
 * @config file
 * 
 * @author Edgar Ayllon
 * 
 * @param {<STRING>} query , the value of query to build endpoint
 * 
 * - Use this to configure API provider endpoints
 *
 * use case :
 * 
 *   ... },
 * 
 *  <PROVIDER_NAME> : {
 *                      <API_VERSION> : {
 *                                      <ENDPOINT_NAME> : <ENDPOINT_VALUE>
 *                                        }                 
 *                     }
 *  },
 * 
 *  { ....
 * 
 * 
 */

const providers = (() => {

    return {
        github: {
                    v3: {
                        
                        user: ( query ) => `/users/${query}` ,

                        repos: ( query ) => `/users/${query}/repos` 
                    }
        },
    }

})()