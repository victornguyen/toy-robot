# Toy Robot Simulator

A JavaScript-based solution to PROBLEM.md with a basic UI available at: [http://victornguyen.github.io/toy-robot][ui]

## Running

To run locally, assuming Node and npm are available, you'll need gulp:

	npm install -g gulp

Clone the repo and:

	npm install

Build the app:

	gulp build

Start a server:

	gulp serve
	
Go to localhost:3000

Or you can just go to: [http://victornguyen.github.io/toy-robot][ui]


## Tests

View them at: [http://victornguyen.github.io/toy-robot/test][tests]

Or run them locally with:

	gulp test
	
The tests were written with [Mocha] and [Chai], using the somewhat wordy, but fun, "expect" assertion style.


## Development Notes

- The bulk of the app is divided into two parts:
	1. The `parser` module, which is responsible for validating and parsing string inputs into valid command arrays.
	2. The `simulation` module, which executes those commands and outputs the result.
- This approach allowed the separation of the validation and execution of commands by splitting them them into two stages. The `simulation` only ever receives valid commands because `parser` will process the input upfront. Although in hindsight, validating while executing could have the advantage of being able to raise errors and give more dynamic input feedback to the user during execution.
- There's also an `index` module, which runs the [UI][ui].
- [Browserify] is used to bundle up the modules for browser consumption.
- I employed a TDD approach while writing this app. Tests were written with [Mocha] and [Chai]. Full disclosure: I rarely do this as a front-end developer who is often handcuffed to the DOM. So this was really fun.
- I thought about doing a `Robot` and `Table` abstraction, but couldn't reconcile which would be responsible for maintaining position/orientation and reporting. I only saw value in this abstraction if `Table` had to maintain a collection of n `Robots`, and if a language for issuing commands to any or all robots was established. That's just me though :B
- Regexes were used to validate command strings. This was particularly useful when validating PLACE commands and using capturing groups to extract the X,Y,F data. But they're not exactly pretty (IMHO) and adding new commands to the application would involve going back into Regex Land.


[ui]: http://victornguyen.github.io/toy-robot
[tests]: http://victornguyen.github.io/toy-robot/test
[Mocha]: http://mochajs.org/
[Chai]: http://chaijs.com/
[Browserify]: http://browserify.org/
