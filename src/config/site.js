var siteServer = 'http://localhost:5000'
exports.Site = {
    ori: siteServer,
    getProduct:`${siteServer}/product/get-product`,
    uploadProduct:`${siteServer}/product/upload-product`,
    updateProduct:`${siteServer}/product/update-product`,
    removeProduct:`${siteServer}/product/remove-product`,
    registerAdmin:`${siteServer}/user/register-admin`,
    loginAdmin:`${siteServer}/user/login-admin`
    
}