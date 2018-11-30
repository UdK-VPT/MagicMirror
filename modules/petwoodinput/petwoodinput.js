
Module.register("petwoodinput",{

	// Default module config.
	defaults: {
		serPort: "/dev/ttyUSB0",
	},

	start: function() {
		var wrapper = document.createElement("div");
		this.d = wrapper;
		this.sendSocketNotification("OPEN", {port: this.config.serPort});
		this.but = [0, 0]; // button state
		this.sla = 0;      // slider active?
		this.slv = 64;     // slider value
		this.sls = 0;      // slider swipe direction
	},

	getDom: function() {
		var a = (this.sla ? 'O' : 'X');
		var l = '-'.repeat(this.slv) + a + '-'.repeat(127-this.slv);
		var s = ((this.sls < 0) ? 'L': ((this.sls > 0) ? 'R' : '-'));
		this.d.innerHTML = `<small><small><pre>{${s}} [${this.but[1]}](${l})[${this.but[0]}]</pre></small></small>`;
		return this.d;
	},

	socketNotificationReceived: function(n, p) {
        switch (n) {
			case "sliderEntered":  this.sla = 1; this.sls = 0; break;
			case "sliderReleased": this.sla = 0; break;
			case "sliderMoved":    this.slv = p.value; break;
			case "sliderSwipe":    this.sls = p.direction; break;
			case "buttonPressed":  this.but[p.button] = 1; break;
			case "buttonReleased": this.but[p.button] = 0; break;
        }
		this.updateDom();
	},
});
