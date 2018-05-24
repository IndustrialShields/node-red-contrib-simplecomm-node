const simplecomm = require("simplecomm");

module.exports = function(RED) {
	function SimpleCommOutNode(config) {
		RED.nodes.createNode(this, config);

		this.config = RED.nodes.getNode(config.config);

		this.on("input", (msg) => {
			let dest = msg.destination;
			if (dest === undefined) {
				dest = config.destination || 0;
			}
			let cmd = msg.type;
			if (cmd === undefined) {
				cmd = config.type || 0;
			}
			let data = msg.payload;
			if (data === undefined) {
				data = [];
			}
			if (this.config) {
				simplecomm.address = this.config.address;
			}
			this.send({
				payload: simplecomm.toBuffer(data, dest, cmd),
			});
		});
	}
	RED.nodes.registerType("simplecomm-out", SimpleCommOutNode);
}
