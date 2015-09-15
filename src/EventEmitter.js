import Private from "js.private";


class EventEmitter {

  on( event, callback, context = this, oneCall = false ){
    $( this ).getCallbacks( event ).push({ callback, context, oneCall });
    return this;
  }

  one( event, callback, context ){
    this.on( event, callback, context, true );
    return this;
  }

  off( event, callback, context ){
    if( event ){
      let callbacks = $( this ).getCallbacks( event );
      callbacks.slice( 0 ).forEach( ( item ) => {
        if( ( !callback || callback == item.callback ) && ( !context || context == item.context ) )
          $( this ).removeCallback( callbacks, item );
      });
    }else $( this ).events = {};
    return this;
  }

  trigger( event, ...args ){
    let callbacks = $( this ).getCallbacks( event );
    callbacks.slice( 0 ).forEach( ( item ) => {
      item.callback.apply( item.context, args );
      if( item.oneCall ) $( this ).removeCallback( callbacks, item );
    });
    return this;
  }

}


const $ = Private({

  events: {},

  getCallbacks: function( event ){
    return $( this ).events[ event ] = $( this ).events[ event ] || [];
  },

  removeCallback: function( from, item ){
    from.splice( from.indexOf( item ), 1 );
  }

});


export default EventEmitter;
