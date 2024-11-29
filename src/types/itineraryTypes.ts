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