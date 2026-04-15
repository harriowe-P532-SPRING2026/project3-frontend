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
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "allowedUnits",
        header: "Allowed Units",
        cell: ({ row }) => row.getValue("allowedUnits").join(", ") || "-",
    },
    {
        accessorKey: "phenomena",
        header: "Phenomena",
        cell: ({ row }) => row.getValue("phenomena").map(p => p.name).join(", ") || "-",
    },
]

export default function PhenomenonType() {
    const phenomenonTypes = useObservationStore(state => state.phenomenonTypes);
    const fetchPhenomenonTypes = useObservationStore(state => state.fetchPhenomenonTypes);

    useEffect(() => {
        fetchPhenomenonTypes()
    }, [])

    return (
        <div className="w-50/100 m-auto">
            <h1 className="mb-2 mt-2 text-2xl">Phenomenon Types</h1>
            <DataTable data={phenomenonTypes} columns={columnDef} />
            <Button varient="outline">
                <Link to={"/phenomenon-types/new"}>
                    Create New Type
                </Link>
            </Button>
        </div>
    )
}