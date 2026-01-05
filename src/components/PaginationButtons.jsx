import React from 'react'

function PaginationButtons({currentPage, totalPages, onPrev, onNext, onPageChange}) {
  return (
    <>
      <div className="pagination">
          <button onClick={onPrev} disabled={currentPage === 1}>
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
              style={{
                fontWeight: currentPage === i + 1 ? "bold" : "normal",
              }}>
              {i + 1}
            </button>
          ))}

          <button onClick={onNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
    </>
  )
}

export default PaginationButtons
