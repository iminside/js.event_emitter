### Install

```
npm install js.event_emitter --save
```

### Usage

```javascript

import EventEmitter from "js.event_emitter";

class Cat extends EventEmitter {}

class Dog extends EventEmitter {

	constructor(){ 
		this.name = "Bob";
	}

	gav(){ 
		console.log( this.name + " gav" ); 
	}

	manyGav(){ 
		console.log( this.name + " gav gav gav" ); 
	}

}


let dog = new Dog,
    cat = new Cat;
  
cat.on(                              // attach event handler, call on every trigger
	"run",                           // event name
	dog.gav,                         // event handler
	dog                              // callback context
);

cat.one( "run", dog.manyGav, dog );  // call on first trigger

cat.trigger( "run" );                // > "Bob gav"
                                     // > "Bob gav gav gav"
cat.trigger( "run" );                // > "Bob gav"
cat.trigger( "run" );                // > "Bob gav"

cat.off();                           // detach all handlers of all events
cat.off( "run" );                    // detach all handlers of "run" event
cat.off( "run", dog.gav );           // detach dog.gav handler of "run" event
cat.off( "run", dog.gav, dog );      // detach dog.gav handler of "run" event when context is dog

```

