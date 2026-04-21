import { useEffect } from "react";
import useObservationStore from "../lib/observationStore";
import { DataTable } from "../components/DataTable";
import { Button } from "@/components/ui/button"
import { Link } from "react-router";

const columnDef = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "strategy",
        header: "Strategy",
    },
    {
        accessorKey: "productConcept",
        header: "Product Concept",
        cell: ({ row }) => {
            const p = row.getValue("productConcept");
            return `${p.phenomenonType.name} : ${p.name}`
        },
    },
    {
        accessorKey: "argumentConcepts",
        header: "Argument Concepts",
        cell: ({ row }) => {
            const concepts = row.getValue("argumentConcepts");
            const weights = row.original.weights;
            const isWeighted = row.original.strategy === "WEIGHTED";
            return concepts.map((c, i) =>
                isWeighted ? `${c.name} (${weights[i]})` : c.name
            ).join(", ")
        },
    },
    {
        accessorKey: "weightThreshold",
        header: "Weight Threshold",
        cell: ({ row }) => row.getValue("weightThreshold") ?? "-",
    },
]

export default function Functions() {
    const functions = useObservationStore(state => state.functions);
    const fetchFunctions = useObservationStore(state => state.fetchFunctions);

    useEffect(() => {
        fetchFunctions()
    }, [])

    return (
        <div className="w-75/100 m-auto">
            <h1 className="mb-2 mt-2 text-2xl">Functions</h1>
            <DataTable data={functions} columns={columnDef} />
            <Button varient="outline" className="mt-2">
                <Link to={"/functions/new"}>
                    Create New Function
                </Link>
            </Button>
        </div>
    )
}
