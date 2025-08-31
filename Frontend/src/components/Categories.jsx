import React,{useEffect,useState} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import {Link} from "react-router-dom";
// import useCategory from "../hooks/useCategories.jsx";

const Categories = () => {
    const axiosPrivate = useAxiosPrivate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axiosPrivate.get("/api/ApplicantHome/Categories",
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });
                    console.log(res.data)
                setCategories(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getCategories();
    }, [axiosPrivate]);


    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };
    const chunkedCategories = chunkArray(categories, 4);

    return (
        <div className="py-[58px] px-[45px] flex flex-col items-center gap-[16px]">
            <h3 className = "font-medium text-[40px] text-[#2D9CDB]">فئات شائعه</h3>
            {chunkedCategories.map((chunk,chunkIndex) => {
                    return(
                        <div className="grid grid-cols-4 gap-[40px] mt-[58px]" key = {chunkIndex}>
                            {chunk.map((item,index) => {
                                return (
                                    <div key={index} className="flex flex-col items-center gap-[16px] size-[300px] cursor-pointer hover:scale-110 transition duration-200">
                                        <div className = "bg-[#EFEDED] flex items-center justify-center rounded-[20px] w-full !h-[250px]">
                                            <img src = {item.imageUrl} className = "!size-[130px]"/>
                                        </div>
                                        <Link to ={`/category/${item.id}`} state={{ categoryName: item.name }}  className = "text-center font-bold text-[32px] px-5 h-[50px]">
                                            {item.name}
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Categories;