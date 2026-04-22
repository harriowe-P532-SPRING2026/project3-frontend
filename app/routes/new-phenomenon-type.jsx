import { Button } from "@/components/ui/button"
import {
    Field,
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
import useObservationStore from "../lib/observationStore";

export default function NewPhenomenonType() {
    const newPhenomenonType = useObservationStore(state => state.newPhenomenonType)
    const phenomena = useObservationStore(state => state.phenomena)
    const fetchPhenomena = useObservationStore(state => state.fetchPhenomena)
    const [name, setName] = useState("")
    const [kind, setKind] = useState("QUANT")
    const [allowedUnits, setAllowedUnits] = useState([])
    const [unitInput, setUnitInput] = useState("")
    const [normalMin, setNormalMin] = useState("")
    const [normalMax, setNormalMax] = useState("")
    const [newPhenomena, setNewPhenomena] = useState([])
    const [phenomenonInput, setPhenomenonInput] = useState("")
    const [parentConceptInput, setParentConceptInput] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetchPhenomena()
    }, [])

    async function createPhenomenonType() {
        if (await newPhenomenonType(name, kind, kind === "QUANT" ? allowedUnits : [], kind === "QUAL" ? newPhenomena : [], normalMin ? Number(normalMin) : null, normalMax ? Number(normalMax) : null)) {
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
            const item = { name: trimmed }
            if (parentConceptInput) item.parentConcept = Number(parentConceptInput)
            setNewPhenomena([...newPhenomena, item])
        }
        setPhenomenonInput("")
        setParentConceptInput("")
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
                    <>
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

                        <Field>
                            <FieldLabel htmlFor="fieldgroup-normal-min">Normal Min</FieldLabel>
                            <Input id="fieldgroup-normal-min" type="number" value={normalMin} onChange={(e) => setNormalMin(e.target.value)} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="fieldgroup-normal-max">Normal Max</FieldLabel>
                            <Input id="fieldgroup-normal-max" type="number" value={normalMax} onChange={(e) => setNormalMax(e.target.value)} />
                        </Field>
                    </>
                }

                {kind === "QUAL" &&
                    <Field>
                        <FieldLabel>Phenomena</FieldLabel>
                        <div className="flex gap-2">
                            <Input
                                id="fieldgroup-phenomenon-input"
                                placeholder="Name"
                                value={phenomenonInput}
                                onChange={(e) => setPhenomenonInput(e.target.value)}
                            />
                            <Select value={parentConceptInput} onValueChange={setParentConceptInput}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Parent (optional)" />
                                </SelectTrigger>
                                <SelectContent>
                                    {phenomena.map(p => (
                                        <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button type="button" onClick={() => addPhenomenon()} disabled={!phenomenonInput.trim()}>Add</Button>
                        </div>
                        <div>
                            {newPhenomena.map((p, i) => (
                                <div key={i}>
                                    {p.name}{p.parentConcept ? ` (parent: ${phenomena.find(x => x.id === p.parentConcept)?.name ?? p.parentConcept})` : ""}
                                    {" "}<button type="button" onClick={() => setNewPhenomena(newPhenomena.filter((_, j) => j !== i))}> X</button>
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
