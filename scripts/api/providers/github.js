/**
 *
 * @module Github
 *
 * - Class constructor for Github provider
 * 
 * @author Edgar Ayllon
 *
 * @class Github provider constructor
 * @param {<STRING>} apiVersion the version of API to use, see file config.js sample
 * @returns new instance to class
 * 
 **/

class Github{
     
    constructor( apiVersion ) {
        
        this.baseUrl = 'https://api.github.com'
        this.options = { headers: { Accept: 'application/vnd.github.mercy-preview+json'} }
        this.apiVersion = this.isValid( apiVersion )
        this.endpoints = providers.github[`${this.apiVersion}`]
    }
    
    /**
    * 
    * @static isValid checks if ApiVersion is provided
    * @param {STRING} query the value of query string
    * @param {FUNCTION} cb the referenced callback
    * @returns {BOOLEAN} true if params are valid, false if not
    *
    **/

    isValid( version ) { 
        
        if ( !providers.github[`${version}`] || !version ) throw new Error('Github : API version not defined / wrong API version')

        return version
    }

    static checkParams(query, cb){
        
        if ( !query || !cb ) throw new Error('Github: Params needed ( query , callback )')
        
        return ( cb instanceof Function && typeof query === 'string') ? true : false
    }
   
    /**
     * 
     * @function retrieve , if params are valid call the referenced callback to build DOM element
     * 
     * @param query <STRING> the query to fetch from
     * @param cb <REFERENCE:FUNCTION> referenced callback to use
     * @returns builded query view throught referenced cb param.
     *
     **/

    retrieve(query, cb) {
        
        if ( Github.checkParams(query, cb) ) {

            Object.keys( this.endpoints ).forEach( endpoint  => {
                
                return request( 
                        `${ this.baseUrl }${ this.endpoints[endpoint]( query ) }`,

                        this.options ,

                        this.constructor.name.toLocaleLowerCase() ,

                        endpoint,

                        cb )
            })
        }
    }
}
