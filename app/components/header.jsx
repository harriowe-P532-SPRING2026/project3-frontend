import { useEffect } from 'react'
import { Link } from 'react-router'
import useObservationStore from '../lib/observationStore'

export default function Header() {
    const user = useObservationStore((state) => state.user)
    return (
        <div className="h-10 bg-blue-100 flex justify-between content-center">
            <div className="flex">
                <Link to={"/"} className='p-1'>
                    Home
                </Link><Link to={"/patients"} className='p-1'>
                    Patients
                </Link>
                <Link to={"/phenomenon-types"} className='p-1'>
                    Phenomenon Types
                </Link>
                <Link to={"/protocols"} className='p-1'>
                    Protocols
                </Link>
                <Link to={"/audit-log"} className='p-1'>
                    Audit Log
                </Link>
            </div>
            <div className="flex">
                <Link to={"/user"} className='p-1'>
                {user?.fullName || "Logged out"}
                </Link>
            </div>
        </div>
    )
}