const backendDomain='https://shoppingbackend-ue6m.onrender.com'


 
const SummaryApi={
    signup:{  
        url:`${backendDomain}/api/register`,
        method:'post'
    },
    signIn:{
        ulr:`${backendDomain}/api/signin`,
        method:'post'
    },
    current_user:{
        url:`${backendDomain}/api/user_details`,
        method:'get'
    },
    logout_user:{
        url:`${backendDomain}/api/userLogout`,
        method:'get'
    },
    allUser:{
        url:`${backendDomain}/api/all-user`,
        method:'get'
    },
    updateUser:{
        url:`${backendDomain}/api/update-user`,
        method:'post'
    },
    uploadproduct:{
        url:`${backendDomain}/api/upload-product`,
        method:'post'
    },
    allProduct:{
        url:`${backendDomain}/api/get-product`,
        method:'get'
    },
    updateproduct:{
        
        url:`${backendDomain}/api/update-product`,
        method:'post'
    },
    categoryproduct:{
        url:`${backendDomain}/api/get-categoryProduct`,
        method:'get'
    },
    categorywiseproduct:{
        url:`${backendDomain}/api/category-product`,
        method:'post'
    },
    productdetail:{
        url:`${backendDomain}/api/product-details`,
        method:"post"
    },
    addToCartProduct:{
        url:`${backendDomain}/api/addtocart`,
        method:"post"
    },
    addToCartProductCount : {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method : 'get'
    },
    addtoCartProductView:{
        url:`${backendDomain}/api/view-card-product`,
        method:'get'
    },
    updateQuantity:{
        url:`${backendDomain}/api/update-cart-product`,
        method:'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : 'get'
    },
    getcategorylist:{
        url:`${backendDomain}/api/getcategorylist/`,
        method:'post'
    }
}
export default SummaryApi