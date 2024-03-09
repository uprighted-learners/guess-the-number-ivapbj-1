### This file has been added because the standard feedback pull request and branch are missing or have been deleted ###

Functionality:
        index.js functions correctly and has input security if the user enters a non-number character, however it is missing cheat detection and the upper bound can be bypassed by a user if they enter a number higher than their upper bound.
        reverse-game.js functions correctly and only breaks slightly when a non-number character is entered, however this is negligible as it does not affect the game

        Suggestions: 
            -consider implementing cheat detection by making sure the player cannot lie to the computer and if the player lies, the computer should either ask again or quit the game
            -consider adding a check for if the player enters a number above their set number and not allowing them to do so by either ending the game or restarting it
            -consider adding a check to ensure the player is entering a number within the reverse-game.js

        Icebox:
            -Index.js has replay option, but does not tell the user how many tries were taken
            -reverse-game.js does not have a replay option, nor tells the user how many tries were taken
            -additionally the games are in separate files
            As such, I cannot award the bonus point
        
    Final Result: 2

Readability:
        Good job with your indentation and spacing, everything is readable as is but more comments would be appreciated both for any reviewers and for yourself in order to test and bug fix your code

        Suggestions:
            - In the future, try to add comments that tell me what each conditional, loop, function, or prompt is, do, and what you expect their outcome to be
            - This is suggested so that you (and any code reviewers at your future jobs) can easily read over your code without any issues when handling more complex items
            -Example:
                function findCircumference(radius){
                    return 2 * Math.PI * radius
                } //the function above takes a parameter of radius and returns the circumference of a circle with that radius
                        (what is)                           (what do)                      (what is expected outcome)   

    Final Result: 2

Organization:
        Items within each file are organized logically and linearly so that their processes would happen as you move down each function and the page as a whole
        
        Suggestions:
            No issues with organization or naming conventions, however in the future do try to rename your files so that they match what is within them, such as renaming index.js to something more descriptive
            Additionally, do ensure that your renamed files match the naming convention of other files in your project

    Final Result: 3