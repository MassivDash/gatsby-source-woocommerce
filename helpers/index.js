const crypto = require("crypto");
const colorized = require(`../output-color`);

const processNode = (createNodeId, node, fieldName, verbose) => {
  const nodeId = createNodeId(`woocommerce-${fieldName}-${node.id}`)
  const nodeContent = JSON.stringify(node);
  const nodeContentDigest = crypto
    .createHash('md5')
    .update(nodeContent)
    .digest('hex')

  const nodeData = Object.assign({}, node, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: `WC${capitalize(fieldName)}`,
      content: nodeContent,
      contentDigest: nodeContentDigest,
    },
  })
  if(verbose) {

    if(fieldName === 'products'){
      console.log(colorized.out(`
       GATSBY NODE ID: ${nodeId}
       IMPORTING PRODUCT: ${node.id}, ${node.name}
       VARIATIONS: ${node.variations.length}
        `, colorized.color.Font.FgMagenta));
    }
    else {
      console.log(colorized.out(`
       GATSBY NODE ID: ${nodeId}
       NODE WOO RESPONSE: ${nodeContent}
        `, colorized.color.Font.FgMagenta));
    }
    

    
  }
  
  return nodeData
};

module.exports = { processNode };

// Helper Helpers
function capitalize(s){
  return s[0].toUpperCase() + s.slice(1);
}
