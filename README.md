# beet-reporter

The articles on the Sugar Beet Grower's site don't have anything corresponding to an article summary, so I wasn't able to fulfill that part of the spec.

For some reason I decided to do the front end with React, and I wasted a lot of time working out how to make a single repo having both an Express server and a React site that would play nice together. I am a bit proud of how I managed to do the note editing feature. You click on the note text and it turns into an input element and takes focus. If you remove focus or type `ENTER`, it turns back into plain text and saves the edit. Typing `ESC` does the same but discards the edit. The manipulation of focus and the cursor means that you have to use refs and `componentDidUpdate` to do this in React.