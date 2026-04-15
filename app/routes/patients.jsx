import { useEffect } from "react";
import useObservationStore from "../lib/observationStore"
import { DataTable } from "../components/DataTable";
import { Button } from "@/components/ui/button"
import { Link } from "react-router";



const columnDef = [
    {
      accessorKey: "fullName",
      header: "Name",
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth"
    },
    {
      accessorKey: "id",
      header: "Patient Page",
      meta: { style: { width: '1px' } },
      cell: ({row}) => {
        return <Button className="" varient="outline">
                <Link to={"/patient/" + row.getValue("id")} >
                Patient Page
                </Link>
        </Button>
      }
    }
]

export default function Patients() {
    const patients = useObservationStore(state => state.patients);
    const fetchPatients = useObservationStore(state => state.fetchPatients);

    useEffect(() => {
        fetchPatients();
    }, [])

    useEffect(() => {
        console.log(patients)
    }, [patients])

    return (
        <div className="w-50/100 m-auto">
            <DataTable data={patients} columns={columnDef} />
            <Button className="mt-2" varient="outline">
                <Link to={"/new-patient"} >
                New Patient
                </Link>
            </Button>
        </div>
    )
}