0 - Responsive Stage

Note that the use of a component wapping Application and `onInit` to prevent errors when trying to draw before the application is initialized. 

The stage automatically resizes using `resizeTo`, referencing the parent div - the square in the center is automatically adjusted to stay in the center of the stage as it moves, using a listener attached to the app.  