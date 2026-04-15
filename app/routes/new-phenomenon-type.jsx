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

export default function NewPhenomenonType() {
    const newPhenomenonType = useObservationStore(state => state.newPhenomenonType)
    const [name, setName] = useState("")
    const [kind, setKind] = useState("QUANT")
    const [allowedUnits, setAllowedUnits] = useState([])
    const [unitInput, setUnitInput] = useState("")
    const [phenomena, setPhenomena] = useState([])
    const [phenomenonInput, setPhenomenonInput] = useState("")
    const navigate = useNavigate()

    async function createPhenomenonType() {
        if (await newPhenomenonType(name, kind, kind === "QUANT" ? allowedUnits : [], kind === "QUAL" ? phenomena : [])) {
            navigate("/phenomenon-types")
        }
    }

    function addUnit() {
        const trimmed = unitInput.trim()
        if (trimmed && !allowedUnits.includes(trimmed)) {
            setAllowedUnits([...allowedUnits, trimmed])
        }
        setUnitInput("")
    }

    function addPhenomenon() {
        const trimmed = phenomenonInput.trim()
        if (trimmed) {
            setPhenomena([...phenomena, { name: trimmed }])
        }
        setPhenomenonInput("")
    }

    return (
        <div className="w-50/100 m-auto" >
            <h1 className="text-2xl mb-2">New Phenomenon Type</h1>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
                    <Input id="fieldgroup-name" value={name} onChange={(e) => setName(e.target.value)} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-kind">Kind</FieldLabel>
                    <Select value={kind} onValueChange={(e) => setKind(e)}>
                        <SelectTrigger id="fieldgroup-kind">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="QUANT">Quantitative</SelectItem>
                            <SelectItem value="QUAL">Qualitative</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                {kind === "QUANT" &&
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-unit-input">Allowed Units</FieldLabel>
                        <div className="flex gap-2">
                            <Input id="fieldgroup-unit-input" value={unitInput} onChange={(e) => setUnitInput(e.target.value)}/>
                            <Button type="button" onClick={() => addUnit()} disabled={!unitInput.trim()}>Add</Button>
                        </div>
                        <div>
                            {allowedUnits.map(u => (
                                <div key={u}>
                                    {u} <button type="button" onClick={() => setAllowedUnits(allowedUnits.filter(x => x !== u))}> X</button>
                                </div>
                            ))}
                        </div>
                    </Field>
                }

                {kind === "QUAL" &&
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-phenomenon-input">Phenomena</FieldLabel>
                        <div className="flex gap-2">
                            <Input id="fieldgroup-phenomenon-input" value={phenomenonInput} onChange={(e) => setPhenomenonInput(e.target.value)}/>
                            <Button type="button" onClick={() => addPhenomenon()} disabled={!phenomenonInput.trim()}>Add</Button>
                        </div>
                        <div>
                            {phenomena.map((p, i) => (
                                <div key={i}>
                                    {p.name} <button type="button" onClick={() => setPhenomena(phenomena.filter((_, j) => j !== i))}> X</button>
                                </div>
                            ))}
                        </div>
                    </Field>
                }

                <Button type="submit" className="w-25 mt-2" onClick={() => createPhenomenonType()}>
                    Submit
                </Button>
            </FieldGroup>
        </div>
    )
}
