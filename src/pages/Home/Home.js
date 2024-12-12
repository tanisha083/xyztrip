import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from '../../components/Header/Header';
import MainBanner from '../../components/MainBanner/MainBanner';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import Footer from '../../components/Footer/Footer';
const Home = () => {
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsxs("main", { children: [_jsx(MainBanner, {}), _jsx(FeaturesSection, {})] }), _jsx(Footer, {})] }));
};
export default Home;
