import useObservationStore from "../lib/observationStore";
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useNavigate } from "react-router";


export default function RejectObservation({params}) {
    const id = params.id;
    const rejectObservation = useObservationStore(state => state.rejectObservation)
    const [reason, setReason] = useState("")
    const navigate = useNavigate()

    async function reject() {
        if (await rejectObservation(id, reason)) {
            navigate("/patients")
        }
    }

    return (
        <div className="w-50/100 m-auto">
            <h1 className="text-2xl mb-2">Reject Observation</h1>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-reason">Rejection Reason</FieldLabel>
                    <Input id="fieldgroup-name" type="text" value={reason} onChange={(e) => setReason(e.target.value)}></Input>
                </Field>


                <Button type="submit" className="w-25 mt-2" onClick={(e) => reject()}>
                    Submit
                </Button>

            </FieldGroup>
        </div>
    )

}