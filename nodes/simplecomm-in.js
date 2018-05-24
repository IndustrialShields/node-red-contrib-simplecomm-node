const simplecomm = require("simplecomm");

module.exports = function(RED) {
	function SimpleCommInNode(config) {
		RED.nodes.createNode(this, config);

		this.config = RED.nodes.getNode(config.config);

		this.on("input", (msg) => {
			let metadata = {};
			if (msg.ip) {
				metadata.ip = msg.ip;
			}

			let packets = simplecomm.fromBuffer(msg.payload);
			for (let packet of packets) {
				if (this.config.address == packet.destination) {
					if (typeof config.type == "undefined" || config.type === "" || config.type == packet.type) {
						this.send({
							payload: packet.data,
							destination: packet.destination,
							source: packet.source,
							type: packet.type,
							metadata: metadata,
						});
					}
				}
			}
		});
	}
	RED.nodes.registerType("simplecomm-in", SimpleCommInNode);
}
