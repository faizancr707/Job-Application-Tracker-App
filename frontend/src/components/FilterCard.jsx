import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
    },
    {
        filterType: "Salary",
        array: ["React.js", "Java", "DevOps", "Swift", "Flutter", "AWS"]
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        Location: [],
        Industry: [],
        Salary: []
    });

    const dispatch = useDispatch();

    // Handle selection of filters, toggle on and off
    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prevFilters) => {
            const currentSelections = prevFilters[filterType];

            // If the value is already selected, remove it; otherwise, add it
            const newSelections = currentSelections.includes(value)
                ? currentSelections.filter((item) => item !== value)
                : [...currentSelections, value];

            return {
                ...prevFilters,
                [filterType]: newSelections,
            };
        });
    };

    // Create a combined search query from the selected filters
    useEffect(() => {
        // Convert arrays to strings for the search query
        const searchQuery = Object.values(selectedFilters)
            .flat() // flatten arrays into a single array
            .join(' ') // join all selections into a string
            .trim(); // remove trailing spaces
        dispatch(setSearchedQuery(searchQuery));
    }, [selectedFilters, dispatch]);

    return (
        <motion.div
            className="w-full bg-transparent p-5 rounded-md shadow-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3" // Ensuring responsiveness with Tailwind
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            transition={ { duration: 0.5 } }
        >
            <h1 className="font-bold text-lg text-blue-700">Filter Jobs</h1>
            <hr className="mt-3" />
            { filterData.map((data, index) => (
                <div key={ index } className="mt-3">
                    <h1 className="font-bold text-md text-blue-600">{ data.filterType }</h1>
                    { data.array.map((item, idx) => {
                        const itemId = `id${index}-${idx}`;
                        const isChecked = selectedFilters[data.filterType].includes(item);

                        return (
                            <div key={ itemId } className="flex items-center space-x-2 my-2">
                                <input
                                    type="checkbox"
                                    id={ itemId }
                                    checked={ isChecked }
                                    onChange={ () => handleFilterChange(data.filterType, item) }
                                    className="text-blue-600"
                                />
                                <label htmlFor={ itemId } className="text-blue-600">{ item }</label>
                            </div>
                        );
                    }) }
                </div>
            )) }
        </motion.div>
    );
};

export default FilterCard;