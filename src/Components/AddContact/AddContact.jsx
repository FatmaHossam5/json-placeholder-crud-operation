import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import ErrorMssage from '../Shared/ErrorMessgae/ErrorMssage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';

export default function AddContact() {
 const {register,handleSubmit,formState:{errors}}=useForm();
 const navigate=useNavigate();
 const [isLoading, setIsLoading] = useState(false);
  const AddContact=(data)=>{
    setIsLoading(true);
    axios.post ('https://jsonplaceholder.typicode.com/users',data).then((response)=>{


      toast.success(`${response.status} Created SuccessFully!`)
      setIsLoading(false);
     
        navigate('/')
     
    
    }).catch((error)=>{
     toast.error(error.message)
    })
  }

  return (
    <>
     <section className="content">
  <div className="container-fluid">
    <div className="row">
      {/* left column */}
      <div className="col-md-8 m-auto py-4">
        {/* general form elements */}
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Add Contact</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
    
      
      <form onSubmit={handleSubmit(AddContact)}>
       {isLoading?<Loading/>:<>
       <div className="card-body  ">
         <div className='form-group row  d-flex justify-content-between align-items-center ' >
           <div className='col-md-6 py-0'>
           <label htmlFor="exampleInputUserName " className=''>UserName</label>
           <input type="text" className={`form-control ${!errors?.username?' border border-info':' border border-danger'}`} id="exampleInputUserName" placeholder="Enter userName"
            {...register('username',
           {required:'userName is required',
           minLength:{
             value:2,
             message:'userName should be greater than two letters',
           },
           maxLength:{
             value:15,
             message:'userName should be less than fifteen letters'
           }
           })} />
           {errors.username&&(<ErrorMssage>{errors?.username?.message}</ErrorMssage>)}
           </div>
    <div className='col-md-6 py-0'>
    <label htmlFor="exampleInputEmail">Email</label>
           <input type="email" className={`form-control  ${!errors?.email?' border border-info':' border border-danger'}`} id="exampleInputEmail" placeholder="Enter Email"
            {...register('email',
            {
             required: "Email is required",
             pattern: {
               value: /^[A-Z0-9.]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
               message: "Invalid email address",
             },
            })} />
               {errors.email && (
         <ErrorMssage>{String(errors?.email?.message)}</ErrorMssage>
       )}
    </div>
      
         </div>

         <div className="form-group row  d-flex justify-content-between align-items-center">
           
         <div className="col-md-6  py-0 ">
         <label htmlFor="exampleInputAddress">Address</label>
           <input type="text" className={`form-control  ${!errors.street?' border border-info':' border border-danger'}`} id="exampleInputAddress" placeholder="Street"
            {...register('street',
            {required:'streetName is required',
            minLength:{
             value:2,
             message:'streetName should be greater than two letters',
            },
            maxLength:{
             value:15,
             message:"streetName should be less than fifteen letters"
            }

            })} />
           {errors.street && (
         <ErrorMssage>{String(errors?.street?.message)}</ErrorMssage>
       )}
         </div>
         <div className='col-md-6  py-0'>
           <label htmlFor="exampleInputAddress">City</label>
           <input type="text" className={`form-control ${!errors.city?' border border-info':' border border-danger'}`} id="exampleInputAddress" placeholder="City"  
           {...register('city',{
             required:'city is required',
             minLength:{
               value:2,
               message:'city should be greater than two letters'
             },
             maxLength:{
               value:8,
               message:'city should be less than eight letters'
             }

           })}
          />
           {errors.city&&(<ErrorMssage>{errors?.city?.message}</ErrorMssage>)}
           
         </div>
         </div>
     <div className="form-group row  d-flex justify-content-between align-items-center">
         <div className="col-md-6 py-0">
           <label htmlFor="exampleInputAddress">Phone</label>
           <input type="text" className={`form-control ${!errors.phone?' border border-info':' border border-danger'}`} id="exampleInputAddress" placeholder="Phone"
            {...register('phone',{
             required:'Phone is required',
             pattern:{
               value:/^(010|011|012|015|013)[0-9]{8}$/,
               message:'your number should start 01'
             }

            })} />
           {errors.phone&&(<ErrorMssage>{errors?.phone?.message}</ErrorMssage>)}

         </div>
         <div className="col-md-6 py-0">
           <label htmlFor="exampleInputAddress">website</label>
           <input type="text" className={`form-control ${!errors.website?' border border-info':' border border-danger'}`} id="exampleInputAddress" placeholder="www.Example.com" 
           {...register('website',
           {required:'This field is required',
           pattern: {
             value:/^(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})$/,
             message: "Invalid website URL",
           }
           })} />
           {errors.website&&(<ErrorMssage>{errors?.website?.message}</ErrorMssage>)}
        
         </div>
         </div>
   
       </div>
       {/* /.card-body */}
       <div className="card-footer text-center">
         <button type="submit" className="btn btn-outline-primary px-5">submit</button>
       </div>
       </>}
   
     </form>
      
        
        </div>

      </div>

 
   

    </div>

  </div>
</section>

    
    
    </>
  )
}
