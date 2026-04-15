import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router";
import useObservationStore from "../lib/observationStore";

export default function NewProtocol() {
    const newProtocol = useObservationStore(state => state.newProtocol)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [accuracyRating, setAccuracyRating] = useState("")
    const navigate = useNavigate()

    async function createProtocol() {
        if (await newProtocol(name, description, accuracyRating)) {
            navigate("/protocols")
        }
    }

    return (
        <div className="w-50/100 m-auto" >
            <h1 className="text-2xl mb-2">New Protocol</h1>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
                    <Input id="fieldgroup-name" value={name} onChange={(e) => setName(e.target.value)} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-description">Description</FieldLabel>
                    <Input id="fieldgroup-description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-accuracy">Accuracy Rating</FieldLabel>
                    <Select value={accuracyRating} onValueChange={(e) => setAccuracyRating(e)}>
                        <SelectTrigger id="fieldgroup-accuracy">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="HIGH">High</SelectItem>
                            <SelectItem value="MEDIUM">Medium</SelectItem>
                            <SelectItem value="LOW">Low</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                <Button type="submit" className="w-25 mt-2" onClick={() => createProtocol()}>
                    Submit
                </Button>
            </FieldGroup>
        </div>
    )
}
