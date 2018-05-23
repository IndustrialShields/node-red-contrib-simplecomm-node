const simplecomm = require("simplecomm");

module.exports = function(RED) {
	function SimpleCommInNode(config) {
		RED.nodes.createNode(this, config);

		this.config = RED.nodes.getNode(config.config);

		this.on("input", (msg) => {
			let packets = simplecomm.fromBuffer(msg.payload);
			for (let packet of packets) {
				if (this.config.address == packet.destination) {
					if (typeof config.command == "undefined" || config.command === "" || config.command == packet.type) {
						this.send({
							payload: packet.data,
							destination: packet.destination,
							source: packet.source,
							command: packet.type,
						});
					}
				}
			}
		});
	}
	RED.nodes.registerType("simplecomm-in", SimpleCommInNode);
}
