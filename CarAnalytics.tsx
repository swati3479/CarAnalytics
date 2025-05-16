import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    TrendingUp,
    Filter,
    Users,
    Sun,
    Moon,
    Loader2,
    Search,
    ChevronDown,
    Star,
    BarChart,
    LineChart,
    List,
    XCircle,
    GripVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line } from 'recharts';

// Mock Data (Replace with actual API calls)
interface Car {
    id: string;
    name: string;
    make: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
    type: 'SUV' | 'Sedan' | 'Hatchback' | 'Truck';
    location: string; // e.g., "New York, NY"
    imageUrl: string;
    averageRating: number;
}

interface Review {
    id: string;
    carId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

const mockCars: Car[] = [
    {
        id: '1',
        name: 'EcoSport',
        make: 'Ford',
        model: 'EcoSport',
        year: 2020,
        mileage: 35000,
        price: 20000,
        type: 'SUV',
        location: 'New York, NY',
        imageUrl: 'https://via.placeholder.com/150x100?text=Ford+EcoSport',
        averageRating: 4.5,
    },
    {
        id: '2',
        name: 'Civic',
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        mileage: 25000,
        price: 22000,
        type: 'Sedan',
        location: 'Los Angeles, CA',
        imageUrl: 'https://via.placeholder.com/150x100?text=Honda+Civic',
        averageRating: 4.8,
    },
    {
        id: '3',
        name: 'Golf',
        make: 'Volkswagen',
        model: 'Golf',
        year: 2019,
        mileage: 40000,
        price: 18000,
        type: 'Hatchback',
        location: 'Chicago, IL',
        imageUrl: 'https://via.placeholder.com/150x100?text=Volkswagen+Golf',
        averageRating: 4.2,
    },
    {
        id: '4',
        name: 'F-150',
        make: 'Ford',
        model: 'F-150',
        year: 2022,
        mileage: 15000,
        price: 35000,
        type: 'Truck',
        location: 'Houston, TX',
        imageUrl: 'https://via.placeholder.com/150x100?text=Ford+F-150',
        averageRating: 4.7,
    },
    {
        id: '5',
        name: 'CR-V',
        make: 'Honda',
        model: 'CR-V',
        year: 2020,
        mileage: 30000,
        price: 25000,
        type: 'SUV',
        location: 'Miami, FL',
        imageUrl: 'https://via.placeholder.com/150x100?text=Honda+CR-V',
        averageRating: 4.6,
    },
    {
        id: '6',
        name: 'Camry',
        make: 'Toyota',
        model: 'Camry',
        year: 2021,
        mileage: 20000,
        price: 23000,
        type: 'Sedan',
        location: 'New York, NY',
        imageUrl: 'https://via.placeholder.com/150x100?text=Toyota+Camry',
        averageRating: 4.9,
    },
    {
        id: '7',
        name: 'Mustang',
        make: 'Ford',
        model: 'Mustang',
        year: 2019,
        mileage: 28000,
        price: 28000,
        type: 'Sedan',
        location: 'Los Angeles, CA',
        imageUrl: 'https://via.placeholder.com/150x100?text=Ford+Mustang',
        averageRating: 4.7,
    },
    {
        id: '8',
        name: 'RAV4',
        make: 'Toyota',
        model: 'RAV4',
        year: 2022,
        mileage: 18000,
        price: 27000,
        type: 'SUV',
        location: 'Chicago, IL',
        imageUrl: 'https://via.placeholder.com/150x100?text=Toyota+RAV4',
        averageRating: 4.8,
    },
    {
        id: '9',
        name: 'Silverado',
        make: 'Chevrolet',
        model: 'Silverado',
        year: 2020,
        mileage: 42000,
        price: 32000,
        type: 'Truck',
        location: 'Houston, TX',
        imageUrl: 'https://via.placeholder.com/150x100?text=Chevrolet+Silverado',
        averageRating: 4.4,
    },
    {
        id: '10',
        name: 'Malibu',
        make: 'Chevrolet',
        model: 'Malibu',
        year: 2021,
        mileage: 22000,
        price: 21000,
        type: 'Sedan',
        location: 'Miami, FL',
        imageUrl: 'https://via.placeholder.com/150x100?text=Chevrolet+Malibu',
        averageRating: 4.5,
    },
    {
        id: '11',
        name: 'Model 3',
        make: 'Tesla',
        model: 'Model 3',
        year: 2022,
        mileage: 10000,
        price: 45000,
        type: 'Sedan',
        location: 'New York, NY',
        imageUrl: 'https://via.placeholder.com/150x100?text=Tesla+Model+3',
        averageRating: 4.9,
    },
    {
        id: '12',
        name: 'Model Y',
        make: 'Tesla',
        model: 'Model Y',
        year: 2023,
        mileage: 5000,
        price: 55000,
        type: 'SUV',
        location: 'Los Angeles, CA',
        imageUrl: 'https://via.placeholder.com/150x100?text=Tesla+Model+Y',
        averageRating: 5.0,
    },
    {
        id: '13',
        name: 'Tacoma',
        make: 'Toyota',
        model: 'Tacoma',
        year: 2021,
        mileage: 28000,
        price: 30000,
        type: 'Truck',
        location: 'Chicago, IL',
        imageUrl: 'https://via.placeholder.com/150x100?text=Toyota+Tacoma',
        averageRating: 4.7,
    },
    {
        id: '14',
        name: 'Suburban',
        make: 'Chevrolet',
        model: 'Suburban',
        year: 2022,
        mileage: 12000,
        price: 40000,
        type: 'SUV',
        location: 'Houston, TX',
        imageUrl: 'https://via.placeholder.com/150x100?text=Chevrolet+Suburban',
        averageRating: 4.6,
    },
    {
        id: '15',
        name: 'Accord',
        make: 'Honda',
        model: 'Accord',
        year: 2020,
        mileage: 26000,
        price: 24000,
        type: 'Sedan',
        location: 'Miami, FL',
        imageUrl: 'https://via.placeholder.com/150x100?text=Honda+Accord',
        averageRating: 4.8,
    },
];

const mockReviews: Review[] = [
    { id: '1', carId: '1', userName: 'John Doe', rating: 5, comment: 'Great car, excellent fuel economy!', date: '2024-01-15' },
    { id: '2', carId: '1', userName: 'Jane Smith', rating: 4, comment: 'Reliable and comfortable.', date: '2024-02-01' },
    { id: '3', carId: '2', userName: 'Mike Johnson', rating: 5, comment: 'Love the handling and style.', date: '2024-02-10' },
    { id: '4', carId: '2', userName: 'Alice Brown', rating: 4, comment: 'Good value for the price.', date: '2024-03-01' },
    { id: '5', carId: '3', userName: 'Bob Williams', rating: 3, comment: 'Average performance.', date: '2024-03-15' },
    { id: '6', carId: '3', userName: 'Emily Davis', rating: 4, comment: 'Nice design and features.', date: '2024-04-01' },
    { id: '7', carId: '4', userName: 'David Wilson', rating: 5, comment: 'Powerful and durable truck.', date: '2024-04-10' },
    { id: '8', carId: '4', userName: 'Sarah Garcia', rating: 4, comment: 'Great for towing and hauling.', date: '2024-05-01' },
    { id: '9', carId: '5', userName: 'Chris Rodriguez', rating: 4, comment: 'Spacious and family-friendly.', date: '2024-05-15' },
    { id: '10', carId: '5', userName: 'Jessica Martinez', rating: 5, comment: 'Excellent safety features.', date: '2024-06-01' },
    { id: '11', carId: '6', userName: 'Kevin Anderson', rating: 5, comment: 'Smooth ride and great fuel economy.', date: '2024-06-10' },
    { id: '12', carId: '6', userName: 'Laura Thomas', rating: 4, comment: 'Reliable and comfortable for long trips.', date: '2024-07-01' },
    { id: '13', carId: '7', userName: 'Brian Jackson', rating: 5, comment: 'Iconic design and powerful performance.', date: '2024-07-15' },
    { id: '14', carId: '7', userName: 'Nicole White', rating: 4, comment: 'Fun to drive and turns heads.', date: '2024-08-01' },
    { id: '15', carId: '8', userName: 'Timothy Harris', rating: 4, comment: 'Versatile SUV with good cargo space.', date: '2024-08-10' },
    { id: '16', carId: '8', userName: 'Angela King', rating: 5, comment: 'Great for both city and off-road driving.', date: '2024-09-01' },
    { id: '17', carId: '9', userName: 'Stephen Wright', rating: 4, comment: 'Strong and dependable truck.', date: '2024-09-15' },
    { id: '18', carId: '9', userName: 'Beverly Lopez', rating: 4, comment: 'Good for work and play.', date: '2024-10-01' },
    { id: '19', carId: '10', userName: 'Raymond Hill', rating: 4, comment: 'Comfortable sedan for daily commute.', date: '2024-10-10' },
    { id: '20', carId: '10', userName: 'Michelle Carter', rating: 5, comment: 'Stylish and fuel-efficient.', date: '2024-11-01' },
    { id: '21', carId: '11', userName: 'Gary Baker', rating: 5, comment: 'Amazing technology and performance.', date: '2024-11-15' },
    { id: '22', carId: '11', userName: 'Melissa Green', rating: 5, comment: 'The future of driving.', date: '2024-12-01' },
    { id: '23', carId: '12', userName: 'Larry Adams', rating: 5, comment: 'Spacious, efficient, and stylish SUV.', date: '2024-12-10' },
    { id: '24', carId: '12', userName: 'Cheryl Nelson', rating: 5, comment: 'Perfect for family trips and daily commutes.', date: '2025-01-01' },
    { id: '25', carId: '13', userName: 'Terry Roberts', rating: 4, comment: 'Reliable truck for any terrain.', date: '2025-01-15' },
    { id: '26', carId: '13', userName: 'Norma Young', rating: 5, comment: 'Great off-road capabilities.', date: '2025-02-01' },
    { id: '27', carId: '14', userName: 'Sean Perez', rating: 4, comment: 'Large and comfortable for passengers.', date: '2025-02-10' },
    { id: '28', carId: '14', userName: 'Debra Lewis', rating: 4, comment: 'Ideal for big families and groups.', date: '2025-03-01' },
    { id: '29', carId: '15', userName: 'Howard Allen', rating: 4, comment: 'Classic sedan with modern features.', date: '2025-03-15' },
    { id: '30', carId: '15', userName: 'Carol Martinez', rating: 4, comment: 'Smooth handling and comfortable interior.', date: '2025-04-01' },
];

// Mock Data for Price Trends
const mockPriceTrends = {
    'Ford EcoSport': [
        { month: 'Jan', price: 20500 }, { month: 'Feb', price: 20200 }, { month: 'Mar', price: 20000 },
        { month: 'Apr', price: 20300 }, { month: 'May', price: 20800 }, { month: 'Jun', price: 21000 },
        { month: 'Jul', price: 21200 }, { month: 'Aug', price: 21500 }, { month: 'Sep', price: 21300 },
        { month: 'Oct', price: 21000 }, { month: 'Nov', price: 20800 }, { month: 'Dec', price: 21000 },
    ],
    'Honda Civic': [
        { month: 'Jan', price: 21500 }, { month: 'Feb', price: 21800 }, { month: 'Mar', price: 22000 },
        { month: 'Apr', price: 22300 }, { month: 'May', price: 22500 }, { month: 'Jun', price: 22800 },
        { month: 'Jul', price: 23000 }, { month: 'Aug', price: 23200 }, { month: 'Sep', price: 23000 },
        { month: 'Oct', price: 22800 }, { month: 'Nov', price: 22500 }, { month: 'Dec', price: 22700 },
    ],
    'Volkswagen Golf': [
        { month: 'Jan', price: 17500 }, { month: 'Feb', price: 17800 }, { month: 'Mar', price: 18000 },
        { month: 'Apr', price: 18200 }, { month: 'May', price: 18500 }, { month: 'Jun', price: 18800 },
        { month: 'Jul', price: 19000 }, { month: 'Aug', price: 19200 }, { month: 'Sep', price: 19000 },
        { month: 'Oct', price: 18800 }, { month: 'Nov', price: 18500 }, { month: 'Dec', price: 18700 },
    ],
    'Ford F-150': [
        { month: 'Jan', price: 34000 }, { month: 'Feb', price: 34500 }, { month: 'Mar', price: 35000 },
        { month: 'Apr', price: 35500 }, { month: 'May', price: 36000 }, { month: 'Jun', price: 36500 },
        { month: 'Jul', price: 37000 }, { month: 'Aug', price: 37500 }, { month: 'Sep', price: 37200 },
        { month: 'Oct', price: 37000 }, { month: 'Nov', price: 36500 }, { month: 'Dec', price: 36800 },
    ],
    'Honda CR-V': [
        { month: 'Jan', price: 24000 }, { month: 'Feb', price: 24300 }, { month: 'Mar', price: 24500 },
        { month: 'Apr', price: 24800 }, { month: 'May', price: 25000 }, { month: 'Jun', price: 25300 },
        { month: 'Jul', price: 25500 }, { month: 'Aug', price: 25700 }, { month: 'Sep', price: 25500 },
        { month: 'Oct', price: 25300 }, { month: 'Nov', price: 25000 }, { month: 'Dec', price: 25200 },
    ],
    'Toyota Camry': [
        { month: 'Jan', price: 22000 }, { month: 'Feb', price: 22300 }, { month: 'Mar', price: 22500 },
        { month: 'Apr', price: 22800 }, { month: 'May', price: 23000 }, { month: 'Jun', price: 23300 },
        { month: 'Jul', price: 23500 }, { month: 'Aug', price: 23700 }, { month: 'Sep', price: 23500 },
        { month: 'Oct', price: 23300 }, { month: 'Nov', price: 23000 }, { month: 'Dec', price: 23200 },
    ],
    'Ford Mustang': [
        { month: 'Jan', price: 27000 }, { month: 'Feb', price: 27300 }, { month: 'Mar', price: 27500 },
        { month: 'Apr', price: 27800 }, { month: 'May', price: 28000 }, { month: 'Jun', price: 28300 },
        { month: 'Jul', price: 28500 }, { month: 'Aug', price: 28700 }, { month: 'Sep', price: 28500 },
        { month: 'Oct', price: 28300 }, { month: 'Nov', price: 28000 }, { month: 'Dec', price: 28200 },
    ],
    'Toyota RAV4': [
        { month: 'Jan', price: 26000 }, { month: 'Feb', price: 26300 }, { month: 'Mar', price: 26500 },
        { month: 'Apr', price: 26800 }, { month: 'May', price: 27000 }, { month: 'Jun', price: 27300 },
        { month: 'Jul', price: 27500 }, { month: 'Aug', price: 27700 }, { month: 'Sep', price: 27500 },
        { month: 'Oct', price: 27300 }, { month: 'Nov', price: 27000 }, { month: 'Dec', price: 27200 },
    ],
    'Chevrolet Silverado': [
        { month: 'Jan', price: 31000 }, { month: 'Feb', price: 31500 }, { month: 'Mar', price: 32000 },
        { month: 'Apr', price: 32500 }, { month: 'May', price: 33000 }, { month: 'Jun', price: 33500 },
        { month: 'Jul', price: 34000 }, { month: 'Aug', price: 34500 }, { month: 'Sep', price: 34200 },
        { month: 'Oct', price: 34000 }, { month: 'Nov', price: 33500 }, { month: 'Dec', price: 33800 },
    ],
    'Chevrolet Malibu': [
        { month: 'Jan', price: 20000 }, { month: 'Feb', price: 20300 }, { month: 'Mar', price: 20500 },
        { month: 'Apr', price: 20800 }, { month: 'May', price: 21000 }, { month: 'Jun', price: 21300 },
        { month: 'Jul', price: 21500 }, { month: 'Aug', price: 21700 }, { month: 'Sep', price: 21500 },
        { month: 'Oct', price: 21300 }, { month: 'Nov', price: 21000 }, { month: 'Dec', price: 21200 },
    ],
    'Tesla Model 3': [
        { month: 'Jan', price: 44000 }, { month: 'Feb', price: 44500 }, { month: 'Mar', price: 45000 },
        { month: 'Apr', price: 45500 }, { month: 'May', price: 46000 }, { month: 'Jun', price: 46500 },
        { month: 'Jul', price: 47000 }, { month: 'Aug', price: 47500 }, { month: 'Sep', price: 47200 },
        { month: 'Oct', price: 47000 }, { month: 'Nov', price: 46500 }, { month: 'Dec', price: 46800 },
    ],
    'Tesla Model Y': [
        { month: 'Jan', price: 54000 }, { month: 'Feb', price: 54500 }, { month: 'Mar', price: 55000 },
        { month: 'Apr', price: 55500 }, { month: 'May', price: 56000 }, { month: 'Jun', price: 56500 },
        { month: 'Jul', price: 57000 }, { month: 'Aug', price: 57500 }, { month: 'Sep', price: 57200 },
        { month: 'Oct', price: 57000 }, { month: 'Nov', price: 56500 }, { month: 'Dec', price: 56800 },
    ],
    'Toyota Tacoma': [
        { month: 'Jan', price: 29000 }, { month: 'Feb', price: 29300 }, { month: 'Mar', price: 29500 },
        { month: 'Apr', price: 29800 }, { month: 'May', price: 30000 }, { month: 'Jun', price: 30300 },
        { month: 'Jul', price: 30500 }, { month: 'Aug', price: 30700 }, { month: 'Sep', price: 30500 },
        { month: 'Oct', price: 30300 }, { month: 'Nov', price: 30000 }, { month: 'Dec', price: 30200 },
    ],
    'Chevrolet Suburban': [
        { month: 'Jan', price: 39000 }, { month: 'Feb', price: 39300 }, { month: 'Mar', price: 39500 },
        { month: 'Apr', price: 39800 }, { month: 'May', price: 40000 }, { month: 'Jun', price: 40300 },
        { month: 'Jul', price: 40500 }, { month: 'Aug', price: 40700 }, { month: 'Sep', price: 40500 },
        { month: 'Oct', price: 40300 }, { month: 'Nov', price: 40000 }, { month: 'Dec', price: 40200 },
    ],
    'Honda Accord': [
        { month: 'Jan', price: 23000 }, { month: 'Feb', price: 23300 }, { month: 'Mar', price: 23500 },
        { month: 'Apr', price: 23800 }, { month: 'May', price: 24000 }, { month: 'Jun', price: 24300 },
        { month: 'Jul', price: 24500 }, { month: 'Aug', price: 24700 }, { month: 'Sep', price: 24500 },
        { month: 'Oct', price: 24300 }, { month: 'Nov', price: 24000 }, { month: 'Dec', price: 24200 },
    ],
};

const regions = [
    { name: 'Northeast', states: ['New York', 'Pennsylvania', 'Massachusetts'] },
    { name: 'Southeast', states: ['Florida', 'Georgia', 'North Carolina'] },
    { name: 'Midwest', states: ['Illinois', 'Ohio', 'Michigan'] },
    { name: 'Southwest', states: ['Texas', 'Arizona', 'New Mexico'] },
    { name: 'West', states: ['California', 'Washington', 'Oregon'] },
];

const CarMarketplaceDashboard = () => {
    const [cars, setCars] = useState<Car[]>(mockCars);
    const [reviews, setReviews] = useState<Review[]>(mockReviews);
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [filters, setFilters] = useState({
        year: '',
        mileage: '',
        type: '',
    });
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [loading, setLoading] = useState(false);
    const [comparedCars, setComparedCars] = useState<Car[]>([]);
    const [selectedCarForTrend, setSelectedCarForTrend] = useState<string>('');
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false); // State for mobile filter drawer

