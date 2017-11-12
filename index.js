
const project = {
    participants: [ { firstName: 'Andrey', lastName: 'Marchenko', seniorityLevel: 'intermediate' } ],
    pricing: {
    'junior': 25,
    'jmiddle': 50,
    'senior': 100,
    'intermediate':150
},
    isBusy: false,

    /* implement initialization of the object */
    /* participants - predefined array of participants */
    /* pricing - predefined object (keyvalue collection) of pricing */
    init (participants, pricing) { 
		if(participants !== undefined) {
			this.participants=participants;
		}
		if(pricing!==undefined) {
			this.pricing=pricing;
		}
    },

    /* pass found participant into callback, stops on first match */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with found participant as argument or with null if not */
    /* callbackFunction (participant) => {} */
    findParticipant(functor, callbackFunction) { 
			if (this.isBusy)
    		return false;
		this.isBusy= true;
    	setTimeout(function(){
		let participant = null;
	 	 for (let i of this.participants) {
	       if(functor(i)) {
	   		participant = i;
	   		break;
	       }
	     }
 		callbackFunction(participant);
 		},500);
		this.isBusy= false;
    },

    /* pass array of found participants into callback */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
    /* callbackFunction (participantsArray) => {} */
    findParticipants(functor, callbackFunction) {
    	if (this.isBusy)
    		return false;
		this.isBusy= true;
    	setTimeout(function(){
    			let participants =  [];
	 	 for (let i of this.participants) {
	       if(functor(i)) {
	   		participants.push(i);
	       }
	     }
 		callbackFunction(participants);
		},500);
		this.isBusy= false;
	},

    /* push new participant into this.participants array */
    /* callbackFunction - function that will be executed when job will be done */
    /* (err) => {} */
    addParticipant(participantObject, callbackFunction) {
   				if (this.isBusy)
    				return false;
				this.isBusy= true; 
    		setTimeout(function(){
	 			this.participants.push(participantObject);
			   		if(participantObject.seniorityLevel !== undefined)
			   			callbackFunction();
			   		else
			   			callbackFunction({});
	 			callbackFunction(participants);
			},500);
			this.isBusy= false;
    },

    /* push new participant into this.participants array */
    /* callback should receive removed participant */
    /* callbackFunction - function that will be executed with object of removed participant or null if participant wasn't found when job will be done */
    removeParticipant(participantObject, callbackFunction) {
    		if (this.isBusy)
    				return false;
				this.isBusy= true; 
    		setTimeout(function(){
    	var index = -1; 
    	var remove = null;
    	for (var i=0;i < this.participants.length;i++) {
    		if (participants [i].firstName == participantObject.firstName && participants [i].lastName == participantObject.lastName && participants [i].seniorityLevel == participantObject.seniorityLevel )
    			 index = i;

    	}
    	if (index !== -1)
    	{
    		var remove = this.pparticipants.splice(index);
    	}
    	callbackFunction(remove);
    	},500);
			this.isBusy= false;
    },

    /* Extends this.pricing with new field or change existing */
    /* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */
    setPricing(participantPriceObject, callbackFunction) { 
    	    		if (this.isBusy)
    				return false;
				this.isBusy= true; 
    		setTimeout(function(){
    	 for (var key in participantPriceObject) {
    	 		if (!pricing.hasOwnProperty(key)) { 
    		pricing[key] = participantPriceObject[key];
			}
		}
    	callbackFunction();
    	},500);
			this.isBusy= false;
    },

    /* calculates salary of all participants in the given period */
    /* periodInDays, has type number, one day is equal 8 working hours */
    calculateSalary(periodInDays) {
		let sum = 0; 
    	for (var i=0;i < this.participants.length;i++) {
    		let meaning = this.participants [i].seniorityLevel
    		let hourPrice = this.pricing[meaning];
    		sum += periodInDays * hourPrice*8;
    	}
    	return sum;
   }		
}
 const ProjectModule = (function() {
            let _project;
            return {
                getInstance: function() {
                    if (!_project) {
                      _project = function() { return project; }();
                    }
                    return _project;
                }
            }
        })();


module.exports = {
    firstName: 'Andrey',
    lastName: 'Marchenko',
    task: ProjectModule
}
