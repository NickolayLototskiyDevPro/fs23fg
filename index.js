
const project = {
    participants: [],
    pricing: {
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
    	 var self = this;
			if (this.isBusy)
    		return false;
		this.isBusy= true;
    	setTimeout(function(){
		let participant = null;
	 	 for (let i of self.participants) {
	       if(functor(i)) {
	   		participant = i;
	   		break;
	       }
	     }
 		callbackFunction(participant);
 		},50);
		this.isBusy= false;
    },

    /* pass array of found participants into callback */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
    /* callbackFunction (participantsArray) => {} */
    findParticipants(functor, callbackFunction) {
    	var self = this;
    	if (this.isBusy)
    		return false;
		this.isBusy= true;
    	setTimeout(function(){
    			let participants =  [];
	 	 for (let i of self.participants) {
	       if(functor(i)) {
	   		participants.push(i);
	       }
	     }
 		callbackFunction(participants);
		},50);
		this.isBusy= false;
	},

    /* push new participant into this.participants array */
    /* callbackFunction - function that will be executed when job will be done */
    /* (err) => {} */
    addParticipant(participantObject, callbackFunction) {
       var self = this;
       if (this.isBusy)
            return false;
            this.isBusy= true; 
      setTimeout(function() {
            var err;
            if(participantObject.seniorityLevel !== undefined) {
             self.participants.push(participantObject);
        }
        else {
         err = {};
        }
        callbackFunction(err);
       },50);
       this.isBusy=false;
    },

    /* push new participant into this.participants array */
    /* callback should receive removed participant */
    /* callbackFunction - function that will be executed with object of removed participant or null if participant wasn't found when job will be done */
   removeParticipant(participantObject, callbackFunction) {
     var self = this;
      if (this.isBusy)
        return false;
    this.isBusy= true; 
      setTimeout(function(){
          var remove = null;
     for (var i=0;i < self.participants.length;i++) {
      if (self.participants[i] == participantObject) {
        remove = self.participants[i];
        self.participants.splice(i);
        break;
        }
    }
     callbackFunction(remove);
     },50);
   this.isBusy= false;
    },

    /* Extends this.pricing with new field or change existing */
    /* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */
    setPricing(participantPriceObject, callbackFunction) { 
    			var self = this;
    	    		if (this.isBusy)
    				return false;
				this.isBusy= true; 
    		setTimeout(function(){
    	self.pricing = participantPriceObject;
    	callbackFunction();
    	},50);
			this.isBusy= false;
    },

    /* calculates salary of all participants in the given period */
    /* periodInDays, has type number, one day is equal 8 working hours */
    calculateSalary(periodInDays) {
		let sum = 0; 
    	for (var i=0;i < this.participants.length;i++) {
    		let meaning = this.participants [i].seniorityLevel
    		let hourPrice = this.pricing[meaning];
            if (hourPrice == undefined)
             throw "Error";
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
    task: ProjectModule.getInstance()
}
