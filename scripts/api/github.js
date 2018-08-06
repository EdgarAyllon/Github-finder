let github = {};
(() => {

    /**
     * @description check if param is valid to make request
     * @param {*} param parameter to test, must be STRING type and accomplish Github API username specification
     *
     * Github API specs:
     *  username allow only alphanumeric chars A to Z, 0 to 9.
     *  Also hyphen (-) between begin and start characters, NOT begin or START with it.
     *  The max length allowed is 39 characters 
     * @returns true if param is ok or throw Error if param is not valid
     */
    function isValid (param) {

        try{
            
            if( 
                typeof param !== 'string'
                || ( /\\/i ).test( param ) === true 
                || (/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i).test( param ) == false
             )
               throw Error()
        
        }catch( error ){
            
            return false
        }
        return true
    }

    /**
     * @description common fetch promise based
     * @param {STRING} endpoint to send request
     * @returns {PROMISE} resolve or reject containing data/error response
     */
    function retrieve( endpoint ) {

        return new Promise( ( resolve, reject ) => 

            fetch( `https://api.github.com/${endpoint}` , { headers: { Accept: 'application/vnd.github.mercy-preview+json'} } )

            .then(  response =>  response )

            .then( data => resolve( data.json() ) )
                        
            .catch( error => reject( error.message ) )
            
    )}

    // API client, first check if user param TYPE is STRING and follow Github specs., if ok make request
    github = {

        user: user => isValid( user ) && retrieve( `users/${user}` ),
        
        repos: user => isValid( user ) && retrieve( `users/${user}/repos` )
    }
})()