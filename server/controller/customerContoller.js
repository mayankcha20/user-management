const customerm=require('../model/customerm');
const mongoose=require('mongoose');  
  
  
  exports.homepage=async (req,res)=>{
   
const message=await req.flash('info');
        const locals={
            title:"Node js",
            description:"Node js User Management System"
        } 
         try{ 
        const customers= await customerm.find({});
            res.render('index',{locals, message , customers});
        }
        catch(error){
            console.log(error);
        }
       
   
}
exports.addCustomer=async (req,res)=>{
   

    const locals={
        title:"Add customer",
        description:"Node js User Management System"
    }
    res.render('customer/add',locals);

}
exports.postCustomer=async (req,res)=>{
   console.log(req.body);

   const newcustomer=new customerm({
    firstname:req.body.firstName,
    lastname:req.body.lastName,
    tel:req.body.tel,
    email:req.body.email,
    detail:req.body.details
   })
   try{ 

    await customerm.create(newcustomer);
    await req.flash('info','New customer added successfully');
    res.redirect('/');
   }catch(err){
    console.log(err)

   }
    

}

exports.view=async (req,res)=>{
             try{ 
                const customer=await customerm.findOne({_id:req.params.id});
                const locals={
                    title:"view customer data",
                    description:"Node js User Management System"
                } 
                res.render('customer/view',{locals , customer});
            }
            catch(error){
                console.log(error);
            }
    }
    exports.edit=async (req,res)=>{
   
   
        try{ 
           const customer=await customerm.findOne({_id:req.params.id});
           const locals={
               title:"edit customer data",
               description:"Node js User Management System"
           } 
           res.render('customer/edit',{locals , customer});
       }
       catch(error){
           console.log(error);
       }
}
exports.editpost = async (req, res) => {
    try {
      await customerm.findByIdAndUpdate(req.params.id,{
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.detail,
        updatedAt: Date.now()
      });
      await res.redirect(`/edit/${req.params.id}`);
      
      console.log('redirected');
    } catch (error) {
      console.log(error);
    }
  }

  exports.delete = async (req, res) => {
    try {
      await customerm.deleteOne({ _id: req.params.id });
      res.redirect("/")
    } catch (error) {
      console.log(error);
    }
  }

  /**
 * Get /
 * Search Customer Data 
*/
exports.search = async (req, res) => {

    const locals = {
      title: "Search Customer Data",
      description: "Free NodeJs User Management System",
    };
  
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const customers = await customerm.find({
        $or: [
          { firstname: { $regex: new RegExp(searchNoSpecialChar, "i") }},
          { lastname: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        ]
      });
  
      res.render("search", {
        customers,
        locals
      })
      
    } catch (error) {
      console.log(error);
    }
  
  }