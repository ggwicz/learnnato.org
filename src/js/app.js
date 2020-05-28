/**
 * A simple game for learning and practicing the NATO alphabet.
 *
 * @author George Gecewicz
 */

const LearnNato = {

    gameEl: document.querySelector( '.game' ),

    setGameState: ( stateName ) => {
        LearnNato.gameEl.dataset.activeState = stateName;
    },

    init: () => {
        document.querySelectorAll( 'button' ).forEach( button => {
            button.addEventListener( 'click', event => {
                if ( 'undefined' === typeof event.target.dataset.action ) {
                    return;
                }

                LearnNato.setGameState( event.target.dataset.action );
            } );
        } );
    }
};
