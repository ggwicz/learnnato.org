/**
 * LearnNato.js
 *
 * A simple game for learning and practicing the NATO alphabet.
 *
 * @author George Gecewicz
 */

const LearnNato = {

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    init: () => {
        document.getElementById( 'foo' ).addEventListener( 'click', event => {
            alert( 'hi' );
        } );
    },

    /**
     * Init game's main click event handlers.
     *
     * @since 1.0.0
     */
    setGameState: ( stateName ) => {
        this.els.game.dataset.activeState = stateName;
    }

};
