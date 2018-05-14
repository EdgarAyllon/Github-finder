/**
 * @module common
 *  
 * - Common functions 
 *
 * @author Edgar Ayllon
 *
 * */

/**
 * 
 * @function request <ASYNC FUNCTION> send request to provider
 * @param url <STRING> the url to fetch
 * @param options <OBJECT> the request header options
 * @param endpoint <STRING> containing the provider name to assign callback response
 * @param cb <REFERENCE/FUNCTION> the callback 
 * @return <OBJECT> with resolved response ( data or error ).
 * 
 *  **/
const request = async ( url, options, provider, endpoint, cb ) => {
        // request to provider , Promise based, on resolve call method sendResults

        const request = new Promise( ( resolve,reject ) =>{
        
                       fetch( url , options )

                        .then( response =>  {
                            
                            if ( response.status === 200 || response.status === 304 ) resolve( response.json() ) 
                        
                            else reject( response )
                        })

                        .catch( error =>  reject( error ) )
                
        })

        Promise.all(  [ request ]  )

                .then( data => cb( provider, endpoint, data[0] )  ) 
                        
                .catch( error => cb( null, null, `e${error.status || 0}` ) ) 
}