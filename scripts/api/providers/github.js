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
        this.options = {}
        this.apiVersion = this.isValid( apiVersion )
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
        
        if ( !query || !cb ) throw new Error('Github: Params needed')
        
        return ( cb instanceof Function && typeof query === 'string') ? true : false
    }
    
    /**
     * 
     * @static method template create template to build
     * @param {STRING} name the endpoint name
     * @param {<OBJECT><JSON>} reponse the values returned from request
     * @returns {OBJECT} data : the content with parsed values , blockNumber: the block number
     * 
     */

    static template( block, data, isError ) {
            
        let nodes = ''
        
        if( isError ){
            
            nodes = ( data === 404 && { data: '<h3>User not found</h3>' } ) ||
            
                    ( data === 403 && { data: '<h3>Keep calm and wait one minute to query</h3>' } )
                    
        }else{

            if( 'user' === block && data){
                
                const { avatar_url , name, login , html_url, bio, blog} = data,
                
                    fullname = `<a href='${bio || html_url}' target='_blank' >${name || 'no name provided'}</a>` ,

                    gitPage = `<a href='${html_url}' target='_blank'>${login || 'no nickname provided'}</a>`,
                
                    imageSrc = avatar_url ? `${avatar_url}` : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
            
                nodes = { data : `<header>
                                    <figure>
                                        <img src='${imageSrc}' alt='${name || 'none' }' />
                                        <figcaption>
                                            <p>${fullname}</p>
                                            <p>${gitPage}</p>
                                        </figcaption>
                                    </figure>
                                    <p>${bio || 'This user did not provide any bio'}</p>
                                </header>`,
                        }
            } 
            if( 'repos' === block && data ){
               
                const { login }  =  data[0].owner.login ;

                data.map( ( repo, index ) => { 

                    let { stargazers_count , forks_count, html_url , language, description, name  } = repo;

                    // Please, no Emojis. Clean description
                    description = description && description.replace(/[^\w\d\s\:\/\'\"\.]/gi,'') || 'No description available';

                    nodes += `<article>
                                <details open>
                                    <summary>
                                        <mark>
                                            <img src='img/star.svg' alt='starred' /> ${stargazers_count}
                                            <img src='img/forked.svg' alt='forks' /> ${forks_count}
                                        </mark>
                                        <mark>
                                            <a href='${html_url}' target='_blank'>${name}</a>
                                        </mark>
                                        <mark>${language || 'others' }</mark>
                                    </summary>
                                    <p>${description}</p>
                                </details>
                            </article>
                            <hr />`
                })
                nodes = { data : nodes , nested: true}
            }
        }
        return nodes
    }

    /**
     * 
     * @function retrieve fetch data, if params are valid call the referenced callback to build DOM element
     * 
     * @param query <STRING> the query to fetch from
     * @param cb <REFERENCE:FUNCTION> referenced callback to use
     * @returns builded query view throught referenced cb param.
     *
     **/

    retrieve(query, cb) {
        
        if ( Github.checkParams(query, cb) ) {
            
            let endpoints = Object.keys( providers.github[`${this.apiVersion}`] );

            endpoints.map( ( endpoint ) => {
            
                endpoint = providers.github[`${this.apiVersion}`][endpoint]

                request(`${this.baseUrl}${endpoint(query)}`, this.options )

                .then(response => {
                    
                            if ( response === 404 ) {                                 
                                
                                throw new Error(404) 
                            }
                            else if ( response === 403 ) {

                                throw new Error(403) 
                            }else{
                            
                            cb( Github.template(  endpoint.name , response ) ) 

                            }
                
                })
                .catch( error => { cb( Github.template( null , Number(error.message) , true ) ) })
            })
        }
    }
}