    // Toggle Theme
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // Apply Filters
    const filteredCars = cars.filter(car => {
        return (
            (!filters.year || car.year === parseInt(filters.year)) &&
            (!filters.mileage || car.mileage <= parseInt(filters.mileage)) &&
            (!filters.type || car.type === filters.type)
        );
    });

    // Get Popular Models by Region
    const getPopularModelsByRegion = (region: string) => {
        const regionCars = filteredCars.filter(car => {
            const state = car.location.split(', ')[1]; // Extract state from "City, State"
            return regions.find(r => r.name === region)?.states.includes(state);
        });

        if (regionCars.length === 0) return [];

        const modelCounts: { [model: string]: number } = {};
        regionCars.forEach(car => {
            modelCounts[car.model] = (modelCounts[car.model] || 0) + 1;
        });

        const sortedModels = Object.entries(modelCounts).sort(([, countA], [, countB]) => countB - countA);
        return sortedModels.slice(0, 5).map(([model]) => model); // Top 5 models
    };

    // Get Trending Cars (most recently sold - using mock review dates as a proxy)
    const getTrendingCars = () => {
        const sortedReviews = [...reviews].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const recentCarIds = new Set<string>();
        const trendingCars: Car[] = [];

        for (const review of sortedReviews) {
            if (!recentCarIds.has(review.carId)) {
                recentCarIds.add(review.carId);
                const car = cars.find(c => c.id === review.carId);
                if (car) {
                    trendingCars.push(car);
                }
            }
            if (trendingCars.length >= 5) break; // Top 5 trending cars
        }
        return trendingCars;
    };

