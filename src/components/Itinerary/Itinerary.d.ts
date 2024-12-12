import * as React from 'react';
import { Section } from '../../types/itineraryTypes';
interface ItineraryProps {
    title: string;
    sections: Section[];
}
declare const Itinerary: React.FC<ItineraryProps>;
export default Itinerary;
