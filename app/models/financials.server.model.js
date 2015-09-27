var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var FinancialsSchema = new Schema({	
	lat: {type: Number,
		default: null},
	lon: {type: Number,
		default: null},
	housing: {type: Number,
		default: 0},
	electricity: {type: Number,
		default: 0},
	water: {type: Number,
		default: 0},
	phone: {type: Number,
		default: 0},
	internet: {type: Number,
		default: 0},
	cable: {type: Number,
		default: 0},
	hasCar: {type: Boolean,
		default: false},
	carInsurance: {type: Number,
		default: 0},
	medical: {type: Number,
		default: 0},
	healthInsurance: {type: Number,
		default: 0},
	debts: {type: Number,
		default: 0},
	groceries: {type: Number,
		default: 0},
	gas: {type: Number,
		default: 0},
	savingsPercent: {type: Number,
		default: 0},
	weeklyFunMoney: {type: Number,
		default: 0},
	created:{
		type: Date,
		default: Date.now	
	}
});


FinancialsSchema.virtual('totalMonthlyNeed').get(function(){
	var total = 0.0;
	
	total = this.housing + this.electricity + this.water +
		this.phone + this.internet + this.cable + this.carInsurance +
		this.medical + this.healthInsurance + this.debts +
		((this.groceries + this.gas) * 4);

	return total;
});

FinancialsSchema.virtual('totalMonthlyWant').get(function(){
	var total = 0.0;
	
	total += this.totalMonthlyNeed
	total += this.weeklyFunMoney * 4.0;
	
	var savings = total * this.savingsPercent;
	
	return savings + (this.weeklyFunMoney * 4.0);
});

FinancialsSchema.virtual('totalMonthly').get(function(){
	return this.totalMonthlyNeed + this.totalMonthlyWant;
});


FinancialsSchema.set('toJson', {getters:true, virtuals:true});

mongoose.model('Financials', FinancialsSchema);