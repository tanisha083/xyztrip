import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../context/authContext';
import { useLoadScript, GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { FaStar, FaClock } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const libraries = ['places'];
// Debounce function to limit API updates
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};
const ResultsPage = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [parsedItinerary, setParsedItinerary] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
    const mapRef = useRef(null);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [modalActivity, setModalActivity] = useState(null); // State for the activity to show in the modal
    // const [routeColors, setRouteColors] = useState<string[]>([]); // Add this state
    // const [routes, setRoutes] = useState<Array<{
    //   route: google.maps.DirectionsResult;
    //   color: string;
    // }>>([]);
    const [segmentColors, setSegmentColors] = useState([]);
    // Generate a random color
    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    // Precompute colors when the route is updated
    useEffect(() => {
        if (selectedRoute) {
            const legs = selectedRoute.routes[0].legs;
            const colors = legs.map(() => generateRandomColor()); // Generate one color per leg
            setSegmentColors(colors); // Store colors
        }
    }, [selectedRoute]);
    // Validate Google Maps API key before loading
    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!googleMapsApiKey) {
        console.error('CRITICAL: Google Maps API Key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in your environment variables.');
    }
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey || '',
        libraries,
    });
    useEffect(() => {
        if (!googleMapsApiKey) {
            // Optionally, you could also show a user-facing error
            alert('Map functionality is unavailable due to missing API configuration.');
        }
        if (loadError) {
            console.error("Error loading Google Maps API:", loadError);
        }
        else {
            console.log("Google Maps API loaded successfully:", isLoaded);
        }
    }, [isLoaded, loadError, googleMapsApiKey]);
    const fetchPlaceDetails = useCallback(async (activity) => {
        if (!activity.activity || !mapRef.current)
            return activity;
        const placesService = new google.maps.places.PlacesService(mapRef.current);
        return new Promise((resolve) => {
            const request = {
                query: `${activity.activity},${activity.location_details?.address || ''}, ${activity.location_details?.city || ''}, ${activity.location_details?.country || ''}`,
                fields: ['place_id', 'geometry', 'photos'],
            };
            placesService.findPlaceFromQuery(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results?.[0]) {
                    const place = results[0];
                    activity.location = {
                        lat: place.geometry?.location?.lat() || 0,
                        lng: place.geometry?.location?.lng() || 0,
                        placeId: place.place_id
                    };
                    if (place.photos && place.photos.length > 0) {
                        activity.photos = place.photos
                            .slice(0, 3)
                            .map(photo => photo.getUrl({ maxWidth: 600, maxHeight: 600 }));
                    }
                    else {
                        activity.photos = ['default-image.jpg'];
                    }
                }
                resolve(activity);
            });
        });
    }, []);
    // Add this helper function
    // const generateRandomColor = () => {
    //   const letters = '0123456789ABCDEF';
    //   let color = '#';
    //   for (let i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    //   }
    //   return color;
    // };
    // // Update the showRoute function
    const showRoute = useCallback(async () => {
        if (!parsedItinerary)
            return;
        const waypoints = parsedItinerary.sections.flatMap(section => section.activities
            .filter(activity => activity.location) // Ensure valid locations
            .map(activity => ({
            location: new google.maps.LatLng(activity.location.lat, activity.location.lng),
            stopover: true,
        })));
        // Ensure we have at least one activity to show the route
        if (waypoints.length === 0) {
            console.warn("No valid activities to show routes.");
            return;
        }
        const origin = waypoints[0].location; // Starting location
        const destination = waypoints[waypoints.length - 1].location; // Last activity as destination
        const directionsService = new google.maps.DirectionsService();
        const request = {
            origin,
            destination,
            waypoints: waypoints.slice(1, -1), // Exclude origin and destination
            travelMode: google.maps.TravelMode.DRIVING,
        };
        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                setSelectedRoute(result);
                // setRouteColors(prev => [...prev, generateRandomColor()]); // Add new color
            }
            else {
                console.error("Directions request failed due to " + status);
            }
        });
    }, [parsedItinerary]);
    // const showRoute = useCallback(async () => {
    //   if (!parsedItinerary) return;
    //   const waypoints = parsedItinerary.sections.flatMap(section =>
    //     section.activities
    //       .filter(activity => activity.location)
    //       .map(activity => activity.location!)
    //   );
    //   if (waypoints.length < 2) {
    //     console.warn("Not enough locations to calculate routes.");
    //     return;
    //   }
    //   const directionsService = new google.maps.DirectionsService();
    //   const segments: Array<{ route: google.maps.DirectionsResult; color: string }> = [];
    //   for (let i = 0; i < waypoints.length - 1; i++) {
    //     const origin = waypoints[i];
    //     const destination = waypoints[i + 1];
    //     const request = {
    //       origin: new google.maps.LatLng(origin.lat, origin.lng),
    //       destination: new google.maps.LatLng(destination.lat, destination.lng),
    //       travelMode: google.maps.TravelMode.DRIVING,
    //     };
    //     try {
    //       const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
    //         directionsService.route(request, (response, status) => {
    //           if (status === google.maps.DirectionsStatus.OK && response) {
    //             resolve(response);
    //           } else {
    //             reject(`Directions request failed with status ${status} for segment: ${i}`);
    //           }
    //         });
    //       });
    //       const color = generateRandomColor();
    //       segments.push({ route: result, color });
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    //   if (segments.length === 0) {
    //     console.warn("No routes found.");
    //     return;
    //   }
    //   setRoutes(segments);
    // }, [parsedItinerary]);
    useEffect(() => {
        const itineraryData = location.state?.itinerary?.response;
        if (itineraryData) {
            try {
                const parsedData = typeof itineraryData === 'string'
                    ? JSON.parse(itineraryData)
                    : itineraryData;
                setParsedItinerary(parsedData);
            }
            catch (err) {
                console.error("Error parsing itinerary data:", err);
            }
        }
        else {
            console.error("No itinerary data found in location.state.");
        }
    }, [location.state]);
    useEffect(() => {
        if (parsedItinerary && isLoaded) {
            const fetchAllPlaceDetails = async () => {
                const updatedSections = await Promise.all(parsedItinerary.sections.map(async (section) => {
                    const updatedActivities = await Promise.all(section.activities.map(activity => fetchPlaceDetails(activity)));
                    return { ...section, activities: updatedActivities };
                }));
                setParsedItinerary({ ...parsedItinerary, sections: updatedSections });
                const firstLocation = updatedSections[0]?.activities[0]?.location;
                if (firstLocation) {
                    setMapCenter(firstLocation);
                }
            };
            fetchAllPlaceDetails();
        }
    }, [parsedItinerary, isLoaded, fetchPlaceDetails]);
    const saveItinerary = useCallback(async () => {
        if (!parsedItinerary || !user)
            return;
        try {
            const itineraryRef = doc(collection(db, 'itineraries'));
            const itineraryData = {
                ...parsedItinerary,
                userId: user.uid,
                timestamp: new Date(),
                id: itineraryRef.id
            };
            await setDoc(itineraryRef, itineraryData);
            setShowPopup(true);
        }
        catch (error) {
            console.error('Error saving itinerary:', error);
        }
    }, [parsedItinerary, user]);
    useEffect(() => {
        return () => {
            if (mapRef.current) {
                mapRef.current = null;
            }
        };
    }, []);
    const handleMapLoad = useCallback((map) => {
        mapRef.current = map;
        const debouncedZoomChanged = debounce(() => {
            console.log('Zoom changed');
        }, 300);
        const debouncedDragEnd = debounce(() => {
            console.log('Drag ended');
        }, 300);
        map.addListener('zoom_changed', debouncedZoomChanged);
        map.addListener('dragend', debouncedDragEnd);
    }, []);
    const handleShowRoute = useCallback((activity, nextActivity) => {
        if (nextActivity) {
            console.log("Current Activity:", activity);
            showRoute(); // Call showRoute without parameters
        }
        else {
            console.warn("Next activity does not exist.");
        }
    }, [showRoute]);
    const closeModal = () => {
        setShowModal(false);
        setModalActivity(null); // Clear the modal activity when closing
    };
    if (loadError) {
        return (_jsxs("div", { className: "ResultsPage font-poppins min-h-screen flex flex-col", children: [_jsx(Header, {}), _jsx("main", { className: "flex-grow bg-gray-100 flex items-center justify-center", children: _jsx("p", { className: "text-red-500", children: "Error loading Google Maps. Please check your API key and internet connection." }) }), _jsx(Footer, {})] }));
    }
    return (_jsxs("div", { className: "ResultsPage font-poppins min-h-screen flex flex-col", children: [_jsx(Header, {}), _jsx("main", { className: "flex-grow bg-gray-100", children: _jsxs("div", { className: "max-w-screen-xl mx-auto py-4 sm:py-8 px-4 sm:px-8 flex flex-col lg:flex-row", children: [_jsx("div", { className: "w-full lg:w-2/3 lg:pr-4 mb-6 lg:mb-0", children: parsedItinerary ? (_jsxs(_Fragment, { children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6", children: parsedItinerary.title }), _jsx("div", { className: "space-y-4 sm:space-y-6", children: parsedItinerary.sections.map((section, index) => (_jsxs("div", { className: "bg-white rounded-lg shadow-md p-4 sm:p-6", children: [_jsx("h3", { className: "text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4", children: section.time }), _jsx("div", { className: "space-y-3 sm:space-y-4", children: section.activities.map((activity, idx) => (_jsxs("div", { className: "flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden", children: [_jsx("div", { className: "w-full sm:w-32", children: _jsx("img", { src: activity.photos?.[0] || activity.photos?.[1], alt: activity.activity, className: "w-full h-48 sm:h-32 object-cover" }) }), _jsxs("div", { className: "p-4 flex-grow", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-800 cursor-pointer mb-2 sm:mb-0", onClick: () => {
                                                                            setModalActivity(activity);
                                                                            setShowModal(true);
                                                                        }, children: activity.activity }), _jsxs("div", { className: "flex items-center text-gray-600 mt-2 sm:mt-1", children: [_jsx("span", { className: "text-yellow-400 mr-1", children: _jsx(FaStar, {}) }), _jsx("span", { className: "mr-2", children: activity.rating }), _jsx("span", { className: "mr-2", children: "|" }), _jsx("span", { className: "mr-1", children: _jsx(FaClock, {}) }), _jsx("span", { children: activity.duration })] }), _jsx("div", { className: "text-gray-700 mt-2", children: activity.comments && _jsx("p", { className: "line-clamp-2", children: activity.comments }) })] }), _jsx("div", { className: "p-4 flex items-center justify-center", children: _jsx("button", { onClick: () => {
                                                                        let nextActivity = section.activities[idx + 1]; // Check in the current section
                                                                        // If there's no next activity in the current section, look in the next sections
                                                                        if (!nextActivity) {
                                                                            const currentSectionIndex = parsedItinerary.sections.findIndex(s => s === section);
                                                                            for (let i = currentSectionIndex + 1; i < parsedItinerary.sections.length; i++) {
                                                                                if (parsedItinerary.sections[i].activities.length > 0) {
                                                                                    nextActivity = parsedItinerary.sections[i].activities[0]; // Take the first activity of the next section
                                                                                    break;
                                                                                }
                                                                            }
                                                                        }
                                                                        if (!nextActivity) {
                                                                            console.warn(`No next activity to show route for. Current activity index: ${idx}, total activities in section: ${section.activities.length}.`);
                                                                            alert("No next activity available.");
                                                                        }
                                                                        else {
                                                                            console.log("Next activity exists:", nextActivity.activity);
                                                                            console.log("Next activity location:", nextActivity.location);
                                                                            handleShowRoute(activity, nextActivity); // Call the route function if nextActivity exists
                                                                        }
                                                                        // Center the map on the current activity's location
                                                                        if (activity.location) {
                                                                            setMapCenter(activity.location);
                                                                        }
                                                                        else {
                                                                            console.warn("Current activity location is missing.");
                                                                        }
                                                                    }, className: "w-full sm:w-auto px-4 py-2 bg-[#FF5733] hover:bg-[#FF7849] text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50", children: "Show on Map" }) })] }, `activity-${index}-${idx}`))) })] }, `section-${index}`))) }), _jsxs("div", { className: "mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4", children: [_jsx("button", { className: "h-[40px] px-6 bg-[#FF5733] hover:bg-[#FF7849] text-white font-semibold rounded transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50", onClick: () => navigate('/plan-trip'), children: "Go Back" }), _jsx("button", { className: "h-[40px] px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50", onClick: saveItinerary, children: "Save Itinerary" })] })] })) : (_jsx("p", { className: "text-gray-600 text-center", children: "Loading itinerary..." })) }), _jsx("div", { className: "w-full lg:w-1/3 h-[400px] lg:h-[calc(100vh-64px)] lg:sticky lg:top-0", children: isLoaded ? (_jsx("div", { className: "h-full rounded-lg overflow-hidden shadow-lg", children: _jsx(GoogleMap, { zoom: 13, center: mapCenter, mapContainerClassName: "w-full h-full", onLoad: handleMapLoad, children: selectedRoute && (_jsxs(_Fragment, { children: [selectedRoute.routes[0].legs.map((leg, index) => (_jsx(Marker, { position: {
                                                    lat: leg.start_location.lat(),
                                                    lng: leg.start_location.lng(),
                                                }, label: {
                                                    text: String.fromCharCode(65 + index), // A, B, C, etc.
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                } }, `marker-${index}`))), _jsx(Marker, { position: {
                                                    lat: selectedRoute.routes[0].legs[selectedRoute.routes[0].legs.length - 1].end_location.lat(),
                                                    lng: selectedRoute.routes[0].legs[selectedRoute.routes[0].legs.length - 1].end_location.lng(),
                                                }, label: {
                                                    text: String.fromCharCode(65 + selectedRoute.routes[0].legs.length), // Next letter
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                } }), selectedRoute.routes[0].legs.map((leg, index) => (_jsx(Polyline, { path: leg.steps.flatMap(step => step.path.map(point => ({
                                                    lat: point.lat(),
                                                    lng: point.lng(),
                                                }))), options: {
                                                    strokeColor: segmentColors[index] || '#FF5733', // Assign unique color or fallback
                                                    strokeWeight: 4,
                                                    strokeOpacity: 0.8,
                                                } }, `polyline-${index}`)))] })) }) })) : (_jsx("p", { className: "text-gray-600 text-center", children: "Loading map..." })) })] }) }), _jsx(Footer, {}), showPopup && (_jsx("div", { className: "fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg text-center", children: [_jsx("p", { className: "text-gray-800 mb-4", children: "Itinerary saved successfully!" }), _jsx("button", { className: "h-[40px] px-6 bg-[#FF5733] hover:bg-[#FF7849] text-white font-semibold rounded transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-opacity-50", onClick: () => setShowPopup(false), children: "Close" })] }) })), showModal && modalActivity && (_jsx("div", { className: "fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative", children: [_jsx("button", { onClick: closeModal, className: "absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold", children: "\u00D7" }), _jsx("h2", { className: "text-2xl font-semibold mb-4 text-gray-800", children: modalActivity.activity }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx("div", { className: "space-y-4", children: modalActivity.photos && modalActivity.photos.map((photoUrl, idx) => (_jsx(LazyLoadImage, { 
                                        // effect="blur"
                                        src: photoUrl, alt: modalActivity.activity, className: "w-full h-auto rounded-lg shadow-md" }, idx))) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center text-lg", children: [_jsx("span", { className: "text-yellow-400 mr-2", children: _jsx(FaStar, {}) }), _jsx("span", { className: "font-semibold text-gray-800", children: "Rating:" }), _jsx("span", { className: "ml-2 text-gray-800", children: modalActivity.rating })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "text-gray-800", children: [_jsx("span", { className: "font-semibold", children: "Duration:" }), " ", modalActivity.duration] }), _jsxs("p", { className: "text-gray-800", children: [_jsx("span", { className: "font-semibold", children: "Budget:" }), " ", modalActivity.budget] }), _jsxs("p", { className: "text-gray-800", children: [_jsx("span", { className: "font-semibold", children: "Weather:" }), " ", modalActivity.weather] }), _jsxs("p", { className: "text-gray-800", children: [_jsx("span", { className: "font-semibold", children: "Commute:" }), " ", modalActivity.commute_time] })] }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "font-semibold mb-2 text-gray-800", children: "Details:" }), _jsx("p", { className: "text-gray-700", children: modalActivity.comments })] }), modalActivity.location_details && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "font-semibold mb-2 text-gray-800", children: "Location:" }), _jsx("p", { className: "text-gray-800", children: modalActivity.location_details.address }), _jsxs("p", { className: "text-gray-800", children: [modalActivity.location_details.city, ", ", modalActivity.location_details.country] })] }))] })] })] }) }))] }));
};
export default ResultsPage;
