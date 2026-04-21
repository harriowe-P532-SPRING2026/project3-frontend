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

export default function NewFunction() {
    const newFunction = useObservationStore(state => state.newFunction)
    const phenomena = useObservationStore(state => state.phenomena)
    const fetchPhenomena = useObservationStore(state => state.fetchPhenomena)

    const [name, setName] = useState("")
    const [strategy, setStrategy] = useState("CONJUNCTIVE")
    const [productConceptId, setProductConceptId] = useState("")
    const [weightThreshold, setWeightThreshold] = useState("")
    const [argumentConcepts, setArgumentConcepts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchPhenomena()
    }, [])

    async function createFunction() {
        const args = argumentConcepts.map(a => a.id)
        const weights = strategy === "WEIGHTED" ? argumentConcepts.map(a => parseFloat(a.weight)) : []
        const threshold = strategy === "WEIGHTED" ? parseFloat(weightThreshold) : null
        if (await newFunction(name, args, weights, strategy, threshold, parseInt(productConceptId))) {
            navigate("/functions")
        }
    }

    function addArgumentConcept(id) {
        const concept = phenomena.find(p => p.id == id)
        if (concept && !argumentConcepts.find(a => a.id == id)) {
            setArgumentConcepts([...argumentConcepts, { ...concept, weight: "0.5" }])
        }
    }

    function removeArgumentConcept(id) {
        setArgumentConcepts(argumentConcepts.filter(a => a.id != id))
    }

    function updateWeight(id, weight) {
        setArgumentConcepts(argumentConcepts.map(a => a.id == id ? { ...a, weight } : a))
    }

    return (
        <div className="w-50/100 m-auto">
            <h1 className="text-2xl mb-2">New Function</h1>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="function-name">Name</FieldLabel>
                    <Input id="function-name" value={name} onChange={(e) => setName(e.target.value)} />
                </Field>

                <Field>
                    <FieldLabel>Strategy</FieldLabel>
                    <Select value={strategy} onValueChange={(e) => setStrategy(e)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="CONJUNCTIVE">Conjunctive</SelectItem>
                            <SelectItem value="WEIGHTED">Weighted</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                <Field>
                    <FieldLabel>Product Concept</FieldLabel>
                    <Select value={productConceptId} onValueChange={setProductConceptId}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {phenomena.map(p => (
                                <SelectItem key={p.id} value={String(p.id)}>
                                    {p.phenomenonType.name} : {p.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>

                {strategy === "WEIGHTED" &&
                    <Field>
                        <FieldLabel>Weight Threshold</FieldLabel>
                        <Input
                            type="number"
                            value={weightThreshold}
                            onChange={(e) => setWeightThreshold(e.target.value)}
                        />
                    </Field>
                }

                <Field>
                    <FieldLabel>Argument Concepts</FieldLabel>
                    <Select onValueChange={addArgumentConcept} value="">
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {phenomena.map(p => (
                                <SelectItem key={p.id} value={String(p.id)}>
                                    {p.phenomenonType.name} : {p.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="mt-1">
                        {argumentConcepts.map(a => (
                            <div key={a.id} className="flex gap-2 items-center mt-1">
                                <span className="flex-1">{a.phenomenonType.name} : {a.name}</span>
                                {strategy === "WEIGHTED" &&
                                    <Input
                                        type="number"
                                        className="w-24"
                                        value={a.weight}
                                        onChange={(e) => updateWeight(a.id, e.target.value)}
                                    />
                                }
                                <button type="button" onClick={() => removeArgumentConcept(a.id)}>X</button>
                            </div>
                        ))}
                    </div>
                </Field>

                <Button type="submit" className="w-25 mt-2" onClick={() => createFunction()}>
                    Submit
                </Button>
            </FieldGroup>
        </div>
    )
}
