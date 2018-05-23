module.exports = function(RED) {
	function SimpleCommConfigNode(config) {
		this.address = config.address;

		RED.nodes.createNode(this, config);
	}
	RED.nodes.registerType("simplecomm-config", SimpleCommConfigNode);
}
