function printReport(pages){
    console.log('=================')
    console.log('starting report...')
    console.log('=================')
    const sortedPages = sortPages(pages)

    for(const page of sortedPages){
        const url = page[0]
        const hits = page[1]
        console.log(`Found ${hits} internal links to ${url}`)
    }

    
}

function sortPages(pages){
    const pagesArray = Object.entries(pages)
    pagesArray.sort((a,b) => {
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1]
    })
    return pagesArray
}

module.exports = {
    printReport,
    sortPages
}