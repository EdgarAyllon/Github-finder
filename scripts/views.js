/**
 * 
 * @author Edgar Ayllon
 * 
 * @function viewHTML create html template from request retrieved data
 * 
 * @param {STRING} provider the name of provider template to use, {NULL} if is error
 * @param {STRING} endpoint the name of the endpoint to use when build view, {NULL} if is error.
 * @param {STRING}  data the values returned from request.
 * @returns {HTMLElement}  the rendered DOM element
 * 
 */

function viewHTML ( provider, endpoint , data ){

    let template = '' , nested = false , result = '';

    const error = {           
                        e0 :   '<h3>No internet connection</h3>',
                        e404 : '<h3>User not found</h3>',
                        e403 : '<h3>Keep calm and wait one minute to query</h3>',
                   }

    const views = { 
                
                github : {
                
                            user : () => {

                                const { avatar_url , name, login , html_url, bio, blog } = data,
                        
                                    fullname = `${name || 'no name provided'}` ,

                                    gitPage = `<a href='${html_url}' target='_blank'>${login || 'no nickname provided'}</a>`;
                    
                                template = `<header>
                                                <figure>
                                                    <img src='${ avatar_url || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=' }' alt='${name || 'none' }' />
                                                    <figcaption>
                                                        <p>${fullname}</p>
                                                        <p>${gitPage}</p>
                                                    </figcaption>
                                                </figure>
                                                <p>${bio || 'This user did not provide any bio'}</p>
                                            </header>`;

                                return { node : template }
                            },

                            repos: () => {
                            
                                if ( !data.length ){
                                    
                                    template = '<h3>User has no repositories or there are private</h3>'

                                }else { 
                                    
                                    data.map( repo => {
                                
                                        let { stargazers_count , forks_count, html_url , language, description, name  } = repo;        
                            
                                        template +=`<article>
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
                                                        <p>${description ? description.trim() : 'No description available'}</p>
                                                    </details>
                                                </article>
                                                <hr />`;
                                    })

                                }
                                return { node : template , nested : true }
                            }
                        }
                    };
        
        result = provider ? views[provider][endpoint]() : error[data] ; 

        if( !result.nested ) document.querySelector( 'MAIN' ).innerHTML = ''
        
        const newElement = document.createElement( 'SECTION' );
            
            newElement.innerHTML = result.node ? result.node : result;

        document.querySelector( 'MAIN' ).appendChild( newElement )
   
}