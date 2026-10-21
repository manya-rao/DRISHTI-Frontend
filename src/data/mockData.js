
export const classrooms = [
  {
    classroomId: "CR101",
    classroomName: "Classroom 101",
    building: "Block A",
    floor: 1,
    isActive: true,
  },
  {
    classroomId: "CR102",
    classroomName: "Classroom 102",
    building: "Block A",
    floor: 1,
    isActive: true,
  },
  {
    classroomId: "CR201",
    classroomName: "Classroom 201",
    building: "Block B",
    floor: 2,
    isActive: true,
  },
  {
    classroomId: "CR202",
    classroomName: "Classroom 202",
    building: "Block B",
    floor: 2,
    isActive: true,
  },
];

export const occupancyLogs = [
  {
    classroomId: "CR101",
    occupancyStatus: "occupied",
    personCount: 24,
    dataSource: "simulated",
    observedAt: "2026-10-21T10:30:00Z",
  },
  {
    classroomId: "CR102",
    occupancyStatus: "empty",
    personCount: 0,
    dataSource: "simulated",
    observedAt: "2026-10-21T10:30:00Z",
  },
  {
    classroomId: "CR201",
    occupancyStatus: "occupied",
    personCount: 18,
    dataSource: "simulated",
    observedAt: "2026-10-21T10:30:00Z",
  },
  {
    classroomId: "CR202",
    occupancyStatus: "unknown",
    personCount: null,
    dataSource: "simulated",
    observedAt: "2026-10-21T10:30:00Z",
  },
];

export const energyReadings = [
  {
    classroomId: "CR101",
    powerWatts: 450,
    energyKwh: 0.15,
    fanStatus: "on",
    lightStatus: "on",
    sensorId: null,
    dataSource: "simulated",
    recordedAt: "2026-10-21T10:30:00Z",
  },
  {
    classroomId: "CR102",
    powerWatts: 180,
    energyKwh: 0.06,
    fanStatus: "on",
    lightStatus: "off",
    sensorId: null,
    dataSource: "simulated",
    recordedAt: "2026-10-21T10:30:00Z",
  },
  {
    classroomId: "CR201",
    powerWatts: 320,
    energyKwh: 0.1,
    fanStatus: "on",
    lightStatus: "on",
    sensorId: null,
    dataSource: "simulated",
    recordedAt: "2026-10-21T10:30:00Z",
  },
  {
    classroomId: "CR202",
    powerWatts: null,
    energyKwh: null,
    fanStatus: "unknown",
    lightStatus: "unknown",
    sensorId: null,
    dataSource: "simulated",
    recordedAt: "2026-10-21T10:30:00Z",
  },
];

export const alerts = [
  {
    alertId: "ALT001",
    classroomId: "CR102",
    alertType: "energy_wastage",
    message:
      "Classroom is empty while equipment is consuming power.",
    severity: "medium",
    alertStatus: "active",
    createdAt: "2026-10-21T10:30:00Z",
    resolvedAt: null,
  },
  {
    alertId: "ALT002",
    classroomId: "CR202",
    alertType: "sensor_error",
    message: "Classroom energy readings are unavailable.",
    severity: "low",
    alertStatus: "active",
    createdAt: "2026-10-21T10:25:00Z",
    resolvedAt: null,
  },
];
