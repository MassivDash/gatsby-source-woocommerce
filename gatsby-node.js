const WooCommerceAPI = require('woocommerce-api');
const { processNode } = require('./helpers');
const colorized = require(`./output-color`);

exports.sourceNodes = async (
  { boundActionCreators, createNodeId },
  configOptions
) => {
  const { createNode } = boundActionCreators;
  delete configOptions.plugins;

  const { api, https, api_keys, fields, itemCount, verbose } = configOptions;

  // set up WooCommerce node api tool
  const WooCommerce = new WooCommerceAPI({
    url: `http${https?'s':''}://${api}`,
    consumerKey: api_keys.consumer_key,
    consumerSecret: api_keys.consumer_secret,
    wpAPI: true,
    version: 'wc/v1',
  });

 

  // Fetch Node and turn our response to JSON
  const fetchNodes = async (fieldName) => {

    let pag = `${fieldName}?per_page=${itemCount}`
    if (itemCount === null || typeof itemCount === 'undefined') {
      pag = fieldName
    }
    const res = await WooCommerce.getAsync(pag);
    return JSON.parse(res.toJSON().body);
  };

  // Loop over each field set in configOptions and process/create nodes
  async function fetchNodesAndCreate (array) {

    for (const field of array) {
      const nodes = await fetchNodes(field);
      if (verbose) {
        console.log(colorized.out(`
        ============== WOO FETCHING =====================================

        ITEMS FOUND: ${nodes.length} FOR FIELD: ${field}


        `, colorized.color.Font.FgMagenta));
      }
      nodes.forEach(n=>createNode(processNode(createNodeId, n, field, verbose)));
      if (verbose) {
        console.log(colorized.out(`
        ============== WOO FETCHING ENDED ==============================
        `, colorized.color.Font.FgMagenta));
      }
    }
  }
  






  // Leh go...
  await fetchNodesAndCreate(fields);
  return;
};