    const trendingCars = getTrendingCars();

    // Handle Car Comparison
    const handleCompareCar = (car: Car) => {
        if (comparedCars.find(c => c.id === car.id)) return; // prevent duplicates
        if (comparedCars.length < 2) {
            setComparedCars([...comparedCars, car]);
        }
    };

    const removeComparedCar = (carId: string) => {
        setComparedCars(comparedCars.filter(car => car.id !== carId));
    };

    const clearComparedCars = () => {
        setComparedCars([]);
    };

    const priceTrendData = selectedCarForTrend ? mockPriceTrends[selectedCarForTrend] || [] : [];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const searchedCars = filteredCars.filter(car =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to calculate average rating for a car
    const getAverageRating = useCallback((carId: string) => {
        const carReviews = reviews.filter(review => review.carId === carId);
        if (carReviews.length === 0) return 0;
        const totalRating = carReviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / carReviews.length).toFixed(1);
    }, [reviews]);

    // Update averageRating for each car
    useEffect(() => {
        const updatedCars = cars.map(car => ({
            ...car,
            averageRating: parseFloat(getAverageRating(car.id)),
        }));
        setCars(updatedCars);
    }, [getAverageRating, cars]);

    // Mobile Filters Toggle
    const toggleMobileFilters = () => {
        setIsMobileFiltersOpen(!isMobileFiltersOpen);
    };

