export interface Activity {
    activity: string;
    rating: string;
    weather: string;
    duration: string;
    budget: string;
    comments: string;
    commute_time: string;
}
export interface Section {
    time: string;
    activities: Activity[];
}
interface MapLocation {
    lat: number;
    lng: number;
    placeId?: string;
}
export interface ActivityWithLocation extends Activity {
    location?: MapLocation;
    photos?: string[];
    location_details?: {
        city?: string;
        country?: string;
    };
}
export {};
