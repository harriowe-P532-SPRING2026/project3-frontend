import { useEffect } from "react";
import useObservationStore from "../lib/observationStore";
import { DataTable } from "../components/DataTable";

const auditColumnDef = [
    {
        accessorKey: "patient",
        header: "Patient",
        cell: ({ row }) => row.getValue("patient")?.fullName || "-",
    },
    {
        id: "type",
        header: "Type",
        cell: ({ row }) => row.original.observation?.type || "-",
    },
    {
        id: "status",
        header: "Status",
        cell: ({ row }) => row.original.observation?.observationStatus || "-",
    },
    {
        id: "recordingTime",
        header: "Recorded At",
        cell: ({ row }) => {
            const t = row.original.observation?.recordingTime
            return t ? new Date(t).toLocaleString() : "-"
        },
    },
]

const commandColumnDef = [
    {
        accessorKey: "commandType",
        header: "Command",
    },
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => row.getValue("user")?.fullName || "System",
    },
    {
        accessorKey: "executedAt",
        header: "Executed At",
        cell: ({ row }) => new Date(row.getValue("executedAt")).toLocaleString(),
    },
    {
        accessorKey: "json",
        header: "Details",
        cell: ({ row }) => {
            const json = row.getValue("json")
            const abbreviated = json.length > 40 ? json.slice(0, 40) + "..." : json
            return <span title={json} className="cursor-default">{abbreviated}</span>
        },
    },
]

export default function AuditLog() {
    const auditLog = useObservationStore(state => state.auditLog)
    const fetchAuditLog = useObservationStore(state => state.fetchAuditLog)
    const commandLog = useObservationStore(state => state.commandLog)
    const fetchCommandLog = useObservationStore(state => state.fetchCommandLog)

    useEffect(() => {
        fetchAuditLog()
        fetchCommandLog()
    }, [])

    return (
        <div className="flex gap-4 m-4">
            <div className="flex-1">
                <h1 className="text-2xl mb-2 mt-2">Audit Log</h1>
                <DataTable data={auditLog} columns={auditColumnDef} />
            </div>
            <div className="flex-1">
                <h1 className="text-2xl mb-2 mt-2">Command Log</h1>
                <DataTable data={commandLog} columns={commandColumnDef} />
            </div>
        </div>
    )
}
