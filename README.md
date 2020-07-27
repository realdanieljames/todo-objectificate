# Todo Objectificate

### What We're Doing

We'll be simplifying our code using objects and JSON (instead of sub-arrays and CSV), allowing us to easily implement a priority feature. Then we'll be able to add more features!


### Steps

##### In the Global Code:

* Change `todos` declaration to using a `let` each todo to `todos`, as we'll be doing some reassignment of that variable for simplicity in this project.


##### `loadTodos`

We're going to change this function so that it gets our JSON instead of our CSV, fix it up so that the path is always relative, and put the data in our javascript without `.split` or any of that 2D array nonsense.

* Add `__dirname` for relative paths and the link to the correct file (json, not csv!). The first argument, the string that represents the path, should look something like this: `__dirname + '/[path to the file]'`. Make sure that the slash is in there, while the square brackets surrounding your path are, as always, just an indication that you're going to replace that whole thing with an actual value.
* Run JSON.parse on the returned string; it shoudl return an object. Much easier than all that messy CSV splitting! Get rid of all that stuff.
* Now reassign our global `todos` array to be the `todos` property on that object.
* For now, console.log our global `todos` array at the end of this function just to see if it works!


##### `saveTodos`

Going to do everything `loadTodos` did, but in reverse. Same basic structural changes, though!

* Get rid of everything before the `writeFileSync` call (which we'll change but still use).
* To the beginning of the first argument of that `writeFileSync` call, add the `__dirname` value, just as in the previous function.
* Now for making the `newContents` variable actually have a value (preferably the value we want to write). First step: create an object with a `todos` property, and set that `todos` property to be our global `todos` array.
* Next: create a `newContents` variable, and set it to the result of calling `JSON.stringify` on our object. This will give us a JSON string we can write to the file. (Feel free to look up how to add whitespace when writing to the file if you want to be able to examine that JSON file directly in your editor.)
* Now that we have a value in our `newContents` variable, our `writeFileSync` call has something to write. Let's move on!


##### `displayTodos`

Currently, we're looping through, giving each `todo` its own variable instead of the awkward `todos[i]`, and then giving each of the properties (`text`, `isComplete`, and `priority`) their own variables for clarity as well. Let's change that!

* Now that they're objects, our properties have proper names themselves. So get rid of the text, isComplete, and priority variables.
* Now we can replace them with `todo.text`, `todo.isComplete`, and `todo.priority` in the rest of the function. Shorter, more readable code. Thanks, objects!
* You can still make variables for those properties if you want with code like this:

```javascript
const text = todo.text;
```

Your mileage may vary on whether that's worth the extra lines of code!


##### The Rest

* Now you try editing the rest of our functions to match. Log out what values you're looking at when the app is not working!


##### Hints

* `add` is going to create an object to push into our todos array, based on our user's answer. Remember that `isComplete` is now a boolean (not a string we have to be careful about spelling for!), and `priority` should be... whatever you think the default priority should be.
* `remove`... could it simply stay the same? If not, what needs to change?
* For `complete` and `uncomplete`, remember that you `isComplete` is a boolean!


### Stretch Goals (in rough order of difficulty)

* Add the ability to toggle the priority between 1 and 2. You'll need to add it to the menu, give a followup question (like the other menu options!), and then find the todo they've chosen and toggle its `priority` property. 
* Add an option to remove all completed todos. Once you've removed them from the `todos` array, you can call `saveTodos`, and it will save your new, slimmer `todos` to the JSON file. But how do we remove them? There are multiple ways to do this. My favorite way is to loop through and identify which ones are NOT complete, as those are the ones you'll want to keep, and then add them to a new array. Then, somehow, get them into `todos`. But there are other ways as well!
* Add a category feature. First, you'll want to manually add a `category` property to the JSON and find a good way for `displayTodos` to print it out. Then you'll want to add the ability for your `add` function to add a new todo with a category. Asking a two-part followup question ("What todo would you like to add?" plus "And what's its category?") is difficult with our current toolset;  when you get it, try storing the todo text answer in a global variable called something like `currentText`, which you can then refer to when you get your answer to the followup question, so you can place BOTH pieces of info in your new todo object.
* If you complete the previous goal, try adding the ability to view all todos that belong to a particular category. I'd recommend making it a new display function, though it will be similar to `displayTodos`.
* At this point, let's go whole hog and make `category` into `categories`, an array that can hold multiple category strings. We'll definitely have to change the previous stretch goal's display function to make it work with an array!