import { idText } from 'typescript'
import { create } from 'zustand'

// const host = "https://observation-api.harrisowe.me/api"
const host = "http://localhost:8080/api"

const useObservationStore = create((set, get) => ({
    user: null,
    users: [],
    fetchUser: async () => {
        const response = await fetch(`${host}/patients/user`)
        if (!response.ok) {
            console.error("error getting users")
        }
        const json = await response.json();
        if (json.length == 0) {
            alert("No users found")
        } else {
            set({users: json, user: json[0]})
        }
    },
    setUser: (user) => set({user}),
    patients: [],
    fetchPatients: async () => {
        const response = await fetch(`${host}/patients`)
        if (!response.ok) {
            console.error("error getting patients")
        }
        const json = await response.json();
        set({patients: json})
    },
    newPatient: async (fullName, dob, note) => {
        const response = await fetch(`${host}/patients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName,
                dateOfBirth: dob,
                note
            })
        })

        if (!response.ok) {
            alert("Failed to create patient");
            return false;
        }
        return true;
    },
    protocols: [],
    phenomena: [],
    phenomenonTypes: [],
    fetchProtocols: async () => {
        const response = await fetch(`${host}/protocols`)
        if (!response.ok) {
            console.error("Failed to fetch protocols")
        }
        const protocols = await response.json();
        set({protocols})
    },
    newProtocol: async (name, description, accuracyRating) => {
        const response = await fetch(`${host}/protocols`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, description, accuracyRating })
        })
        if (!response.ok) {
            alert("Failed to create protocol");
            return false;
        }
        return true;
    },
    fetchPhenomena: async () => {
        const response = await fetch(`${host}/phenomenon-types/phenomena`)
        if (!response.ok) {
            console.error("Failed to fetch phenomena")
        }
        const phenomena = await response.json();
        set({phenomena})
    },
    fetchPhenomenonTypes: async () => {
        const response = await fetch(`${host}/phenomenon-types`)
        if (!response.ok) {
            console.error("Failed to fetch protocols")
        }
        const phenomenonTypes = await response.json();
        set({phenomenonTypes})
    },
    functions: [],
    fetchFunctions : async() => {
        const response = await fetch(`${host}/observations/function`)
        if (!response.ok) {
            console.error("Failed to fetch functions")
        }
        const functions = await response.json();
        set({functions})
    },
    newFunction: async(name, argumentConcepts, weights, strategy, threshold, productConceptId) => {
        const response = await fetch(`${host}/observations/function`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                argumentConceptsIds: argumentConcepts,
                weights: weights,
                strategy,
                threshold,
                productConceptId,
                userId: get().userId
            })
        })
        if (!response.ok) {
            alert("Failed to create function");
            return false;
        }
        return true;
    },
    newPhenomenonType: async (name, kind, allowedUnits, phenomena, normalMin, normalMax) => {
        const response = await fetch(`${host}/phenomenon-types`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                kind,
                allowedUnits,
                phenomena,
                userId: get().user.id,
                normalMin,
                normalMax
            })
        })
        if (!response.ok) {
            alert("Failed to create phenomenon type");
            return false;
        }
        return true;
    },
    submitMeasurement: async (payload) => {
        console.log(payload)
        const response = await fetch(`${host}/observations/measurement`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            alert("Error submitting measurement: " + await response.text())
            return false;
        }
        return true;
    },
    submitCategory: async (payload) => {
        console.log(payload)
        const response = await fetch(`${host}/observations/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            alert("Error submitting category: " + await response.text())
            return false;
        }
        return true;
    },
    auditLog: [],
    fetchAuditLog: async () => {
        const response = await fetch(`${host}/audit-log`)
        if (!response.ok) {
            console.error("Failed to fetch audit log")
        }
        const auditLog = await response.json();
        set({auditLog})
    },
    commandLog: [],
    fetchCommandLog: async () => {
        const response = await fetch(`${host}/command-log`)
        if (!response.ok) {
            console.error("Failed to fetch command log")
        }
        const commandLog = await response.json();
        set({commandLog})
    },
    undoCommand: async (id) => {
        const response = await fetch(`${host}/command-log/${id}/undo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(get().user.id)
        })
        if (!response.ok) {
            alert("Failed to undo command")
            return false;
        } else {
            return true;
        }

    },
    observations: [],
    fetchObservations: async (patientId) => {
        const response = await fetch(`${host}/patients/${patientId}/observations`)
        if (!response.ok) {
            console.error("failed to fetch observations")
        }
        const json = await response.json();
        set({observations: json})
    },
    evaluateRules: async (patientId) => {
        const response = await fetch(`${host}/patients/${patientId}/evaluate`, {
            method: "POST"
        })
        if (!response.ok) {
            console.error("Failed to evaluate rules")
            return [];
        }
        const json = await response.json();
        console.log(json);
        return json;
    },
    rejectObservation: async (id, reason) => {
        const response = await fetch(`${host}/observations/${id}/reject`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: get().user.id,
                rejectionReason: reason
            })
        })

        if (!response.ok) {
            console.error("Failed to reject observation");
            return false;
        } else {
            return true;
        }
     }
}))

export default useObservationStore;