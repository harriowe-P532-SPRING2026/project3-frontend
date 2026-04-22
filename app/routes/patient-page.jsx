import { Link } from "react-router";
import useObservationStore from "../lib/observationStore";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { DataTable } from "../components/DataTable";

const columnCategory = [
    {
        accessorKey: "patient",
        header: "Phenomenon Type",
        cell: ({row}) => {
            const name = row.original.phenomenon.phenomenonType.name
            return row.original.source === "INFERRED"
                ? <em>{name}</em>
                : <span>{name}</span>
        }
    },
    {
        accessorKey: "phenomenon",
        header: "Phenomenon",
        cell: ({row}) => {
            const name = row.original.phenomenon.name
            return row.original.source === "INFERRED"
                ? <em>{name}</em>
                : <span>{name}</span>
        }
    },
    {
        accessorKey: "recordingTime",
        header: "Recording Time",
        cell: ({row}) => {
            const d = new Date(row.getValue("recordingTime"))
            return <p>{d.toLocaleString()}</p>
        }
    },
    {
        accessorKey: "applicabilityTime",
        header: "Applicability Time",
        cell: ({row}) => {
            const d = new Date(row.getValue("applicabilityTime"))
            return <p>{d.toLocaleString()}</p>
        }
    },
    {
        accessorKey: "observationStatus",
        header: "Status"
    },
    {
        accessorKey: "id",
        header: "Actions",
        meta: { style: { width: '1px' } },
        cell: ({row}) => {
          return <Button className="" varient="outline">
                  <Link to={"/reject-observation/" + row.getValue("id")} >
                  Reject
                  </Link>
          </Button>
        }
    }
]
const columnMeasurement = [
    {
        accessorKey: "phenomenonType",
        header: "Phenomenon Type",
        cell: ({row}) => {
            return row.original.phenomenonType.name
        }
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "unit",
        header: "Unit"
    },
    {
        accessorKey: "recordingTime",
        header: "Recording Time",
        cell: ({row}) => {
            const d = new Date(row.getValue("recordingTime"))
            return <p>{d.toLocaleString()}</p>
        }
    },
    {
        accessorKey: "applicabilityTime",
        header: "Applicability Time",
        cell: ({row}) => {
            const d = new Date(row.getValue("applicabilityTime"))
            return <p>{d.toLocaleString()}</p>
        }
    },
    {
        accessorKey: "observationStatus",
        header: "Status"
    },
    {
        accessorKey: "id",
        header: "Actions",
        meta: { style: { width: '1px' } },
        cell: ({row}) => {
          return <Button className="" varient="outline">
                  <Link to={"/reject-observation/" + row.getValue("id")} >
                  Reject
                  </Link>
          </Button>
        }
    }
]

export default function PatientPage({params}) {
    const id = params.id;
    const patient = useObservationStore(state => state.patients.find(p => p.id == id));
    const fetchPatients = useObservationStore(state => state.fetchPatients)
    const observations = useObservationStore(state => state.observations)
    const fetchObservations = useObservationStore(state => state.fetchObservations);
    const evaluateRules = useObservationStore(state => state.evaluateRules);

    const [rulesResult, setRulesResult] = useState(null);

    const categoryObservations = observations.filter(o => o.type == "category");
    const measurementObservations = observations.filter(o => o.type == "measurement");


    useEffect(() => {
        fetchObservations(id)
    }, [])

    useEffect(() => {
        console.log(observations)
    }, [observations])

    if (!patient) {
        fetchPatients()
        return <div>Loading</div>
    }

    const handleEvaluateRules = async () => {
        const result = await evaluateRules(id);
        setRulesResult(result);
    }

    return (
        <div className="w-75/100 m-auto">
            <h1 className="text-xl">{patient.fullName}</h1>
            <p>Date Of Birth: {patient.dateOfBirth}</p>
            <p>Patient Note: {patient.note}</p>
            <h2 className="mt-1 text-xl">Measurement Observations:</h2>
            <DataTable columns={columnMeasurement} data={measurementObservations} />
            <h2 className="mt-1 text-xl">Category Observations:</h2>
            <DataTable columns={columnCategory} data={categoryObservations} />
            <div className="mt-2 flex gap-2">
                <Button varient="outline" >
                    <Link to={"/new-observation/" + patient.id} >
                        Record Observation
                    </Link>
                </Button>
                <Button variant="outline" onClick={handleEvaluateRules}>
                    Evaluate Rules
                </Button>
            </div>
            {rulesResult && (
                <div className="mt-2">
                    <h2 className="text-xl">Rule Evaluation Results:</h2>
                    <ul className="list-disc list-inside">
                        {rulesResult.map((p, i) => (
                            <li key={i}>
                                {p.phenomenon.phenomenonType.name} : {p.phenomenon.name}
                                {p.relevantObservations?.length > 0 && (
                                    <ul className="list-disc list-inside ml-4">
                                        {p.relevantObservations.map(o => (
                                            <li key={o.id}>
                                                {o.phenomenon.phenomenonType.name} : {o.phenomenon.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}