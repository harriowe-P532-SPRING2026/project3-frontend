import { Link } from 'react-router'
import useObservationStore from '../lib/observationStore'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Header() {
    const user = useObservationStore((state) => state.user)
    const users = useObservationStore((state) => state.users)
    const setUser = useObservationStore((state) => state.setUser)

    function handleUserChange(id) {
        const selected = users.find(u => String(u.id) === id)
        if (selected) setUser(selected)
    }

    return (
        <div className="h-10 bg-blue-100 flex justify-between items-center">
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
                <Link to={"/functions"} className='p-1'>
                    Functions
                </Link>
            </div>
            <div className="flex items-center pr-1">
                <Select value={user ? String(user.id) : ""} onValueChange={handleUserChange}>
                    <SelectTrigger className="border-none shadow-none bg-transparent h-8">
                        <SelectValue placeholder="Logged out" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.map(u => (
                            <SelectItem key={u.id} value={String(u.id)}>
                                {u.fullName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
