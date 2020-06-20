/**
 * A simple game for learning and practicing the NATO alphabet.
 *
 * @author George Gecewicz
 */

const LearnNato = {

    /**
     * The currently active character in the game loop.
     */
    activeChar: null,

    /**
     * Primary game els.
     */
    els: {
        game: document.querySelector( '.game' ),
        play: document.querySelector( '.play' ),
        results: document.querySelector( '.results' ),
        notices: document.querySelector( '.notices' ),
        guessField: document.querySelector( '.guess' )
    },

    /**
     * Init the game.
     */
    init: () => {
        LearnNato.initButtons();
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
            LearnNato.renderResults();
            LearnNato.gameLoop();
        }
    },

    /**
     * Game loop: sets game's active game character, or handles victory condition.
     */
    gameLoop: () => {
        const nextUnsolved = LearnNato.getNextUnsolvedCharacter();

        if ( null === nextUnsolved || undefined == nextUnsolved ) {
            LearnNato.setGameState( 'victory' );
        } else {
            LearnNato.activeChar = nextUnsolved;
            LearnNato.els.guessField.value = '';
            document.querySelector( '.active-character' ).textContent = LearnNato.activeChar.character.toUpperCase();
        }
    },

    /**
     * Get a random unsolved character from the list.
     */
    getNextUnsolvedCharacter: () => {
        const unsolvedChars = window.nato.filter( char => {
            return false === char.success;
        } );

        return unsolvedChars[ Math.floor( Math.random() * unsolvedChars.length ) ];
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

                if ( 'hint' === event.target.dataset.action  ) {
                    LearnNato.showHint();
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
        let guess = LearnNato.els.guessField.value;

        if ( ! guess ) {
            LearnNato.renderNotice( 'Enter a guess for this character\'s code word.', 'error' );
            return;
        }

        // Clear out any preexisting notices from either empty guesses or wrong ones.
        LearnNato.els.notices.innerHTML = '';

        guess = guess.toLowerCase().trim();

        if ( LearnNato.activeChar.codeWords.includes( guess ) ) {
            LearnNato.handleSuccessfulGuess();
        } else {
            LearnNato.els.guessField.value = '';
            LearnNato.renderNotice( LearnNato.getWrongGuessMessage(), 'error' );
        }
    },

    /**
     * On a successful guess, update the character's success status, refresh results, and do next game loop tick.
     */
    handleSuccessfulGuess: () => {
        const charIndex = window.nato.findIndex( char => {
            return char.character === LearnNato.activeChar.character;
        } );

        window.nato[ charIndex ].success = true;
        LearnNato.renderResults();
        LearnNato.gameLoop();
    },

    /**
     * Render results.
     */
    renderResults: () => {
        let results = '';

        // Clear out any preexisting notices.
        LearnNato.els.notices.innerHTML = '';

        window.nato.forEach( char => {
            results += `<span class="result" data-character="${char.character}" data-success="${char.success}">${char.character.toUpperCase()}</span>`;
        } );

        LearnNato.els.results.innerHTML = results;
    },

    /**
     * Render a notice (usually an error notice).
     *
     * @param {string} noticeMessage The notice message to render.
     * @param {string} noticeType Optional notice type, default is error.
     */
    renderNotice: ( noticeMessage, noticeType = 'error' ) => {
        switch ( noticeType ) {
            case 'info':
                LearnNato.els.notices.innerHTML = `<span class="notice notice-info">${noticeMessage}</span>`;
                break;
            case 'error':
            default:
                LearnNato.els.notices.innerHTML = `<span class="notice notice-error">${noticeMessage}</span>`;
                break;
        }
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
    },

    /**
     * Render a hint.
     *
     * @return {string}
     */
    showHint: () => {
        let hint = LearnNato.activeChar.codeWords[0];
        LearnNato.renderNotice( `Code word: "${hint}"`, 'info' );
    }

};
