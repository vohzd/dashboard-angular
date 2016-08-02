"use strict";

// defines how to interface with the publish/subscribe pattern in firing events all across the codebase
function subscriptionFactory($rootScope){

	return {

		broadcast(trigger, payload){
			// down the scope
			$rootScope.$broadcast(trigger, payload)
		},

		emit(objArgs){
		/*	--- 
			objArgs
			---
			type: object
			purpose: configuration object to flexibly call $on
			properties:
				"requestedAction" <- the target event name as specified within $on
				"targetProperty" <- the property name in currentUserMeta which matches a widget
				"listenerCallback" <- the subsequent $on method to call 
				"transportedPayload" <- defines a way of passing meta back and forth
		*/
			$rootScope.$emit(objArgs.requestedAction, objArgs);
		}

	}

}

export default subscriptionFactory;
