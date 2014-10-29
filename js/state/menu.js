"use strict";
window.NewGame.state.menu = {
	create: function(){
		// you can create menu group in map editor and load it like this:
		// mt.create("menu");
		this.game.state.start("play");
	},
	
	update: function(){
		
	}
};