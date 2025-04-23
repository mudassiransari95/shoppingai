
import SummaryApi from './../common/index';

const fetchCategoryWiseProduct=async(category)=>{
    console.log('some',category)
    const response=await fetch(SummaryApi.categorywiseproduct.url,{
        method:SummaryApi.categorywiseproduct.method,
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            category:category
        })
    })
    const dataResponse= await response.json()
    console.log('cotegory wise',dataResponse)

  

    return dataResponse
}
export default fetchCategoryWiseProduct