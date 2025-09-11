import React from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle the search query and navigation
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    // Animation variants for carousel items
    const itemVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className="w-full max-w-4xl mx-auto my-20 bg">
            <Carousel className="w-full">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <motion.div
                                key={ index }
                                className="p-4"
                                variants={ itemVariants }
                                initial="hidden"
                                animate="visible"
                                transition={ { delay: index * 0.2, duration: 0.5 } }
                            >
                                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                    <Button
                                        onClick={ () => searchJobHandler(cat) }
                                        variant="outline"
                                        className="rounded-full text-lg font-semibold bg-gradient-to-r from-[#00040A] to-[#001636] text-gray-200 hover:from-[#001636] hover:to-[#6A38C2] hover:text-white transition-all duration-300"
                                    >
                                        { cat }
                                    </Button>
                                </CarouselItem>
                            </motion.div>
                        ))
                    }
                </CarouselContent>

                {/* Previous and Next buttons */ }
                <CarouselPrevious className="text-blue-900 hover:text-[#6A38C2]" />
                <CarouselNext className="text-blue-900 hover:text-[#6A38C2]" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;