import { useEffect } from "react";
import useObservationStore from "../lib/observationStore";
import { DataTable } from "../components/DataTable";
import { Button } from "@/components/ui/button"
import { Link } from "react-router";

const columnDef = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "accuracyRating",
        header: "Accuracy Rating",
    },
]

export default function Protocols() {
    const protocols = useObservationStore(state => state.protocols);
    const fetchProtocols = useObservationStore(state => state.fetchProtocols);

    useEffect(() => {
        fetchProtocols()
    }, [])

    return (
        <div className="w-50/100 m-auto">
            <h1 className="mb-2 mt-2 text-2xl">Protocols</h1>
            <DataTable data={protocols} columns={columnDef} />
            <Button varient="outline">
                <Link to={"/protocols/new"}>
                    Create New Protocol
                </Link>
            </Button>
        </div>
    )
}
