/**
 * @module common
 *  
 * - Common functions 
 *
 * @author Edgar Ayllon
 *
 * */

/**
 * @function retrieve <ISOLATED ASYNC/PROMISED FUNCTION> send request to provider
 * @param url <STRING> the url to fetch
 * @param options <OBJECT> the request header options
 * @return <OBJECT> with resolved response ( data or error )
 **/

const retrieve = async ( url, options ) => {
        
        // request to provider , Promise based, on resolve call method sendResults
        const status = ( response ) => {
            
            return response.status === 200 ? 
            
                            Promise.resolve( response.json() ) :
                            
                            Promise.reject( new Error( response.status ))
        };

        const makeRequest = fetch( url , options )
                
                        .then( response =>  status( response ) )

                        .then( response =>  response  )
                        
                        .catch( error =>  Number(error.message) );

        return makeRequest
}

/**
 * 
 * @function build <ISOLATED FUNCTION> builds DOM elements 
 * @param {OBJECT<JSON>} node, the DOM element name to build
 * @returns {OBJECT} the DOM element builded
 * 
 */

const build = ( node ) => {
        // Util if template as more than one section, don't erases MAIN content.
        if( node.blockNumber === 1 ) document.querySelector( 'MAIN' ).innerHTML = ''
        
        const newElement = document.createElement( 'SECTION' );
              
            newElement.innerHTML = node.data

        document.querySelector( 'MAIN' ).appendChild( newElement )
}