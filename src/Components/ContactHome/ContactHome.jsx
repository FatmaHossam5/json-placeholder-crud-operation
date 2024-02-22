import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import trash from '../../assets/trash.png';
import Pagination from '../Shared/Pagination/Pagination';
import Loading from '../Shared/Loading/Loading';
import { toast } from 'react-toastify';
import ErrorMssage from '../Shared/ErrorMessgae/ErrorMssage';


export default function ContactHome() {
  const [contacts, setContacts] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [item, setItem] = useState();
  const [id, setId] = useState(0);
  const [searchInput, setSearchInput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setflag] = useState(false);

  {/* Fetch all contacts*/ }

  const getAllContacts = (page, limit) => {
    axios.get(`https://jsonplaceholder.typicode.com/users`, {
      params: {
        _page: page,
        _limit: limit
      }
    }).then((response) => {
      setContacts(response.data)

    }).catch((error) => {
      console.log(error);
    })
  }

  {/* showModals*/ }
  const showDeleteModal = (id) => {
    setDeleteModal(true)

    setId(id);
    handleClose()
  }

  const showUpdateModal = (contact) => {
    setItem(contact)
    setUpdateModal(true);
    for (const key in contact) {
      if (key === 'address') {
        setValue('street', contact[key]?.street);
        setValue('city', contact[key]?.city);

      }
      setValue(key, contact[key]);
    }

  }

  {/*handle close Modal*/ }
  const handleClose = () => {
    if (deleteModal) {
      setDeleteModal(false);

    } else if (updateModal) {

      setUpdateModal(false);
    }
  };

  {/* handle Delete Contact */ }
  const deleteContact = () => {
    setIsLoading(true)
    axios.delete(`https://jsonplaceholder.typicode.com/users/id=${id}`).then((response) => {
      toast.success(`${response.status} Deleted SuccessFully`);
      getAllContacts();
      handleClose();

    }).catch((error) => {
      toast.error(error.message)


    }).finally(()=>{
      setIsLoading(false)
    })
  }


  {/*handle Update Contact*/ }
  const editContact = (data) => {
    setIsLoading(true)
    axios.patch(`https://jsonplaceholder.typicode.com/users/id=${id}`, data).then((response) => {
      toast.success(`${response.status} Updated SuccessFully`)
      handleClose()

      getAllContacts()
    }).catch((error) => {
      toast.error(error.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }


  {/*pagination*/ }
  const contactsPerPage = 3;
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts ? contacts.slice(indexOfFirstContact, indexOfLastContact) : [];


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchTermInput = (e) => {
    setSearchInput(e.target.value);
    filterContact(e.target.value)
    if (e.target.value === '') {
      getAllContacts()
    }
  }
  const filterContact = (term) => {
    const filterd = contacts.filter(contact =>
      contact.name.toLowerCase().includes(term.toLowerCase()) || contact.username.toLowerCase().includes(term.toLowerCase()))
    setContacts(filterd)
  }

  useEffect(() => {
    getAllContacts();
  }, [])

  return (
    <>

      <div >
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className=" mb-2 ">
              <div className=" w-100 d-flex justify-content-between align-items-center">
                <div className='col-4'>
                  <h1>Contacts</h1>
                </div>
                <div className="navbar-search col-4">
                  <form className="form-control-plaintext w-100">
                    <div className='w-100'>
                      <input value={searchInput} onChange={handleSearchTermInput} className="form-control w-100 " type="search" placeholder="Search" aria-label="Search" />
                    </div>
                  </form>
                </div>

                <div className='col-4 text-right' >
                  <Link to='/add-contact'>
                    <button className='btn btn-primary '><i className="fa-solid fa-user-plus "></i>Add New</button>
                  </Link>
                </div>
              </div>

            </div>
          </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card card-solid">
            <div className="card-body pb-0">
              <div className="d-flex">
                {(
                  currentContacts.map((contact, idx) =>
                    <div key={idx} className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column ">
                      <div className="card bg-light d-flex flex-fill">
                        <div className="card-header text-muted border-bottom-0">
                          {contact?.company?.name}              </div>
                        <div className="card-body pt-0">
                          <div className="d-flex">
                            <div className="col-7">
                              <h2 className="lead"><b>{contact?.name}</b></h2>
                              <p className="text-muted text-sm"><b>userName: </b>{contact?.username} </p>
                              <ul className="ml-4 mb-0 fa-ul text-muted">
                                <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building" /></span> Address: {contact?.address?.street}  City {contact?.address?.city}, {contact?.address?.suite}</li>
                                <li className="small"><span className="fa-li"><i className="fas fa-lg fa-phone" /></span> Phone :{contact?.phone}</li>
                                <li className="small"><span className="fa-li"><i className="fa-solid fa-globe"></i></span> website :{contact?.website}</li>
                              </ul>
                            </div>
                            <div className="col-5 text-center">
                              <img src="../../dist/img/user1-128x128.jpg" alt="user-avatar" className="img-circle img-fluid" />
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <div className="text-right">
                            <button onClick={() => showDeleteModal(contact.id)} type="button" className="btn " data-toggle="modal" data-target="#deleteModal">
                              <i className="fa-solid fa-trash text-danger"></i>
                            </button>




                            <button onClick={() => showUpdateModal(contact)} className="btn btn-sm btn-primary" data-toggle="modal" data-target="#updateModal">
                              <i className="fas fa-user" />UpdateProfile
                            </button>

                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              {flag ? "" : contacts && (
                <Pagination
                  totalContacts={Math.ceil(contacts.length / contactsPerPage)}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              )}
            </div>
          </div>
        </section>
      </div>

      <div className={`modal fade ${updateModal ? 'show' : ''}`} id="updateModal" tabIndex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden={!updateModal}>
        <div className="modal-dialog">
          <div className="modal-content">
{isLoading?<Loading/>:<>

<div className="modal-header">
              <h4 className="modal-title">Update Contact</h4>
              <button type="button" className="close" onClick={handleClose}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <form onSubmit={handleSubmit(editContact)} >
                <div className="card-body ">
                  <div className='form-group   d-flex justify-content-between align-items-center ' >
                    <div className='col-md-6 py-0'>
                      <label htmlFor="exampleInputUserName " className=''>UserName</label>
                      <input type="text" className={`form-control ${!errors?.username ? ' border border-info' : ' border border-danger'}`} id="exampleInputUserName" placeholder="Enter userName"
                        {...register('username',
                          {
                            required: 'userName is required',
                            minLength: {
                              value: 2,
                              message: 'userName should be greater than two letters',
                            },
                            maxLength: {
                              value: 15,
                              message: 'userName should be less than fifteen letters'
                            }
                          })} />
                      {errors.username && (<ErrorMssage>{errors?.username?.message}</ErrorMssage>)}
                    </div>
                    <div className='col-md-6 py-0'>
                      <label htmlFor="exampleInputEmail">Email</label>
                      <input type="email" className={`form-control  ${!errors?.email ? ' border border-info' : ' border border-danger'}`} id="exampleInputEmail" placeholder="Enter Email"
                        {...register('email',
                          {
                            required: "Email is required",
                          })} />
                      {errors.email && (
                        <ErrorMssage>{String(errors?.email?.message)}</ErrorMssage>
                      )}
                    </div>

                  </div>

                  <div className="form-group   d-flex justify-content-between align-items-center">

                    <div className="col-md-6  py-0 ">
                      <label htmlFor="exampleInputAddress">Address</label>
                      <input type="text" className={`form-control  ${!errors.street ? ' border border-info' : ' border border-danger'}`} id="exampleInputAddress" placeholder="Street"
                        {...register('street',
                          {
                            required: 'streetName is required',
                            minLength: {
                              value: 2,
                              message: 'streetName should be greater than two letters',
                            },
                            maxLength: {
                              value: 15,
                              message: "streetName should be less than fifteen letters"
                            }

                          })} />
                      {errors.street && (
                        <ErrorMssage>{String(errors?.street?.message)}</ErrorMssage>
                      )}
                    </div>
                    <div className='col-md-6  py-0'>
                      <label htmlFor="exampleInputAddress">City</label>
                      <input type="text" className={`form-control ${!errors.city ? ' border border-info' : ' border border-danger'}`} id="exampleInputAddress" placeholder="City"
                        {...register('city', {
                          required: 'city is required',
                          minLength: {
                            value: 2,
                            message: 'city should be greater than two letters'
                          },
                          maxLength: {
                            value: 15,
                            message: 'city should be less than eight letters'
                          }

                        })}
                      />
                      {errors.city && (<ErrorMssage>{errors?.city?.message}</ErrorMssage>)}

                    </div>
                  </div>
                  <div className="form-group  d-flex justify-content-between align-items-center">
                    <div className="col-md-6 py-0">
                      <label htmlFor="exampleInputAddress">Phone</label>
                      <input type="text" className={`form-control ${!errors.phone ? ' border border-info' : ' border border-danger'}`} id="exampleInputAddress" placeholder="Phone"
                        {...register('phone', {
                          required: 'Phone is required',


                        })} />
                      {errors.phone && (<ErrorMssage>{errors?.phone?.message}</ErrorMssage>)}

                    </div>
                    <div className="col-md-6 py-0">
                      <label htmlFor="exampleInputAddress">website</label>
                      <input type="text" className={`form-control ${!errors.website ? ' border border-info' : ' border border-danger'}`} id="exampleInputAddress" placeholder="www.Example.com"
                        {...register('website',
                          {
                            required: 'This field is required',
                            pattern: {
                              value: /^(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})$/,
                              message: "Invalid website URL",
                            }
                          })} />
                      {errors.website && (<ErrorMssage>{errors?.website?.message}</ErrorMssage>)}

                    </div>
                  </div>

                </div>
                {/* /.card-body */}
                <div className="modal-footer justify-content-between">
                  <button type="button" className="btn btn-danger" onClick={handleClose}>Close</button>

                  <button type="submit" className="btn btn-primary">Submit</button>

                </div>
              </form>
            </div></>}

          </div>

        </div>

      </div>

      <div className={` mt-5 modal fade ${deleteModal ? 'show' : ''}`} id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden={!deleteModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            {isLoading?<div className='p-5'>
              <Loading/>
            </div>:<>
            <div className="modal-header">
              <h4 className="modal-title">Delete Contact</h4>
              <button type="button" className="close" onClick={handleClose}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <img src={trash} alt="trash" />

              <p>Are you sure Delete this Contact?</p>
            </div>
            <div className="modal-footer justify-content-between">
              <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
              <button onClick={deleteContact} type="button" className="btn btn-danger">Delete</button>
            </div></>}
          </div>

        </div>

      </div>

    </>
  )
}
