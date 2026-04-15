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
import useObservationStore from "../lib/observationStore";

export default function NewObservation({params}) {
    const id = params.id;
    const patient = useObservationStore(state => state.patients.find(p => p.id == id));
    const fetchPatients = useObservationStore(state => state.fetchPatients)
    const protocols = useObservationStore(state => state.protocols)
    const phenomena = useObservationStore(state => state.phenomena)
    const phenomenonTypes = useObservationStore(state => state.phenomenonTypes)
    const fetchProtocols = useObservationStore(state => state.fetchProtocols);
    const fetchPhenomena = useObservationStore(state => state.fetchPhenomena);
    const fetchPhenomenonTypes = useObservationStore(state => state.fetchPhenomenonTypes);
    const submitMeasurement = useObservationStore(state => state.submitMeasurement)
    const submitCategory = useObservationStore(state => state.submitCategory)
    const [type, setType] = useState("measurement")
    const [date, setDate] = useState(null)
    const [protocol, setProtocol] = useState(null)
    const [phenomenonType, setPhenomenonType] = useState("")
    const [phenomenon, setPhenomenon] = useState("")
    const [presence, setPresence] = useState("PRESENT")
    const [unit, setUnit] = useState(null)
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        fetchPhenomena();
        fetchPhenomenonTypes();
        fetchProtocols();
    }, [])
    
    async function createObservation() {
        const payload = {
            patientId: patient.id,
            applicabilityTime: date,
            protocolId: protocol,
            userId: 1
        }
        if (type == "category") {
            payload["phenomenonId"] = phenomenon;
            payload["presence"] = presence;
            if(await submitCategory(payload)) {
                navigate("/patient/" + patient.id)
            }
        } else {
            payload["phenomenonTypeId"] = phenomenonType;
            payload["amount"] = amount;
            payload["unit"] = unit;
            if(await submitMeasurement(payload)) {
                navigate("/patient/" + patient.id)
            }
        }
    }
    
    
    
    if (!patient) {
        fetchPatients()
        return <div>Loading</div>    
    }

    return (
        <div className="w-50/100 m-auto" >
            <h1 className="text-2xl mb-2">New Observation</h1>
            <FieldGroup>
                <p>Patient: {patient.fullName}</p>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-date">Applicability Date</FieldLabel>
                    <Input id="fieldgroup-date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)}></Input>
                </Field>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-protocol">Protocol</FieldLabel>
                    <Select value={protocol} onValueChange={(e) => setProtocol(e)}>
                        <SelectTrigger id="fieldgroup-protocol">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {protocols.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </Field>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-type">Type</FieldLabel>
                    <Select value={type} onValueChange={(e) => setType(e)}>
                        <SelectTrigger id="fieldgroup-type">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="measurement">Measurement</SelectItem>
                            <SelectItem value="category">Category</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                {
                    type === "measurement"
                    ?
                    <div>
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-ptype">Phenomenon Types</FieldLabel>
                            <Select value={phenomenonType} onValueChange={(e) => setPhenomenonType(e)}>
                                <SelectTrigger id="fieldgroup-ptype">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {phenomenonTypes.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-amount">Amount</FieldLabel>
                            <Input id="fieldgroup-amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}></Input>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-unit">Units</FieldLabel>
                            <Select value={unit} onValueChange={(e) => setUnit(e)}>
                                <SelectTrigger id="fieldgroup-unit">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {phenomenonTypes.find(t => t.id == phenomenonType)?.allowedUnits.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                    :
                    <div>
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-p]">Phenomenon</FieldLabel>
                            <Select value={phenomenon} onValueChange={(e) => setPhenomenon(e)}>
                                <SelectTrigger id="fieldgroup-p">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {phenomena.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="fieldgroup-presence">Presence</FieldLabel>
                            <Select value={presence} onValueChange={(e) => setPresence(e)}>
                                <SelectTrigger id="fieldgroup-presence">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"PRESENT"}>Present</SelectItem>
                                    <SelectItem value={"ABENT"}>Absent</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                }

                <Button type="submit" className="w-25 mt-2" onClick={(e) => createObservation()}>
                    Submit
                </Button>

            </FieldGroup>
        </div>
    )


}