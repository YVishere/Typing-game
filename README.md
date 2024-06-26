Errors known -
1. Hitting backspace does not move the highlighter to the previous word
2. Time does not start counting from when the first character is entered ----> Can be seen as a feature rather than a bug?

Fixes I have tried or have in mind but haven't implemented yet
1. Adding a keydown event looker for backspace whithin the input event looker does and checking if the user has moved to the previous word after removing a backspace
     does not work and the error being thrown is that the childnode of quoteThing (the words) do not have .className() attribute anymore after the second backspace.
2. Adding a keypress event looker for alphabets whithin the input event looker and starting the timer from there might work.
