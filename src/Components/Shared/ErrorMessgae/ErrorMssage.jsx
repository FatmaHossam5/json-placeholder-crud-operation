import React from 'react'

export default function ErrorMssage({children}) {
  return (
    <>
    <div className="group  ">
        <i className="fa-solid fa-circle-exclamation text-red p-2   "></i>

        <span className=" text-danger ">
          {children}
        </span>
      </div>
    

    </>
  )
}
