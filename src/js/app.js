/**
 * LearnNato.js
 *
 * A simple game for learning and practicing the NATO alphabet.
 *
 * @author George Gecewicz
 */
class LearnNato {

    /**
     * Game DOM elements.
     *
     * @since 1.0.0
     *
     * @var {object}
     */
    els = {};

    /**
     * Game state.
     *
     * @since 1.0.0
     *
     * @var {object}
     */
    state = {};

    /**
     * Constructor.
     *
     * @since 1.0.0
     *
     * @var {object} gameEl DOM element for game container.
     */
    constructor( gameEl ) {
        this.els = {
            game: gameEl
        }
    }

    /**
     * Init the game.
     *
     * @since 1.0.0
     */
    init() {
        this.bindClicks();
    }

    /**
     * Init game's main click event handlers.
     *
     * @since 1.0.0
     */
    bindClicks() {
        document.addEventListener( 'click', event => {
            if ( 'undefined' === typeof event.target.dataset.action ) {
                return;
            }

            event.preventDefault();

            this.setGameState( event.target.dataset.action );
        } );
    }


    /**
     * Init game's main click event handlers.
     *
     * @since 1.0.0
     */
    setGameState( stateName ) {
        this.els.game.dataset.activeState = stateName;
    }

}
