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
        const buttons = document.querySelectorAll( 'button' );

        buttons.forEach( button => {
            button.addEventListener( 'click', this.test );
            button.addEventListener( 'touchstart', this.test );
            button.addEventListener( 'touchend', this.test );
        } );
        // document.addEventListener( '' )
        // document.addEventListener( 'click', event => {
        //     if ( 'undefined' === typeof event.target.dataset.action ) {
        //         return;
        //     }

        //     this.setGameState( event.target.dataset.action );
        // } );

        // document.querySelector( '.intro__button' ).addEventListener( 'touchstart', event => {
        //     if ( 'undefined' === typeof event.target.dataset.action ) {
        //         return;
        //     }

        //     this.setGameState( event.target.dataset.action );
        // } );
    }

    test( ) {
        alert( 'hi' )
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