    return (
        <div className={cn(
            "min-h-screen bg-background text-foreground",
            theme === 'dark' ? 'dark' : ''
        )}>
            {/* Navbar */}
            <nav className="bg-card border-b border-border p-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Car Marketplace Analytics</h1>
                <div className="flex items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Search cars..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-64"
                    />
                    <Button variant="outline" onClick={toggleTheme}>
                        {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Filters (Hidden on small screens, drawer on mobile) */}
                    <div className={cn(
                        "md:block transition-all duration-300",
                        isMobileFiltersOpen ? "fixed inset-0 bg-black/50 z-40" : "hidden"
                    )}>
                        {/* Mobile Filter Header */}
                        {isMobileFiltersOpen && (
                            <div className="md:hidden bg-card p-4 flex items-center justify-between border-b border-border">
                                <h2 className="text-lg font-semibold">Filters</h2>
                                <Button variant="ghost" onClick={toggleMobileFilters}>
                                    <XCircle className="w-5 h-5" />
                                </Button>
                            </div>
                        )}

                        <motion.div
                            initial={{ x: isMobileFiltersOpen ? '-100%' : 0 }}
                            animate={{ x: 0 }}
                            exit={{ x: isMobileFiltersOpen ? '-100%' : 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            className={cn(
                                "bg-card w-full md:w-64 h-full md:h-auto p-4 space-y-6 overflow-y-auto",
                                "absolute md:relative top-0 left-0 z-50",
                                "transition-transform duration-300"
                            )}
                        >
                            <div className="flex items-center gap-2 md:hidden mb-4">
                                <Button variant="ghost" onClick={toggleMobileFilters}>
                                    <XCircle className="w-5 h-5" />
                                </Button>
                                <h2 className="text-lg font-semibold">Filters</h2>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Filter className="w-5 h-5" /> Filters
                                </h2>
                                <Select onValueChange={(value) => setFilters({ ...filters, year: value })} value={filters.year}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[2018, 2019, 2020, 2021, 2022, 2023, 2024].map(year => (
                                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select onValueChange={(value) => setFilters({ ...filters, mileage: value })} value={filters.mileage}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Mileage" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="20000">Up to 20,000</SelectItem>
                                        <SelectItem value="40000">Up to 40,000</SelectItem>
                                        <SelectItem value="60000">Up to 60,000</SelectItem>
                                        <SelectItem value="80000">Up to 80,000</SelectItem>
                                        <SelectItem value="100000">Up to 100,000</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select onValueChange={(value) => setFilters({ ...filters, type: value })} value={filters.type}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Vehicle Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SUV">SUV</SelectItem>
                                        <SelectItem value="Sedan">Sedan</SelectItem>
                                        <SelectItem value="Hatchback">Hatchback</SelectItem>
                                        <SelectItem value="Truck">Truck</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Mobile Filters Button */}
                        <div className="md:hidden">
                            <Button
                                className="w-full"
                                onClick={toggleMobileFilters}
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                            </Button>
                        </div>

                        {/* Regional Heat Map */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" /> Regional Heat Map
                                </CardTitle>
                                <CardDescription>Popular models by region</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {regions.map(region => (
                                        <div key={region.name} className="p-4 rounded-lg bg-muted">
                                            <h3 className="text-lg font-semibold mb-2">{region.name}</h3>
                                            <ul className="list-disc list-inside">
                                                {getPopularModelsByRegion(region.name).map((model, index) => (
                                                    <li key={index}>{model}</li>
                                                ))}
                                            </ul>
                                            {getPopularModelsByRegion(region.name).length === 0 && (
                                                <p className="text-sm text-muted-foreground">No data available</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Price Trends */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" /> Price Trends
                                </CardTitle>
                                <CardDescription>Historical price changes for specific vehicles</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <Select onValueChange={setSelectedCarForTrend} value={selectedCarForTrend}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a car" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cars.map(car => (
                                                <SelectItem key={car.id} value={car.name}>{car.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {selectedCarForTrend && priceTrendData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={priceTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        {selectedCarForTrend ? "No price trend data available for this car." : "Select a car to view price trends."}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Trending Cars */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" /> Trending Cars
                                </CardTitle>
                                <CardDescription>Most recently sold vehicles</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {trendingCars.map(car => (
                                        <Card key={car.id} className="group overflow-hidden relative">
                                            <div className="relative">
                                                <img
                                                    src={car.imageUrl}
                                                    alt={car.name}
                                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                            </div>
                                            <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                                <h3 className="text-lg font-semibold">{car.name}</h3>
                                                <p className="text-sm">{car.make} {car.model}</p>
                                            </CardContent>
                                            <div className="absolute top-2 right-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="text-white bg-black/50 hover:bg-black/70"
                                                    onClick={() => handleCompareCar(car)}
                                                    disabled={comparedCars.length >= 2}
                                                >
                                                    {comparedCars.find(c => c.id === car.id) ? (
                                                        <List className="w-4 h-4" />
                                                    ) : (
                                                        <List className="w-4 h-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* User Reviews */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-5 h-5" /> User Reviews
                                </CardTitle>
                                <CardDescription>Ownership experiences and ratings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {reviews.map(review => {
                                        const car = cars.find(c => c.id === review.carId);
                                        return (
                                            <div key={review.id} className="p-4 rounded-lg bg-muted border border-border">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-semibold">
                                                        {review.userName}
                                                        {car && (
                                                            <span className="text-sm text-muted-foreground ml-2">({car.name})</span>
                                                        )}
                                                    </h4>
                                                    <div className="flex items-center">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={cn(
                                                                    "w-4 h-4",
                                                                    i < review.rating ? "text-yellow-400" : "text-gray-400"
                                                                )}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm">{review.comment}</p>
                                                <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Car Comparison Modal */}
            <AnimatePresence>
                {comparedCars.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            className="bg-card w-full max-w-4xl rounded-lg p-6 space-y-6 shadow-2xl border border-border"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <List className="w-6 h-6" /> Car Comparison
                                </h2>
                                <Button variant="destructive" onClick={clearComparedCars}>
                                    Clear Comparison
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {comparedCars.map(car => (
                                    <Card key={car.id} className="relative">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                            onClick={() => removeComparedCar(car.id)}
                                        >
                                            <XCircle className="w-5 h-5" />
                                        </Button>
                                        <CardHeader>
                                            <CardTitle>{car.name}</CardTitle>
                                            <CardDescription>{car.make} {car.model}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <img src={car.imageUrl} alt={car.name} className="w-full h-48 object-cover rounded-md" />
                                            <p><span className="font-semibold">Year:</span> {car.year}</p>
                                            <p><span className="font-semibold">Mileage:</span> {car.mileage.toLocaleString()}</p>
                                            <p><span className="font-semibold">Price:</span> ${car.price.toLocaleString()}</p>
                                            <p><span className="font-semibold">Type:</span> {car.type}</p>
                                            <p><span className="font-semibold">Average Rating:</span> {car.averageRating} <Star className="w-4 h-4 inline-block text-yellow-400" /></p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CarMarketplaceDashboard;
