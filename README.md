# gatsby-source-woocommerce

Source plugin for [Gatsby](https://www.gatsbyjs.org/). Pulls in data from protected routes via the [WooCommerce REST API](http://woocommerce.github.io/woocommerce-rest-api-docs/) with credentials.

## Install

`npm install --save gatsby-source-woocommerce`

## How to Use

```javascript
// In gatsby-config.js
plugins:[
  {       
    resolve: "@massivdash/gatsby-source-woocommerce",
    options: {
     // Base URL of Wordpress site
     
      // This counts controls the API get with ?per_page=
      // default: 10
      itemCount: 20,

      api: 'wordpress.domain',
      // true if using https. false if nah.
      https: false,
      api_keys: {
        consumer_key: <key>,
        consumer_secret: <secret>,
      },
      // Array of strings with fields you'd like to create nodes for...
      fields: ['products']
    }
  }
]
```

## Currently Supported Fields

- Products
- Customers
- Orders
- Reports
- Coupons


### FORK

This is fork from https://registry.npmjs.org/gatsby-source-woocommerce/ 

### @SPACEGHOST

03.03. 2019
Added support for page pagination via ?per_page= request for displaying more than 10 products in a single call. 


