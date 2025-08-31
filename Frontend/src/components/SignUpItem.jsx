import React from 'react';


const SignUpItem = ({children}) => {
    return (
        <div className = "flex flex-col w-[45%] gap-[16px] max-md:w-full">
            {children}
        </div>
    )
}
export default SignUpItem;