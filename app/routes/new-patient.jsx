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

export default function NewPatient() {
    const newPatient = useObservationStore(state => state.newPatient)
    const [name, setName] = useState("")
    const [note, setNote] = useState("")
    const [dob, setDob] = useState("")
    const navigate = useNavigate()

    async function createPatient() {
        if (await newPatient(name, dob, note)) {
            navigate("/patients")
        }
        console.log(name, note, dob)
    }

    return (
        <div className="w-50/100 m-auto">
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-name">Full Name</FieldLabel>
                    <Input id="fieldgroup-name" type="name" value={name} onChange={(e) => setName(e.target.value)}></Input>
                </Field>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-note">Note</FieldLabel>
                    <Input id="fieldgroup-note" value={note} onChange={(e) => setNote(e.target.value)}></Input>
                </Field>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-date">Note</FieldLabel>
                    <Input id="fieldgroup-note" type="date" value={dob} onChange={(e) => setDob(e.target.value)}></Input>
                </Field>

                <Button type="submit" className="w-25 mt-2" onClick={(e) => createPatient()}>
                    Submit
                </Button>

            </FieldGroup>
        </div>
    )
}