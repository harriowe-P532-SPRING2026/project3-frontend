import { Link } from "react-router";
import useObservationStore from "../lib/observationStore";
import { Button } from "@/components/ui/button"
import { useEffect } from "react";
import { DataTable } from "../components/DataTable";

const test = {
    "phenomenon": {
      "id": 1,
      "name": "Obesity",
      "phenomenonType": {
        "name": "Weight Status",
        "type": "QUAL",
        "allowedUnits": [],
        "id": 1
      }
    },
    "presence": "PRESENT",
    "patient": {
      "dateOfBirth": "2004-04-10",
      "note": "test",
      "fullName": "Owen Harris",
      "hibernateLazyInitializer": {},
      "id": 1
    },
    "recordingTime": "2026-04-14T21:52:25.019",
    "applicabilityTime": "2026-04-14T21:52:25.019",
    "protocol": {
      "name": "Test Protocol",
      "description": "test",
      "accuracyRating": "HIGH",
      "id": 1
    },
    "id": 2,
    "observationStatus": "ACTIVE",
    "rejectionReason": null,
    "type": "category"
  }

const columnCategory = [
    {
        accessorKey: "patient",
        header: "Phenomenon Type",
        cell: ({row}) => {
            return row.original.phenomenon.phenomenonType.name
        }
    },
    {
        accessorKey: "phenomenon",
        header: "Phenomenon",
        cell: ({row}) => {
            return row.original.phenomenon.name
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

    return (
        <div className="w-75/100 m-auto">
            <h1 className="text-xl">{patient.fullName}</h1>
            <p>Date Of Birth: {patient.dateOfBirth}</p>
            <p>Patient Note: {patient.note}</p>
            <h2 className="mt-1 text-xl">Measurement Observations:</h2>
            <DataTable columns={columnMeasurement} data={measurementObservations} />
            <h2 className="mt-1 text-xl">Category Observations:</h2>
            <DataTable columns={columnCategory} data={categoryObservations} />
            <Button varient="outline" >
                <Link to={"/new-observation/" + patient.id} >
                    Record Observation
                </Link>
            </Button>
        </div>
    )
}