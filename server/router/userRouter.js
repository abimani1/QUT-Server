const express=require('express')
const router=express.Router()

const {postQuot,viewRfqVendor,viewVendorQuot,updatequot,QuotIdVendor,VendorQuot,AccpetQuote,ViweAccpetQuote}=require('../controller/quotController')
const{signupUser,signinUser,userData,vendorData,vendorSignin,OTPsend}=require('../controller/userController');
const {rfqPost,viewRfq,getOneRfq,updateRfq,viewQuot}=require('../controller/rfqController')

//user Login
router.route("/signup").post(signupUser);
router.route("/signin").post(signinUser);
router.route("/userData").post(userData);
// router.route("/getAllData").post(userData);

// client
router.route("/postRfq").post(rfqPost);
router.route("/viewRfq").post(viewRfq);
router.route("/viewRfq/:id").get(getOneRfq);
router.route("/rfq/update/:id").post(updateRfq);
router.route("/viewQuot").post(viewQuot)
router.route("/accpte/quot/vendor").post(AccpetQuote)
router.route("/sendotp").post(OTPsend)
//vendor
router.route("/vendor/signup").post(vendorData);
router.route("/vendor/signin").post(vendorSignin);
router.route("/vendor/Quotion").post(postQuot);
router.route("/vendor/viewRfq").post(viewRfqVendor);
router.route("/vendor/viewQuot").post(VendorQuot);
router.route("/client/viewQuot").post(viewVendorQuot);
router.route("/vendor/wnp/client/rfq").get(ViweAccpetQuote)
// router.route("/vendor/quot/update/:id").post(updatequot);
router.route("/vendor/viewquot/:id").get(QuotIdVendor);

module.exports=router
