import { useEffect, useState } from 'react'
import Overview from './overview/Overview'
import DepartureTimes from './departure-times/DepartureTimes'
import { Pages } from '../../models/enums/Pages'
import NavigationBar from './navbar/NavigationBar'
import LoginModal from '../shared/login-modal/LoginModal'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { getLoggedInUser } from '../../redux/common/CommonSlice'
import { fetchCars } from '../../redux/car/CarSlice'
import { fetchSims } from '../../redux/simulation-entries/SimulationEntriesSlice'
import { fetchSettings } from '../../redux/settings/SettingsSlice'
import InitialSetupModal from '../shared/initial-setup/InitialSetupModal'

function Dashboard() {
    const dispatch = useAppDispatch()
    const [currentPage, setCurrentPage] = useState<Pages>(Pages.Overview);
    const {currentUser} =  useAppSelector(s => s.common);

    const [showAuthModal, setShowAuthModal] = useState(true);
    const [showInitalSetup, setShowInitialSetup] = useState(true);
    
    const getContent = (): JSX.Element => {
        switch (currentPage) {
            case Pages.Overview:
                return <Overview />

            case Pages.DepartureTimes: 
                return <DepartureTimes />
        
            default:
                return <div>An Error accured</div>
        }
    };

    useEffect(() => {
        if(currentUser) {
            setShowAuthModal(false);
            dispatch(fetchCars(currentUser.id!));
            dispatch(fetchSims(currentUser.id!));
            dispatch(fetchSettings(currentUser.id!));
        } else {
            setShowAuthModal(true);
        }
    }, [currentUser])

    useEffect(() => {
        dispatch(getLoggedInUser());
    }, [])
    

  return (
    <>
        <NavigationBar onNavigate={(p) => setCurrentPage(p)}/>
        { getContent() }
        <LoginModal show={showAuthModal} onDismiss={() => console.log("first")} />
        <InitialSetupModal show={showInitalSetup} onDismiss={() => setShowInitialSetup(false)} />
    </>
  );
}

export default Dashboard