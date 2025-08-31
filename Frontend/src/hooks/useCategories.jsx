import { useContext, useDebugValue } from "react";
import CategoryContext from "../context/CategoriesProvider.jsx";

const useCategory = () => {
    const { categories } = useContext(CategoryContext);

    useDebugValue(categories, cats =>
        cats?.length > 0 ? `Loaded ${cats.length} categories` : "No categories"
    );

    return useContext(CategoryContext);
};

export default useCategory;