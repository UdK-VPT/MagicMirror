var NodeHelper = require("node_helper");
var PetWood = require("./PetWood.js");

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node helper for: " + this.name);
        this.petWood = false;
	},

	socketNotificationReceived: function(notification, payload) {
        var me = this;
        //console.log(notification, payload);
        switch (notification) {
            case "OPEN":
                pw = me.petWood;
                try {
                    var pw = new PetWood(payload.port, true);
                    me.petWood = pw;
                } catch (e) {
                    console.log("Could not open port - maybe already opened?");
                }
                pw.on('sliderMoved',    function(v) {me.sendSocketNotification("sliderMoved",    {value: v,})});
                pw.on('sliderEntered',  function()  {me.sendSocketNotification("sliderEntered",  {})});
                pw.on('sliderReleased', function()  {me.sendSocketNotification("sliderReleased", {})});
                pw.on('sliderSwipe',    function(v) {me.sendSocketNotification("sliderSwipe",    {direction: v,})});
                pw.on('buttonPressed',  function(v) {me.sendSocketNotification("buttonPressed",  {button: v,})});
                pw.on('buttonReleased', function(v) {me.sendSocketNotification("buttonReleased", {button: v,})});
                break;
            case "REINIT":
                me.petWood.reInit(0);
                break;
            case "BUTTON":
                me.petWood.setButton(payload.button, payload.state);
                break;
        }
	},
});
