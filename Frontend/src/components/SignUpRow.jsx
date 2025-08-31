import React from 'react';

const SignUpRow = ({children}) => {
    return (
        <div className = "flex items-center justify-between mb-6 max-md:flex max-md:flex-col max-md:gap-3 ">
            {children}
        </div>
    )
}
export default SignUpRow;