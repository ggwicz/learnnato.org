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
        results: document.querySelector( '.results' ),
        errors: document.querySelector( '.errors' ),
        guessField: document.querySelector( '.guess' )
    },

    /**
     * Init the game.
     */
    init: () => {
        LearnNato.initButtons();
        LearnNato.renderResults( true );
    },

    /**
     * Set a game-level state.
     *
     * @param {string} stateName State to set.
     */
    setGameState: ( stateName ) => {
        LearnNato.els.game.dataset.activeState = stateName;

        if ( 'play' === stateName ) {
            LearnNato.gameLoop();
        }

        console.log( 'new state:', stateName );
    },

    /**
     * Game loop: sets game's active game character, or handles victory condition.
     */
    gameLoop: () => {
        const nextUnsolved = LearnNato.getNextUnsolvedCharacter();

        if ( null === nextUnsolved || undefined == nextUnsolved ) {
            LearnNato.setGameState( 'victory' );
        } else {
            LearnNato.els.game.dataset.activeCharacter = nextUnsolved;
            LearnNato.els.guessField.value = '';
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

        // Attempt to prevent page refresh upon Enter click.
        document.addEventListener( 'keydown', event => {
            if ( event.key && 'Enter' === event.key ) {
                event.preventDefault();
                LearnNato.handleGuessSubmission();
            }
        } );
    },

    /**
     * Handle submitting a guess at a character's code word.
     */
    handleGuessSubmission: () => {
        let codeWords = window.nato[ LearnNato.els.game.dataset.activeCharacter ];
        let guess = LearnNato.els.guessField.value;

        if ( ! guess ) {
            LearnNato.renderError( 'Enter your guess for this character\'s code word.' );
            return;
        }

        LearnNato.els.errors.innerHTML = '';

        if ( codeWords.includes( guess ) ) {
            LearnNato.handleSuccessfulGuess();
        } else {
            LearnNato.renderError( LearnNato.getWrongGuessMessage() );
        }
    },

    handleSuccessfulGuess: () => {
        window.nato[ LearnNato.els.game.dataset.activeCharacter ].success = true;
        LearnNato.renderResults();
        LearnNato.gameLoop();
    },

    /**
     * Render results.
     */
    renderResults: ( initialState = false ) => {
        let results = '';

        Object.keys( window.nato ).forEach( character => {

            // On initial state, start with every character having success false.
            if ( initialState ) {
                window.nato[ character ].success = false;
            }

            results += `<span class="result" data-character="${character}" data-success="${window.nato[ character ].success}">${character.toUpperCase()}</span>`;
        } );

        LearnNato.els.results.innerHTML = results;
    },

    /**
     * Render an error.
     *
     * @param {string} errorMessage The error message to render.
     */
    renderError: ( errorMessage ) => {
        LearnNato.els.errors.innerHTML = `<span class="error">${errorMessage}</span>`;
    },

    /**
     * Simple helper for getting one of a variety of "wrong guess" messages.
     *
     * @return {string}
     */
    getWrongGuessMessage: () => {
        const messages = [
            'Incorrect. Try again.',
            'Wrong code word. Try again.',
            'Not quite right—guess again.',
            'That doesn\'t look right, try again.'
        ];

        return messages[ Math.floor( Math.random() * messages.length ) ];
    }

};
