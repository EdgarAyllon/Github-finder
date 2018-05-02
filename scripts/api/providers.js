/**
 * @module loadProviders
 *  
 * - Build and injects to DOM the defined script files used for API providers
 * 
 * @author Edgar Ayllon
 *
 **/
 (( provider ) => {
        
        let script=[];

        const mainRoute = './scripts/api/providers/'
        
        Object.keys( provider ).forEach( ( name , index ) => {
            
                script[ index ] = document.createElement( 'SCRIPT' )

               // script[ index ].setAttribute( 'async' , true )
                    
                script[ index ].setAttribute( 'src' , `${ mainRoute }${ name }.js` )
            
        })
        // Only load scripts if exists provider.
        if( script.length ){

            const common = document.createElement( 'SCRIPT' )
                    
                common.setAttribute( 'src' , './scripts/api/common.js' )
                    
            script.unshift( common )
                    
            for( let index=0 ; index < script.length ; index++ ) { document.body.appendChild( script[ index ] ) }
        }
   
})( providers )