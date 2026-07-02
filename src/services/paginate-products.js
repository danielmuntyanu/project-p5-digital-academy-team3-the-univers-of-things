export default function paginateProducts (products, itemsPerPage = 8) {
    
    if (!products || !Array.isArray(products) || products.length == 0) {
        return [];
    }


    const paginated = [];

    // [ 
    //     [1, 2, 3, 4, 5, 6, 7, 8], 
    //     [9, 10., 11] 
    // ]

    let curPage = 0;
    let curPageIndex = 0;

    products.forEach((item) => {
        if (curPageIndex === 0) {
            paginated.push([]);
            curPage ++;
        }
        
        paginated[curPage - 1].push(item);
        curPageIndex ++;
        
        if (paginated[curPage - 1].length >= itemsPerPage && curPageIndex >= itemsPerPage - 1) {
            curPageIndex = 0;
        }
        
    });

    return paginated;
}