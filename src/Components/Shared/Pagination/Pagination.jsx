import React from 'react'

export default function Pagination({totalContacts, paginate ,currentPage}) {
  
  return (
    <>
      <nav aria-label="Contacts Page Navigation">
        <ul className="pagination justify-content-center m-0">
          {Array.from({ length: totalContacts }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <a className="page-link" onClick={() => paginate(i + 1)} href="#">{i + 1}</a>
            </li>
          ))}
        </ul>
      </nav>
    
    
    </>
  )
}
