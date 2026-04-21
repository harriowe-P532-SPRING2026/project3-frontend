import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("/patients", "routes/patients.jsx"),
    route("/new-patient", "routes/new-patient.jsx"),
    route("/patient/:id", "routes/patient-page.jsx"),
    route("/new-observation/:id", "routes/new-observation.jsx"),
    route("/reject-observation/:id", "routes/reject-observation.jsx"),
    route("/phenomenon-types", "routes/phenomenon-types.jsx"),
    route("/phenomenon-types/new", "routes/new-phenomenon-type.jsx"),
    route("/protocols", "routes/protocols.jsx"),
    route("/protocols/new", "routes/new-protocol.jsx"),
    route("/audit-log", "routes/audit-log.jsx"),
    route("/functions", "routes/functions.jsx"),
    route("/functions/new", "routes/new-function.jsx")
] satisfies RouteConfig;
