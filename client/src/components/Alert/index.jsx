import React from 'react'

const AlertMessage = ({ text }) => {
  return (
        <div className="bg-blue-200 px-2 py-3 text-sm mx-auto rounded-2 text-center mt-4 alert-message" style={{fontSize: "14px", "fontWeight": 300}}>
            {text}
        </div>
  )
}

export default AlertMessage