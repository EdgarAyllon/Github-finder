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

        return (
            (cb && cb instanceof Function) &&
            (query && typeof query === 'string')) ? true : false
    }
    
    /**
     * 
     * @static method template create template to build
     * @param {STRING} name the endpoint name
     * @param {<OBJECT><JSON>} reponse the values returned from request
     * @returns {OBJECT} data : the content with parsed values , blockNumber: the block number
     * 
     */

    static template( block, data ) {
            
        if( data === 404 ) return console.log( 'Template ' , data , data.length)
        
        let nodes = ''
        
        //Template for 'user' endpoint
        if ( 'user' === block && data){
            
            const { avatar_url , name, login , html_url, bio, blog} = data,
            
                fullname = `<a href='${bio}'>${name || 'no name provided'}</a>`,

                gitPage = `<a href='${html_url}'>@${login.toLowerCase() || 'no nickname provided'}</a>`,
            
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
                    blockNumber: 1
                    }
        } 
        
        // Template for 'repos' endpoint
        if ( 'repos' === block && data ){

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
                                        <a href='${html_url}'>${name}</a>
                                    </mark>
                                    <mark>${language || 'others' }</mark>
                                </summary>
                                <p>${description}</p>
                            </details>
                        </article>
                        <hr />`
            })
            
            nodes = { data : nodes , blockNumber : 2 }
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
        
        if (Github.checkParams(query, cb)) {
            
            let endpoints = Object.keys( providers.github[`${this.apiVersion}`] );

            endpoints.map( ( endpoint ) => {
            
                endpoint = providers.github[`${this.apiVersion}`][endpoint]

                retrieve(`${this.baseUrl}${endpoint(query)}`, this.options )

                .then(response => {
                    
                            if ( response === 404 ) throw new URIError('user NOT FOUND') 
                            
                            cb( Github.template(  endpoint.name , response ) ) 
                
                })

                .catch( error => console.log( 'Github : ', error.message ))
            })
        }// Todo else render template NOT FOUND 
    }
}
