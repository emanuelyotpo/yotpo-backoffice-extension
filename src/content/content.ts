let shopify = window['Shopify']
shopify = JSON.parse(JSON.stringify(shopify))
window.postMessage({ type: 'FROM_PAGE', data: shopify })
// window.postMessage({ type: "FROM_PAGE", data: shopify }, "*")
