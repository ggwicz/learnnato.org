/**
 * A simple game for learning and practicing the NATO alphabet.
 *
 * @author George Gecewicz
 */

const LearnNato = {

    /**
     * Primary game container.
     */
    gameEl: document.querySelector( '.game' ),

    /**
     * Primary results container.
     */
    resultsEl: document.querySelector( '.results' ),

    /**
     * Set a game-level state.
     *
     * @param {string} stateName State to set.
     */
    setGameState: ( stateName ) => {
        LearnNato.gameEl.dataset.activeState = stateName;
    },

    /**
     * Init the game.
     */
    init: () => {
        LearnNato.initButtons();
        LearnNato.renderResults();
    },

    /**
     * Init button click handlers, which just set game state to data-action value.
     */
    initButtons: () => {
        document.querySelectorAll( 'button' ).forEach( button => {
            button.addEventListener( 'click', event => {
                if ( 'undefined' === typeof event.target.dataset.action ) {
                    return;
                }

                LearnNato.setGameState( event.target.dataset.action );
            } );
        } );
    },

    /**
     * Render results.
     */
    renderResults: () => {
        Object.keys( window.nato ).forEach( character => {
            LearnNato.resultsEl.innerHTML += `<span class="result" data-character="${character}">${character.toUpperCase()}</span>`;
            window.nato[ character ];
            console.log( 'character', window.nato[ character ] );
        } );
    }

};
