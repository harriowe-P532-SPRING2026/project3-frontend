import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="m-4 flex gap-2">
            <Button><Link to="/patients">Patients</Link></Button>
            <Button><Link to="/phenomenon-types">Phenomenon Types</Link></Button>
            <Button><Link to="/protocols">Protocols</Link></Button>
            <Button><Link to="/audit-log">Audit Log</Link></Button>
        </div>
    )
}
