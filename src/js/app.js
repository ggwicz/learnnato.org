/**
 * A simple game for learning and practicing the NATO alphabet.
 *
 * @author George Gecewicz
 */

const LearnNato = {

    /**
     * Primary game els.
     */
    els: {
        game: document.querySelector( '.game' ),
        play: document.querySelector( '.play' ),
        results: document.querySelector( '.results' )
    },

    /**
     * Init the game.
     */
    init: () => {
        LearnNato.initButtons();
        LearnNato.initHandlers();
        LearnNato.renderResults();
    },

    /**
     * Set a game-level state.
     *
     * @param {string} stateName State to set.
     */
    setGameState: ( stateName ) => {
        LearnNato.els.game.dataset.activeState = stateName;

        if ( 'play' === stateName ) {
            LearnNato.startGameLoop();
        }
    },

    /**
     * Start game loop.
     */
    startGameLoop: () => {
        LearnNato.setActiveCharacter();
    },

    /**
     * Set the game's active game character.
     */
    setActiveCharacter: () => {
        const nextUnsolved = LearnNato.getNextUnsolvedCharacter();

        if ( null === nextUnsolved || undefined == nextUnsolved ) {
            LearnNato.setGameState( 'victory' );
        } else {
            LearnNato.els.game.dataset.activeCharacter = nextUnsolved;
            LearnNato.els.play.querySelector( 'label' ).textContent = LearnNato.els.game.dataset.activeCharacter.toUpperCase();
        }
    },

    /**
     * Get the next unsolved character in the list.
     */
    getNextUnsolvedCharacter: () => {
        for ( const character in window.nato ) {
            if ( false === window.nato[ character ].success ) {
                return character;
            }
        }

        return null;
    },

    /**
     * Init button click handlers, which mostly just set game state to data-action value.
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

        document.querySelector( '.submit' ).addEventListener( 'click', event => {
            event.preventDefault();
            LearnNato.handleGuessSubmission();
        } );
    },

    /**
     * Handle submitting a guess at a character's code word.
     */
    handleGuessSubmission: () => {
        // get the current character's code words
        // compare submission to those values
        // if match, success
        // - update corresponding "result" icon for character
        // - load next unsolved character
        // if no match, failure
        // - update corresponding "result" icon for character
        // - stay on character, clear input, say "incorrect, try again".
    },

    /**
     * Render results.
     */
    renderResults: () => {
        Object.keys( window.nato ).forEach( character => {
            LearnNato.els.results.innerHTML += `<span class="result" data-character="${character}">${character.toUpperCase()}</span>`;
            window.nato[ character ].success = false;
        } );
    }

};
