"use strict";
window.NewGame.state.play = {
	preload: function(){
		
	},
	
	create: function(){
		//console.log("started pplay state");
		
		this.game.add.sprite(0, 0, 'diamond');
		this.diamond = mt.create("diamond");
		this.diamond.inputEnabled = true;
		this.diamond.input.enableDrag();

	},
	
	update: function(){
		
	}
	
};