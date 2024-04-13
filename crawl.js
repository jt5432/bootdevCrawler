const { JSDOM } = require("jsdom")

async function crawlPage(baseURL, currentURL, pages){

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    } else {
        pages[normalizedCurrentURL] = 1
    }

    let resp
    try{
    resp = await fetch(currentURL)
    console.log(`crawling: ${currentURL}`)

    if (resp.status > 399){
        throw new  Error(`server responded with status: ${resp.status}`)
        return pages
    }
    
    const contentType = resp.headers.get("content-type")
    if(!contentType.includes("text/html")){
        throw new Error(`non html response, content type: ${contentType}`)
        return pages
    }
    const HTMLBody = await resp.text()
    const nextURLs = getURLsFromHTML(HTMLBody, baseURL)
//    console.log(nextURLs)
    for (const url of nextURLs){
        pages = await crawlPage(baseURL, url, pages)
    }


    } catch (err){
        console.log(`An error occured: ${err.message}, on page: ${currentURL}`)
    }



    return pages
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, hostPath.length - 1)
    }
    return hostPath
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const urlList = dom.window.document.querySelectorAll('a')
    for (const url of urlList){
        if (url.href.slice(0,1) === '/'){
            urls.push(`${baseURL}${url.href}`)
        } else if (url.href.slice(0,4) === 'http')[
            urls.push(url.href)
        ]
    }
    return urls
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}